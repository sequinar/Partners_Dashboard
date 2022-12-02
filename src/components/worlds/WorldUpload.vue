<template>
    <div ref="bannerRef" class="worldUpload" :style="{ width: props.width, height: props.height }">
        <el-upload ref="uploadRef" drag action="#" :auto-upload="false" :on-change="uploadSuccess" :limit="1"
            :on-exceed="handleExceed" accept=".zip">
            <div class="el-upload__text d-flex align-center justify-center direction-column">
                <img src="@/assets/icons/Uploadicon.svg" alt="Uploadicon" />
                <span>Choose a file or drag it here to upload.</span>
            </div>
        </el-upload>
        <div v-if="file || props.file" class="uploadedFile d-flex justify-between align-center">
            <div>
                <h4 class="fileName">{{file?.name || props.file.fileName}}</h4>
                <span class="fileSize">{{fileSize || props.file.fileSize}}</span>
            </div>
            <el-button type="danger" link @click="removeFile">Remove</el-button>
        </div>
    </div>
    <div class="d-flex justify-between mt-10">
        <span><b>File types supported:</b> .Zip</span>
        <span><b>Max size:</b> 1GB</span>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const emits = defineEmits(['fileChanged', 'fileRemoved'])
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
    type: Object
  }
})

const store = useStore()
const uploadRef = ref(null)
const file = ref(null)
const bannerRef = ref(null)

const fileSize = computed(() => file.value ? (file.value?.size / 1073741824).toFixed(1) + ' GB' : null)

const uploadSuccess = async (res) => {
  if (!res.raw.type.includes('zip')) {
    ElMessage.error('File must be .zip format!')
  } else if (res.raw.size / 1048576 > 1024) {
    ElMessage.error('The file must not exceed 1 GB')
  } else {
    file.value = res.raw
    store.commit('worlds/setFile', res)
    emits('fileChanged')
  }
}

const removeFile = async () => {
  emits('fileRemoved')
  file.value = null
}
const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}
</script>

<style lang="scss">
.worldUpload {
    overflow: hidden;
    position: relative;
    color: #c8c8c8;
    border-radius: 5px;
    margin: 0 auto;

    .uploadedFile {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 30px 40px;
        box-sizing: border-box;
        color: #000;

        .fileName {
            margin: 0;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .el-button {
            font-size: 14px;
            text-decoration: underline;
            font-style: italic;
            color: #f00;
            font-family: 'Montserrat-SemiBold';
        }
    }

    .el-upload-dragger {
        padding: 0;
        background-color: rgba(96,58,150,0.05);
        color: var(--el-color-primary);
        border: 1px dashed #603A96;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        .el-icon--upload {
            font-size: 23px;
            margin: 0;
        }
    }

    .el-upload__text {
        span {
            padding: 5px;
            color: var(--el-color-primary);
            font-family: 'Montserrat-SemiBold';
        }

        &>* {
            height: fit-content;
        }
    }

    &>div, .el-upload-dragger {
        height: v-bind(height);
    }
}
</style>
