<template>
  <div class="videoStreaming">
    <el-row :gutter="25">
      <el-col :span="13">
        <!-- <VideoUpload @on-preview="onPreview" /> -->
        <div class="switcher d-flex">
          <label>Start streaming</label>
          <el-switch
            v-model="streamStatus"
            size="large"
            @change="switchStream"
            :disabled="startStreamDisabled"
          />
        </div>
        <div class="switcher d-flex">
          <div class="d-flex direction-column">
            <label>Go Live</label>
            <small>When "Go live" is enabled the streamed video will be seen by others in your world.</small>
          </div>
          <el-switch
            v-model="streamStatus"
            size="large"
            @change="switchStream"
            :disabled="startStreamDisabled"
          />
        </div>
        <h3>Stream Type</h3>
        <el-input
          v-model="streamTypeDefault"
          placeholder="Default stream type (RTMP, Variable)"
          disabled
        />
        <h3 class="mt-30">
          Stream URL
        </h3>
        <el-row :gutter="15">
          <el-col :span="19">
            <el-input v-model="streamUrl" readonly/>
          </el-col>
          <el-col :span="5">
            <el-button
              class="full-width"
              type="primary"
              size="large"
              :disabled="!streamUrl"
              @click="copyText(streamUrl)"
            >
              Copy
            </el-button>
          </el-col>
        </el-row>
        <h3 class="mt-30">
          Stream key (paste in encoder)
        </h3>
        <el-row :gutter="15">
          <el-col :span="19">
            <el-input
              v-model="streamKey"
              show-password
              autocomplete="off"
              readonly
            />
          </el-col>
          <el-col :span="5">
            <el-button
              class="full-width"
              type="primary"
              size="large"
              :disabled="!streamKey"
              @click="copyText(streamKey)"
            >
              Copy
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="11">
        <VideoPreview :video="videoUrl" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import VideoUpload from './components/VideoUpload.vue';
import VideoPreview from './components/VideoPreview.vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const props = defineProps({
  world: {
    type: Object,
    default: () => {}
  }
})

const route = useRoute()
const store = useStore()
const streamTypeDefault = ref('')
const streamKey = ref(props.world?.stream_key)
const streamUrl = ref(props.world?.streaming_input_url)
const streamStatus = ref(props.world?.streaming_status)

const videoUrl = 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd'

const startStreamDisabled = computed(() => !streamKey.value || !streamUrl.value)

const switchStream = (status) => {
  streamStatus.value = status
  store.dispatch('worlds/updateStreamStatus', {
    id: route.params.id,
    status
  })
}

const copyText = function (text) {
  navigator.clipboard.writeText(text)
  ElMessage.success('Copied')
}
</script>

<style lang="scss">
.videoStreaming {
  h3 {
      margin-bottom: 5px;
      font-size: 14px;
      font-family: 'Montserrat-Bold';
  }

  .switcher {
    margin-top: 10px;

    small {
      font-size: 12px;
    }
  }
}
</style>
