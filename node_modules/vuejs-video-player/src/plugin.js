import VideoPlayer from "./components/VideoPlayer.vue";

module.exports = {
  install: function(Vue) {
    Vue.component("vue-video-player", VideoPlayer);
  }
};
