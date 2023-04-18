<template>
  <div class="videoPreview">
    <h3>Video Preview (16:9)</h3>
    <div class="videoContainer d-flex align-center justify-center">
      <!-- <video
        v-if="props.video"
        id="videoPreview"
        :src="props.video"
        controls
        data-dashjs-player autoplay
      /> -->
      <iframe :src="props.video" allowfullscreen width="320" height="240"></iframe>
      <!-- <span v-else>Add Stream Key to Preview</span> -->
    </div>
  </div>
</template>

<script setup>
import { MediaPlayer } from 'dashjs'
import { onMounted } from 'vue'

const player = MediaPlayer().create()
const props = defineProps({
  video: {
    type: String
  }
})

onMounted(() => {
  // if (props.video.url) {
  //   player.initialize(document.querySelector('#videoPreview'), props.video, true)
  // }
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
