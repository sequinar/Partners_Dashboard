<template>
  <div
    ref="bannerRef"
    class="bannerUpload"
    :style="{ width: width, height: height }"
  >
    <el-upload
      ref="uploadRef"
      drag
      action="#"
      :auto-upload="false"
      :on-change="uploadSuccess"
      :limit="1"
      :on-exceed="handleExceed"
      accept=".png, .jpg, .jpeg"
    >
      <div
        class="el-upload__text d-flex align-center justify-center"
        :class="{ 'direction-column': bannerWidth < 400 }"
      >
        <img
          src="@/assets/icons/Uploadicon.svg"
          alt="Uploadicon"
        > <span>Choose a file or drag it here to
          upload.</span>
      </div>
    </el-upload>
    <img
      v-if="img"
      :src="img"
      alt="uploaded image"
      @click="uploadImage"
    >
    <img
      v-else-if="props.image?.banner_url"
      :src="props.image?.banner_url"
      alt="uploaded image"
      @click="uploadImage"
    >
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { genFileId, ElMessage } from 'element-plus'

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
  image: {
    type: Object,
    default: () => {}
  }
})
const img = ref(null)
const bannerRef = ref(null)

const emits = defineEmits(['imageUpdate'])

const bannerWidth = computed(() => bannerRef.value ? bannerRef.value.offsetWidth : null)

const uploadSuccess = (res) => {
  if (res.raw.type === 'image/jpeg' || res.raw.type === 'image/png') {
    img.value = URL.createObjectURL(res.raw)
    const fd = new FormData()
    fd.append('bannerImage', res.raw)
    if (props.image?.banner_id) fd.append('bannerId', props.image.banner_id)
    emits('imageUpdate', fd)
  } else {
    ElMessage.error('Image must be JPG or PNG format!')
  }
}

const uploadImage = () => {
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

    &>img {
        width: 100%;
        height: auto;
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
        background-color: #1c1c1c;
        color: #c8c8c8;

        .el-icon--upload {
            font-size: 23px;
            margin: 0;
        }
    }

    .el-upload__text {
        opacity: 0.7;

        span {
            padding: 5px;
            color: #c8c8c8;
        }

        &>* {
            height: fit-content;
        }
    }

    * {
        height: 100%;
    }
}
</style>
