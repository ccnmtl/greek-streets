/* global AFRAME, bootstrap */

const state = {
    hotspotsVisible: true
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

const resetCamera = function(cameraEl) {
    // https://www.demo2s.com/javascript/javascript-a-frame-orientation-with-initial-camera-rotation.html
    const lookControls = cameraEl.components['look-controls'];
    lookControls.pitchObject.rotation.x = 0;
    lookControls.pitchObject.rotation.y = 0;
    lookControls.yawObject.rotation.x = 0;
    lookControls.yawObject.rotation.y = 0;
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
 * Based loosely on a-frame's "camera" system.
 */
AFRAME.registerSystem('video', {
    schema: {
        activeVideo: {type: 'string', default: null}
    },

    state: {
        playing: false
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
        document.getElementById('play-button')
            .addEventListener('click', function() {
                me.playVideo();
            });

        document.getElementById('pause-button')
            .addEventListener('click', function() {
                me.pauseVideo();
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
                const iconEl = e.target.querySelector('i') || e.target;
                me.toggleHideHotspots(iconEl);
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
            }
        });

        const video = document.querySelector('video');
        const input = document.querySelector('input#gs-video-range');

        setupVideoTimeline(video, input);
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

    toggleHideHotspots: function(icon) {
        state.hotspotsVisible = !state.hotspotsVisible;

        const hotspots = document.querySelectorAll('.gs-hotspot');

        hotspots.forEach(function(hotspot) {
            hotspot.setAttribute('visible', state.hotspotsVisible);
        });

        // Update the button icon
        let cls = 'bi bi-eye';
        if (state.hotspotsVisible) {
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

// https://stackoverflow.com/a/53009978/173630
window.addEventListener('mousewheel', function(event) {
    event.preventDefault();
    event.stopPropagation();

    const delta = Math.sign(event.wheelDelta);
    const camEl = document.getElementById('aframe-cam');
    if (!camEl) {
        return;
    }

    // get the mouse wheel change (120 or -120 and normalizing it to 1
    // or -1)
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
}, {passive: false});

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', function () {
            if (!state.hotspotsVisible) {
                return;
            }

            // TODO: make id dynamic
            const id = 1;
            const el = document.getElementById('gs-modal-' + id);
            const myModal = new bootstrap.Modal(el);
            myModal.show();
        });
    }
});
