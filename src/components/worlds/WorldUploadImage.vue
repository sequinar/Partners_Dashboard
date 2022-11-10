<template>
    <h4 v-if="props.title" class="bannerTitle">{{props.title}}<span>*</span></h4>
    <div ref="bannerRef" class="bannerUpload" :style="{ width: width, height: height }">
        <el-upload ref="uploadRef" drag action="#" :auto-upload="false" :on-change="uploadSuccess" :limit="1"
            :on-exceed="handleExceed" accept=".png, .jpg, .jpeg">
            <div class="el-upload__text d-flex align-center justify-center direction-column">
                <img src="@/assets/icons/Uploadicon.svg" alt="Uploadicon"> <span>Choose a file or drag it here to
                    upload.</span>
            </div>
        </el-upload>
        <img v-if="img" :src="img" alt="uploaded image" @click="uploadImage">
        <img v-else-if="props.image?.banner_url" :src="props.image?.banner_url" alt="uploaded image"
            @click="uploadImage">
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
        <el-button v-if="img" class="removeBanner" type="danger" link @click="removeImage">Remove</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
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
const img = ref(null)
const bannerRef = ref(null)

const emits = defineEmits(['imageUpdate'])

const uploadSuccess = (res) => {
  if (res.raw.type === 'image/jpeg' || res.raw.type === 'image/png') {
    img.value = URL.createObjectURL(res.raw)
    const fd = new FormData()
    fd.append('featuredImage', res.raw)
    if (props.image?.banner_id) fd.append('bannerId', props.image.banner_id)
    emits('imageUpdate', fd)
  } else {
    ElMessage.error('Image must be JPG or PNG format!')
  }
}

const removeImage = () => {
  img.value = null
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
