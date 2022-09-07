/* global AFRAME, bootstrap, Viewer, GS_HOTSPOTS */

const state = {
    hotspotsVisible: false
};

const toggleFullscreen = function(icon) {
    let elem = document.querySelector('#aframe-body');
    let cls = 'bi bi-fullscreen';

    if (!document.fullscreenElement) {
        cls = 'bi bi-fullscreen-exit';
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }

    icon.className = cls;
};

/**
 * Format seconds to mm:ss format.
 * https://stackoverflow.com/a/1322771/173630
 */
const formatTime = function(seconds) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const resetCamera = function(cameraEl) {
    // https://www.demo2s.com/javascript/javascript-a-frame-orientation-with-initial-camera-rotation.html
    const lookControls = cameraEl.components['look-controls'];
    lookControls.pitchObject.rotation.x = 0;
    lookControls.pitchObject.rotation.y = 0;
    lookControls.yawObject.rotation.x = 0;
    lookControls.yawObject.rotation.y = 0;

    const camEl = document.getElementById('aframe-cam');
    const mycam = camEl.getAttribute('camera');
    if (mycam) {
        mycam.zoom = 1;
        camEl.setAttribute('camera', mycam);
    }
};

const updateVideoTimeline = function(ratio, input) {
    input.value = ratio;
};

const setupVideoTimeline = function(videoEl, inputEl) {
    videoEl.ontimeupdate = function() {
        const ratio = (videoEl.currentTime / videoEl.duration) * 100;

        updateVideoTimeline(ratio, inputEl);
    };

    inputEl.onchange = function(e) {
        const currentTime = (e.target.value / 100) * videoEl.duration;
        videoEl.currentTime = currentTime;
    };
};

/**
 * Draw highlighted hotspot locations in time on the given canvas.
 */
const drawFlagCanvas = function(canvas, hotspots) {
    const ctx = canvas.getContext('2d');
    const colors = [
        'rgba(255, 0, 0, 0.5)',
        'rgba(0, 0, 255, 0.5)',
    ];

    hotspots.forEach(function(timePos, i) {
        const idx = i % colors.length;
        ctx.fillStyle = colors[idx];
        const startPos = timePos.start * canvas.width;
        const endPos = timePos.end * canvas.width;
        const width = endPos - startPos;
        ctx.fillRect(startPos, 0, width, 20);
    });
};

/**
 * Refresh a moving hotspot based on its optional `start` and `end`
 * attributes.
 *
 * Returns visibility status.
 */
const refreshMovingHotspot = function(
    hotspot, currentTimeRatio, hotspotsVisible
) {
    const start = hotspot.dataset.start;
    const end = hotspot.dataset.end;

    if (!hotspotsVisible) {
        return false;
    }

    if (!start || !end) {
        return true;
    }

    let visibility = false;

    if (currentTimeRatio >= start && currentTimeRatio <= end) {
        visibility = true;
    }

    hotspot.setAttribute('visible', visibility);
    if (hotspot.object3D) {
        hotspot.object3D.visible = visibility;
    }
    return visibility;
};

const updateMovingHotspotDisplay = function(
    hotspots, currentTime, duration, hotspotsVisible) {
    const t = currentTime / duration;
    hotspots.forEach(function(hotspot) {
        refreshMovingHotspot(hotspot, t, hotspotsVisible);
    });
};

/**
 * Based loosely on a-frame's "camera" system.
 */
