<template>
  <div
    v-if="!isiPhone"
    :class="{
      'video__progress__wrapper': true,
      'video__progress__wrapper--show': show
    }"
  >
    <div
      class="video__progress__button"
      @click="onToggle"
    >
      <i :class="$refs.videoRef && $refs.videoRef.paused ? 'video-icon-play' : 'video-icon-pause'" />
    </div>

    <div
      ref="progresssBarRef"
      class="video__progress"
      @click.self="onComputeProgress"
    >
      <span
        :style="progressLineStyle"
        class="video__progress__line"
      />
    </div>

    <div
      class="video__progress__button video__progress__button--fullscreen"
      @click="onFullScreen"
    >
      <i class="video-icon-resize-full" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoBar",
  inject: ["getVideoRef", "onToggle"],
  props: {
    progress: {
      type: Number,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isiPhone() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },
    progressLineStyle() {
      return {
        width: `${this.progress}%`
      };
    }
  },
  mounted() {
    this.$refs.videoRef = this.getVideoRef();
  },
  methods: {
    onComputeProgress(e) {
      const { videoRef, progresssBarRef } = this.$refs;

      videoRef.currentTime =
        e.offsetX / progresssBarRef.clientWidth * videoRef.duration;
    },
    onFullScreen() {
      const { videoRef } = this.$refs;

      if (videoRef.requestFullscreen) {
        videoRef.requestFullscreen();
      } else if (videoRef.mozRequestFullScreen) {
        videoRef.mozRequestFullScreen();
      } else if (videoRef.webkitRequestFullscreen) {
        videoRef.webkitRequestFullscreen();
      }
    }
  }
};
</script>

<style lang="scss">
$transition: 200ms;
$primary: #00adee;

.video__progress__button--fullscreen {
  font-size: 22px;
}

.video__progress__wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  display: flex;
  overflow: hidden;
  z-index: 1;
  transition: height $transition ease-in-out;
  background-color: rgba(white, 0.3);

  &--show {
    height: 40px;

    .video__progress__button {
      width: 40px;
      opacity: 1;
    }
  }
}

.video__progress__button {
  height: 100%;
  width: 4px;
  font-size: 30px;
  line-height: 1;
  text-align: center;
  color: white;
  transition: width $transition ease-in-out, opacity $transition ease-in-out;
  overflow: hidden;
  opacity: 0;

  i {
    display: block;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.video__progress {
  height: 100%;
  flex: 1;
  cursor: pointer;
}

.video__progress__line {
  height: 100%;
  display: block;
  transition: width $transition ease-in-out;
  background-color: $primary;
  position: relative;
  z-index: -1;
}
</style>
