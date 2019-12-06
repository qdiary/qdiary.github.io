<template>
  <div class="video__button">
    <i :class="iconClass" />
  </div>
</template>

<script>
export default {
  name: "VideoButton",
  props: {
    iconClass: {
      type: String,
      required: true
    }
  }
};
</script>
