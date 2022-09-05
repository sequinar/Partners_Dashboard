<template>
  <div class="videoPreview">
    <h3>Video Preview (16:9)</h3>
    <div class="videoContainer d-flex align-center justify-center">
      <video
        v-if="props.video.url"
        :src="props.video.url"
      />
      <span v-else>Add Stream Key to Preview</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  video: {
    type: Object,
    default: () => {}
  }
})

</script>

<style lang="scss">
.videoPreview {
    .videoContainer {
        background-color: #1c1c1c;
        color: #c8c8c8;
        height: 270px;
        border-radius: 5px;
        font-size: 12px;
    }

    .previewVideoButton {
        margin-top: 14px;
    }

    video {
        width: 100%;
        height: 100%;
    }
}
</style>
