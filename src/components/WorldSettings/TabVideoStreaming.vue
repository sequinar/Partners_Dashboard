<template>
    <div class="videoStreaming">
        <el-row :gutter="40">
            <el-col :span="12">
                <VideoUpload @on-preview="onPreview" />
            </el-col>
            <el-col :span="12">
                <VideoPreview :video="videoFile" />
            </el-col>
        </el-row>
        <el-row class="mt-30">
            <el-col :span="24">
                <h3>Stream Key</h3>
                <el-input v-model="streamKeyDefault" placeholder="Default stream key (RTMP, Variable)" disabled>
                </el-input>
            </el-col>
        </el-row>
        <h3 class="mt-30">Stream key (paste in encoder)</h3>
        <el-row :gutter="15">
            <el-col :span="14">
                <el-input v-model="streamKey" type="password" show-password>
                </el-input>
            </el-col>
            <el-col :span="5">
                <el-button class="full-width" type="primary" size="large">Reset</el-button>
            </el-col>
            <el-col :span="5">
                <el-button class="full-width" type="primary" size="large" @click="copyText(streamKey)">Copy</el-button>
            </el-col>
        </el-row>
        <h3 class="mt-30">Stream URL</h3>
        <el-row :gutter="15">
            <el-col :span="19">
                <el-input v-model="streamUrl">
                </el-input>
            </el-col>
            <el-col :span="5">
                <el-button class="full-width" type="primary" size="large" @click="copyText(streamUrl)">Copy</el-button>
            </el-col>
        </el-row>
        <h3 class="mt-30">Backup Server URL</h3>
        <el-row :gutter="15">
            <el-col :span="19">
                <el-input v-model="backUpUrl">
                </el-input>
            </el-col>
            <el-col :span="5">
                <el-button class="full-width" type="primary" size="large" @click="copyText(backUpUrl)">Copy</el-button>
            </el-col>
        </el-row>
        <h2>Additional Settings</h2>
        <div class="switcher d-flex justify-between">
            <label @click="autoStart = !autoStart">Enable Auto-start</label>
            <el-switch v-model="autoStart" size="large" />
        </div>
        <div class="switcher d-flex justify-between">
            <label @click="autoStop = !autoStop">Enable Auto-stop</label>
            <el-switch v-model="autoStop" size="large" />
        </div>
    </div>
</template>

<script setup>
import VideoUpload from './components/VideoUpload.vue';
import VideoPreview from './components/VideoPreview.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus'

const props = defineProps(['world']);
const streamKeyDefault = ref('');
const streamKey = ref('asfsdsdgdfhdfhgjghj');
const streamUrl = ref('This is a long streaming link');
const backUpUrl = ref('This is a long streaming link?backup=1');
const autoStart = ref(true);
const autoStop = ref(false);

let videoFile = ref({});

const onPreview = (file) => {
    videoFile.value = file
};

const copyText = function (text) {
    navigator.clipboard.writeText(text);
    ElMessage.success("Copied")
}
</script>

<style lang="scss">
.videoStreaming {
    h3 {
        margin-bottom: 5px;
        font-size: 14px;
        font-family: 'Montserrat-Bold';
    }

    .el-input {
        height: 37px;

        .el-input__wrapper,
        .el-input-group__append {
            background-color: #fff;
            box-shadow: none;
        }

        &.is-disabled .el-input__wrapper,
        .el-input-group__append {
            background-color: #eee;
            box-shadow: none;
        }

        .el-input-group__append button {
            position: relative;

            &:hover,
            &:focus {
                background-color: transparent;
            }

            &:before {
                content: '';
                position: absolute;
                width: 1px;
                height: 16px;
                top: 8px;
                left: 0;
                background-color: #808080;
                overflow: visible;
            }
        }
    }
}
</style>