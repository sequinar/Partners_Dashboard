<template>
  <div class="videoStreaming">
    <el-row :gutter="40">
      <el-col :span="14">
        <!-- <VideoUpload @on-preview="onPreview" /> -->
        <h3>Stream Type</h3>
        <el-input
          v-model="streamTypeDefault"
          placeholder="Default stream type (RTMP, Variable)"
          disabled
        />
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
        <div class="switcher d-flex">
          <label>Start stream</label>
          <el-switch
            v-model="streamStatus"
            size="large"
            @change="switchStream"
            :disabled="startStreamDisabled"
          />
        </div>
      </el-col>
      <el-col :span="10">
        <!-- <VideoPreview :video="videoFile" /> -->
      </el-col>
    </el-row>

    <!-- <h3 class="mt-30">
      Backup Server URL
    </h3>
    <el-row :gutter="15">
      <el-col :span="19">
        <el-input v-model="backUpUrl" />
      </el-col>
      <el-col :span="5">
        <el-button
          class="full-width"
          type="primary"
          size="large"
          @click="copyText(backUpUrl)"
        >
          Copy
        </el-button>
      </el-col>
    </el-row> -->
    <!-- <h2>Additional Settings</h2>
    <div class="switcher d-flex justify-between">
      <label @click="autoStart = !autoStart">Enable Auto-start</label>
      <el-switch
        v-model="autoStart"
        size="large"
      />
    </div>
    <div class="switcher d-flex justify-between">
      <label @click="autoStop = !autoStop">Enable Auto-stop</label>
      <el-switch
        v-model="autoStop"
        size="large"
      />
    </div> -->
  </div>
</template>

<script setup>
// import VideoUpload from './components/VideoUpload.vue';
// import VideoPreview from './components/VideoPreview.vue';
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
const streamUrl = ref(props.world?.streaming_url)
const streamStatus = ref(props.world?.streaming_status)
// const backUpUrl = ref('This is a long streaming link?backup=1');
// const autoStart = ref(false);
// const autoStop = ref(false);

// let videoFile = ref({});

// const onPreview = (file) => {
//     videoFile.value = file
// };

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
    margin-top: 20px;
  }
}
</style>
