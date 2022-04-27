function toggleFullscreen() {
    let elem = document.querySelector('#aframe-body');

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Based loosely on a-frame's "camera" system.
 */
AFRAME.registerSystem('video', {
    schema: {
        activeVideo: {type: 'string', default: null}
    },

    state: {
        playing: true
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
            .addEventListener('click', function() {
                toggleFullscreen();
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
            videoEl = videoEls[i];

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
        if (this.data.active) {
            this.el.object3D.visible = true;
        } else {
            this.el.object3D.visible = false;
        }
    },
    update: function (oldData) {
        const data = this.data;

        // No change
        if (oldData && oldData.active === data.active) {
            return;
        }

        const system = this.system;

        // If `active` property changes, or first update, handle
        // active video with system.
        if (data.active && system.activeVideo !== this.data.src) {
            // Video enabled. Set video to this video.
            //system.setActiveVideo(this.el.src);
            this.el.object3D.visible = true;
        } else if (!data.active) {
            this.el.object3D.visible = false;
            // Video disabled. Set video to another video.
            //system.disableActiveVideo();
        }
    }
});

AFRAME.registerComponent('hotspot1', {
    init: function() {
        this.el.addEventListener('click', function() {
            console.log('click!');
        });
    }
});

AFRAME.registerComponent('play-button', {
    init: function() {
        this.el.addEventListener('click', function() {
            console.log('click!');
        });
    }
});

// https://stackoverflow.com/a/53009978/173630
window.addEventListener('mousewheel', event => {
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
});
