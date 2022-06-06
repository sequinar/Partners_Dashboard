<template>
    <div ref="banner" class="bannerUpload" :style="{ width: width, height: height }">
        <el-upload ref="uploadRef" drag action="#" :auto-upload="false" :on-change="uploadSuccess" :limit="1"
            :on-exceed="handleExceed">
            <div class="el-upload__text d-flex align-center justify-center"
                :class="{ 'direction-column': bannerWidth < 400 }">
                <el-icon class="el-icon--upload">
                    <upload />
                </el-icon> <span>Choose a file or drag it here to upload.</span>
            </div>
        </el-upload>
        <img v-if="img" :src="img" alt="uploaded image" @click="uploadImage">
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Upload } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
let img = ref(null);
let banner = ref(null);
const uploadRef = ref(null);
const props = defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true
    }
})

const bannerWidth = computed(() => banner.value ? banner.value.offsetWidth : null);

const uploadSuccess = (res) => {
    img.value = URL.createObjectURL(res.raw);
};

const uploadImage = () => {
    document.querySelector('.el-upload__text').click();
}

const handleExceed = (files) => {
    uploadRef.value.clearFiles()
    const file = files[0];
    file.uid = genFileId()
    uploadRef.value.handleStart(file);
}

</script>

<style lang="scss">
.bannerUpload {
    overflow: hidden;
    position: relative;

    img {
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
</style>
