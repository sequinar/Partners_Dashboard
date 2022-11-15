<template>
    <div ref="imageGallery">
        <el-upload v-model:file-list="fileList" action="#" list-type="picture-card"
            :on-preview="handlePictureCardPreview" accept="image/png, image/jpeg"
            :auto-upload="false" :limit="props.limit">
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

const emits = defineEmits(['imageUpdate'])

const props = defineProps({
  limit: {
    type: Number,
    default: () => 9
  },
  images: {
    type: Array
  }
})

const fileList = ref([])
const imageGallery = ref(null)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const uploadButton = computed(() => imageGallery.value.querySelector('.el-upload--picture-card'))
const fileListLength = computed(() => fileList.value.length)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

watch(fileListLength, (length) => {
  emits('imageUpdate', fileList.value)
  if (length >= props.limit) {
    uploadButton.value.style.display = 'none'
  } else if (uploadButton.value.style.display === 'none') {
    uploadButton.value.style.display = 'inline-flex'
  }
})

onMounted(() => {
  if (props.images) {
    props.images.forEach(image => {
      fileList.value.push({ url: image.image_url })
    })
  }
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
