<template>
  <div ref="imageGallery">
    <el-upload v-model:file-list="fileList" action="#" list-type="picture-card"
      :on-preview="handlePictureCardPreview" accept="image/png, image/jpeg" :auto-upload="false" :limit="props.limit"
      :on-remove="handleRemove">
      <div class="addButton">
        <el-icon>
          +
        </el-icon>
        <span>Add to gallery</span>
      </div>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const emits = defineEmits(['imageUpdate', 'imageRemove'])

const props = defineProps({
  limit: {
    type: Number
  },
  images: {
    type: Array
  }
})

const imageGallery = ref(null)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const fileList = computed({
  get () {
    return props.images
  },
  set (images) {
    const newImg = images[images.length - 1]
    newImg.raw = new File([newImg.raw], newImg.raw.name.replace(/\s/g, ''))
    emits('imageUpdate', images)
  }
})
const uploadButton = computed(() => imageGallery.value.querySelector('.el-upload--picture-card'))
const fileListLength = computed(() => fileList.value.length)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleRemove = (image) => {
  emits('imageRemove', image)
}

const hideUploadButton = (length) => {
  if (length >= props.limit) {
    uploadButton.value.style.display = 'none'
  } else if (uploadButton.value.style.display === 'none') {
    uploadButton.value.style.display = 'inline-flex'
  }
}

watch(fileListLength, (length) => {
  hideUploadButton(length)
})

onMounted(() => {
  hideUploadButton(fileListLength.value)
})
</script>

<style lang="scss">
.el-upload-list--picture-card {
  gap: 30px;

  .el-upload-list__item,
  .el-upload--picture-card {
    width: 195px;
    height: 125px;
    margin: 0;

    .el-upload-list__item-thumbnail {
      object-fit: cover;
    }
  }

  .el-upload--picture-card {
    order: -1;
    background-color: rgba(96, 58, 150, 0.05);
    border: 1px dashed var(--el-color-primary);
  }

  .el-upload-list__item-status-label,
  .el-icon--close-tip {
    display: none !important;
  }

  .addButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    color: var(--el-color-primary);
    font-size: 12px;
    font-family: 'Montserrat-Bold';

    i {
      font-style: normal;
      font-size: 42px;
      color: var(--el-color-primary);
      font-family: 'Montserrat';
    }
  }
}
</style>
