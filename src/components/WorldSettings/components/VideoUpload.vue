<template>
    <div class="videoUpload">
        <h3>Videos</h3>
        <el-button class="addVideoButton full-width" type="primary" size="large" :icon="Plus" @click="uploadVideo">Add
            Video
        </el-button>
        <small>Upload at least a <span>1280px by 720px</span> h264.mp4</small>
        <el-upload ref="uploadVideoRef" id="uploadVideo" drag action="#" :auto-upload="false" accept=".mp4" multiple
            :limit="5" :on-exceed="handleExceed" :file-list="fileList" :on-change="onChange" :on-progress="onProgress"
            list-type="picture">
            <div v-show="fileList.length === 0"
                class="videoUpload__text d-flex align-center justify-center direction-column">
                <el-icon class="el-icon--upload">
                    <upload />
                </el-icon> <span>Choose a file or drag it here to upload.</span>
            </div>
            <ul v-show="fileList.length > 0" class="videoUpload__list">
                <li class="videoUpload__list--item d-flex align-center" v-for="file in fileList" :key="file.uid"
                    @click.stop="onPreview(file)">
                    <video :src="file.url" width="60" height="34"></video>
                    <div>
                        <h4>{{ file.name }}</h4>
                        <span>{{ getTimeSince(file.changed) }}</span>
                    </div>
                </li>
            </ul>
        </el-upload>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import useUtils from '@/composables/utils.js'

const uploadVideoRef = ref(null);
const fileList = ref([]);
const { getTimeSince } = useUtils();
const emits = defineEmits(['onPreview']);

const uploadVideo = () => {
    document.querySelector('.videoUpload__text').click();
}

const onProgress = (event, file) => {
    console.log(event, file);
}

const onChange = (file) => {
    file.changed = Date.now();
}

const onPreview = (file) => {
    emits('onPreview', file);
}

const handleExceed = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 5, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}
</script>

<style lang="scss" scoped>
.videoUpload {
    .addVideoButton {
        margin-bottom: 10px;
    }

    small {
        font-size: 12px;
        margin-bottom: 12px;
        display: inline-block;

        span {
            font-family: 'Montserrat-Bold';
        }
    }


    &__list {
        padding: 0;
        margin: 0;

        &--item {
            font-size: 12px;
            padding: 5px 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            text-align: left;

            &:hover {
                background-color: #f6f6f6;
            }

            h4 {
                margin: 0;
                font-family: 'Montserrat-Bold';
                text-align: left;
            }

            video {
                margin-right: 10px;
            }
        }
    }
}
</style>

<style lang="scss">
.videoUpload {
    .el-upload-dragger {
        height: 280px;
        overflow-y: auto;
        padding: 5px;
        overflow: hidden;
    }

    &__text {
        height: 100%;
        font-size: 12px;
        padding: 0 50px;
        line-height: 20px;
        color: #282828;

        .el-icon--upload {
            font-size: 26px;
            margin: 0;
        }
    }

    .el-upload-list {
        display: none;
    }
}
</style>
