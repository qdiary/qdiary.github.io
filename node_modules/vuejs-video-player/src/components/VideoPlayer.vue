<template>
  <div
    class="video__wrapper"
    @mousemove="onMouseMove"
  >
    <div
      class="video__controls"
      @click="onToggle"
    >

      <video-button
        v-if="!firstClick"
        class="video__button--bg"
        icon-class="video-icon-play-large"
      />

      <transition
        v-if="firstClick"
        :duration="1000"
        name="video-blink-button"
      >
        <video-button
          v-show="!$refs.videoRef.paused"
          :icon-class="!$refs.videoRef.paused ? 'video-icon-play-large' : 'video-icon-pause-large'"
        />
      </transition>

    </div>

    <video
      ref="videoRef"
      :poster="poster"
      @play="onPlay"
      @timeupdate="onTimeUpdate"
    >
      <source
        v-for="source in sources"
        :key="source.src"
        v-bind="source"
      >
    </video>

    <video-bar
      :progress="progress"
      :show="showBar"
    />
  </div>
</template>

<script>
import VideoButton from "./VideoButton.vue";
import VideoBar from "./VideoBar.vue";

export default {
  name: "VideoPlayer",
  components: {
    VideoButton,
    VideoBar
  },
  provide() {
    return {
      getVideoRef: this.getVideoRef,
      onToggle: this.onToggle
    };
  },
  props: {
    sources: {
      type: Array,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      progress: 0,
      firstClick: false,
      showBar: false
    };
  },
  computed: {
    showButton() {
      const { videoRef } = this.$refs;

      return !!videoRef && videoRef.currentTime === 0;
    }
  },
  methods: {
    getVideoRef() {
      return this.$refs.videoRef;
    },
    onToggle() {
      const { videoRef } = this.$refs;

      if (videoRef.paused) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    },
    onPlay() {
      if (!this.firstClick) {
        this.firstClick = true;
      }
    },
    onTimeUpdate(e) {
      const video = e.target;
      this.progress = 100 / video.duration * video.currentTime;
    },
    onMouseMove() {
      this.showBar = true;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.showBar = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
$transition: 200ms;
$primary: #00adee;

video {
  display: block;
  width: 100%;
}

.video__wrapper {
  position: relative;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  background-color: black;
}

.video__controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.video__button {
  color: white;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  font-size: 70px;
  line-height: 100px;
  text-align: center;
  border-radius: 50%;
  padding-left: 8px;
  opacity: 0;
  box-sizing: border-box;

  i {
    display: block;
    transform: translate(0, -50%);
    position: relative;
    top: 50%;
  }
}

.video__button--bg {
  opacity: 1;
  background-color: rgba(white, 0.4);
}

[class^="video-icon-"]:before,
[class*="video-icon-"]:before {
  display: block;
  font-size: 0;
  line-height: 0;
}

.video-icon-play:before {
  content: url("../icons/play.svg");
}

.video-icon-pause:before {
  content: url("../icons/pause.svg");
}

.video-icon-play-large:before {
  content: url("../icons/play-large.svg");
}

.video-icon-pause-large:before {
  content: url("../icons/pause-large.svg");
}

.video-icon-resize-full {
  content: url("../icons/maximize.svg");
}

.video-blink-button-enter-active,
.video-blink-button-leave-active .video-blink-button-enter,
.video-blink-button-leave-to {
  animation: video-blink-button-animation 1s;
}

@keyframes video-blink-button-animation {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>

