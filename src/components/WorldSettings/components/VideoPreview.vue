<template>
    <div class="videoPreview">
        <h3>Video Preview (16:9)</h3>
        <div class="videoContainer d-flex align-center justify-center">
            <video v-if="props.video.url" :src="props.video.url"></video>
            <span v-else>Select video to preview</span>
        </div>
        <h3>Video link</h3>
        <el-input v-model="props.video.url" disabled>
            <template #append>
                <el-tooltip content="Copy url" placement="top">
                    <el-button text :icon="DocumentCopy" @click="copyLink" />
                </el-tooltip>
            </template>
        </el-input>
        <h3>File name</h3>
        <el-input v-model="props.video.name" disabled></el-input>
        <el-button class="previewVideoButton full-width" type="primary" size="large">Preview Video in world</el-button>
    </div>
</template>

<script setup>
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
    video: {
        type: Object
    }
})

const copyLink = function () {
    navigator.clipboard.writeText(props.video.url);
    ElMessage.success("Copied")
}

</script>

<style lang="scss">
.videoPreview {
    .videoContainer {
        background-color: #1c1c1c;
        color: #c8c8c8;
        height: 160px;
        border-radius: 5px;
        font-size: 12px;
    }

    .previewVideoButton {
        margin-top: 14px;
    }

    video {
        width: 100%;
        height: 100%;
    }
}
</style>