AFRAME.registerSystem('video', {
    schema: {
        activeVideo: {type: 'string', default: null}
    },

    state: {
        playing: false,
        duration: null,
        currentTime: 0
    },

    init: function() {
        this.activeVideoEl = null;
        this.activeVideoEl = document.createElement('a-entity');
        this.activeVideoEl.setAttribute('camera', {
            activeVideo: this.data.activeVideo
        });

        const me = this;

        this.videoSelectors = [
            'mainVideo'
        ];

        // Attach to the video UI button events. Note that these are
        // outside of the <a-scene>.
        document.getElementById('play-pause-button')
            .addEventListener('click', function() {
                me.playPauseVideo();
            });

        document.getElementById('fullscreen-button')
            .addEventListener('click', function(e) {
                const iconEl = e.target.querySelector('i') || e.target;
                toggleFullscreen(iconEl);
            });

        document.getElementById('reset-button')
            .addEventListener('click', function() {
                const camEl = document.querySelector('a-camera');
                resetCamera(camEl);
            });

        document.getElementById('mute-button')
            .addEventListener('click', function(e) {
                const iconEl = e.target.querySelector('i') || e.target;
                me.toggleVideoMute(iconEl);
            });

        document.getElementById('hide-button')
            .addEventListener('click', function(e) {
                state.hotspotsVisible = !state.hotspotsVisible;

                const iconEl = e.target.querySelector('i') || e.target;
                me.refreshHotspots(
                    iconEl, state.hotspotsVisible,
                    me.state.currentTime, me.state.duration
                );
            });

        document.getElementById('zoom-in-button')
            .addEventListener('click', function() {
                me.zoom('in');
            });

        document.getElementById('zoom-out-button')
            .addEventListener('click', function() {
                me.zoom('out');
            });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                const activeVideo = me.getActiveVideo();
                const video = document.getElementById(activeVideo);
                if (me.state.playing) {
                    me.pauseVideo(video);
                } else {
                    me.playVideo(video);
                }

                me.togglePlayPauseButton(me.state.playing);
            }
        });

        const video = document.querySelector('#mainVideo');
        const input = document.querySelector('input#gs-video-range');

        setupVideoTimeline(video, input);

        video.addEventListener('loadedmetadata', (e) => {
            me.state.duration = e.target.duration;
            document.querySelector('#gs-duration').innerHTML =
                formatTime(me.state.duration);

            const canvas = document.getElementById('gs-hotspot-flags');
            if (canvas) {
                drawFlagCanvas(canvas, GS_HOTSPOTS, me.state.duration)
            }
        });

        const hotspotEntities = document.querySelectorAll('.gs-hotspot');
        video.addEventListener('timeupdate', (e) => {
            me.state.currentTime = e.target.currentTime;
            document.querySelector('#gs-currenttime').innerHTML =
                formatTime(me.state.currentTime);

            // If this is a moving scene, hide/show hotspots as
            // necessary.
            if (state.hotspotsVisible) {
                updateMovingHotspotDisplay(
                    hotspotEntities,
                    e.target.currentTime, e.target.duration,
                    state.hotspotsVisible);
            }
        });

        const hideIcon = document.getElementById('hide-button');
        const iconEl = hideIcon.querySelector('i') || hideIcon;
        this.refreshHotspots(
            iconEl, state.hotspotsVisible,
            0, this.state.duration);
    },

    zoom: function(direction='in') {
        const delta = direction === 'in' ? 1 : -1;
        const camEl = document.getElementById('aframe-cam');
        const mycam = camEl.getAttribute('camera');

        if (!mycam) {
            return;
        }

        let finalZoom = mycam.zoom + delta;
        // limit the zoom so it doesnt zoom too much in or out
        if (finalZoom < 1) {
            finalZoom = 1;
        } else if (finalZoom > 5) {
            finalZoom = 5;
        }

        mycam.zoom = finalZoom;
        // set the camera element
        camEl.setAttribute('camera', mycam);
    },

    getActiveVideo: function() {
        const videoEls = this.sceneEl.querySelectorAll(
            'a-videosphere, [videosphere]');
        for (let i = 0; i < videoEls.length; i++) {
            let videoEl = videoEls[i];
            if (videoEl && videoEl.components.video.data.active) {
                return videoEl.components.video.data.src;
            }
        }

        return null;
    },

    /**
     * Set active video/videosphere.
     * Stops and hides all other videos in the scene.
     */
    setActiveVideo: function(activeVideoSrc) {
        const videoEls = this.sceneEl.querySelectorAll(
            'a-videosphere, [videosphere]');
        for (let i = 0; i < videoEls.length; i++) {
            let videoEl = videoEls[i];

            if (
                videoEl &&
                    videoEl.components.video &&
                    videoEl.components.video.data.src === activeVideoSrc
            ) {
                videoEl.setAttribute('video', 'active', true);
            } else {
                videoEl.setAttribute('video', 'active', false);
                videoEl.pause();
            }
        }
    },

    togglePlayPauseButton: function(isPlaying) {
        const btn = document.getElementById('play-pause-button');
        const icon = btn.querySelector('i');

        let cls = 'bi bi-play';
        if (isPlaying) {
            cls = 'bi bi-pause';
        }
        icon.className = cls;
    },

    playPauseVideo: function() {
        if (!this.state.playing) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }

        this.togglePlayPauseButton(this.state.playing);
    },

    // play active video
    playVideo: function(video=null) {
        const activeVideo = this.getActiveVideo();

        if (!video) {
            video = document.getElementById(activeVideo);
        }

        const vidSphere = document.getElementById(activeVideo + '-sphere');

        if (vidSphere) {
            vidSphere.object3D.visible = true;
        }

        if (video) {
            video.play();
            this.state.playing = true;
        }
    },

    pauseVideo: function(video=null) {
        if (!video) {
            const activeVideo = this.getActiveVideo();
            video = document.getElementById(activeVideo);
        }

        if (video) {
            video.pause();
            this.state.playing = false;
        }
    },

    toggleVideoMute: function(icon, video=null) {
        if (!video) {
            const activeVideo = this.getActiveVideo();
            video = document.getElementById(activeVideo);
        }

        if (video) {
            video.muted = !video.muted;

            // Update the button icon
            let cls = 'bi bi-volume-mute';
            if (video.muted) {
                cls = 'bi bi-volume-up';
            }
            icon.className = cls;
        }
    },

    refreshHotspots: function(icon, show, currentTime, duration) {
        const hotspots = document.querySelectorAll('.gs-hotspot');
        const t = currentTime / duration;

        hotspots.forEach(function(hotspot) {
            if (!show) {
                hotspot.setAttribute('visible', false);
                if (hotspot.object3D) {
                    hotspot.object3D.visible = false;
                }
            } else if (refreshMovingHotspot(hotspot, t, show)) {
                hotspot.setAttribute('visible', true);
                if (hotspot.object3D) {
                    hotspot.object3D.visible = true;
                }
            }
        });

        // Update the button icon
        let cls = 'bi bi-eye';
        if (show) {
            cls = 'bi bi-eye-slash';
        }

        icon.className = cls;
    }
});

/**
 * Based loosely on a-frame's "camera" component.
 */
AFRAME.registerComponent('video', {
    schema: {
        src: {type: 'string', default: ''},
        active: {type: 'boolean', default: false}
    },
    init: function() {
    },
    update: function () {
    }
});

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', function (e) {
            if (!state.hotspotsVisible) {
                return;
            }
            const hotspot = e.target.closest('.gs-hotspot');
            const id = hotspot.dataset.id;
            const el = document.getElementById('gs-modal-' + id);
            const myModal = new bootstrap.Modal(el);
            myModal.show();
        });
    }
});

window.addEventListener('DOMContentLoaded', function () {
    // Modal viewer.js setup
    document.querySelectorAll('.modal').forEach((modal) => {
        let viewer;

        modal.addEventListener('shown.bs.modal', () => {
            const img = modal.querySelector('.viewerjs-gallery');
            if (img) {
                viewer = new Viewer(img);
            }
        });

        modal.addEventListener('hidden.bs.modal', () => {
            viewer.destroy()
        });

    });
});
