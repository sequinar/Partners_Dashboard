<template>
    <h4 v-if="props.title" class="bannerTitle">{{props.title}}<span>*</span></h4>
    <div ref="bannerRef" class="bannerUpload" :style="{ width: width, height: height }">
        <el-upload ref="uploadRef" drag action="#" :auto-upload="false" :on-change="uploadSuccess" :limit="1"
            :on-exceed="handleExceed" accept=".png, .jpg, .jpeg, .gif, .svg, .mp4, .webm, .wav, .ogg, .glb, .gltf">
            <div class="el-upload__text d-flex align-center justify-center direction-column">
                <img src="@/assets/icons/Uploadicon.svg" alt="Uploadicon"> <span>Choose a file or drag it here to
                    upload.</span>
            </div>
        </el-upload>
        <img v-if="fileType === 'image'" :src="fileUrl || props.file?.banner_url" alt="uploaded image"
            @click="uploadFile">
        <video v-if="fileType === 'video'" :src="fileUrl" autoplay muted loop playsinline @click="uploadFile"></video>
    </div>
    <div class="d-flex justify-between mt-10">
        <div v-if="props.types">
            <b>File types supported: </b>
            <span v-for="( type, index ) in props.types" :key="type"> {{ type }}{{index < props.types.length - 1 ? ', ' : ''}} </span>
        </div>
        <span v-if="props.maxSize"><b>Max size:</b> {{ props.maxSize }}</span>
    </div>
    <div class="d-flex justify-between mt-10">
        <div v-if="props.resolution"><b>Size:</b> Upload an image at least <b>{{ props.resolution }}</b></div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { genFileId } from 'element-plus'

const uploadRef = ref(null)
const props = defineProps({
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  file: {
    type: Object,
    default: () => { }
  },
  title: {
    type: String
  },
  types: {
    type: Array
  },
  maxSize: {
    type: String
  },
  resolution: {
    type: String
  }
})
const file = ref(null)
const bannerRef = ref(null)
const fileUrl = computed(() => file.value ? URL.createObjectURL(file.value) : null)
const fileType = computed(() => {
  if (!props.file?.banner_url?.raw) return
  if (props.file.banner_url.raw.type.match('image.*')) return 'image'

  if (props.file.banner_url.raw.type.match('video.*')) return 'video'

  return 'other'
})

const emits = defineEmits(['imageUpdate'])

const uploadSuccess = (res) => {
  file.value = res.raw
  emits('imageUpdate', res)
}

const uploadFile = () => {
  bannerRef.value.querySelector('.el-upload__text').click()
}

const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}

</script>

<style lang="scss">
.bannerUpload {
    overflow: hidden;
    position: relative;
    color: #c8c8c8;
    border-radius: 5px;
    margin: 0 auto;

    &>img,video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 1;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            opacity: 0.3;
        }
    }

    .el-upload-dragger {
        padding: 0;
        background-color: rgba(96, 58, 150, 0.05);
        color: var(--el-color-primary);
        border: 1px dashed #603A96;

        .el-icon--upload {
            font-size: 23px;
            margin: 0;
        }
    }

    .el-upload__text {
        color: var(--el-color-primary);
        font-family: 'Montserrat-SemiBold';

        span {
            padding: 5px;
        }

        &>* {
            height: fit-content;
        }
    }

    * {
        height: 100%;
    }
}

.bannerTitle {
    font-size: 12px;
    font-family: 'Montserrat-SemiBold';
    margin-top: 20px;
    margin-bottom: 5px;

    span {
        color: red;
    }
}

.removeBanner {
    font-size: 14px;
    text-decoration: underline;
    font-style: italic;
    color: #f00;
    font-family: 'Montserrat-SemiBold';
}
</style>
