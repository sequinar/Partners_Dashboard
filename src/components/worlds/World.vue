<template>
    <el-container id="world" class="direction-column">
        <el-row :gutter="50">
            <el-col :span="16">
                <div class="d-flex justify-between">
                    <h1 class="title">Add World</h1>
                    <el-button type="primary" link :icon="ArrowLeft" @click="router.push('/')">Back to Worlds
                    </el-button>
                </div>
                <p class="description">Upload World zip file, and world assets like title ,description, gallery images,
                    thumbnails, system requirements and world capabilities. <span class="red">*</span></p>
                <WorldUpload width="100%" height="105px" />
                <WorldUploadImage width="100%" height="300px" title="Feature Image" :types="imageTypes" max-size="20MB"
                    resolution="W: 1600 H: 800 px" />
                <div>
                    <label>Name<span class="red">*</span></label>
                    <el-input v-model="world.name" placeholder="World name" maxlength="20" show-word-limit />
                </div>
                <div>
                    <label>Short Description<span class="red">*</span></label>
                    <small>The short description will be included on the iWorld's feature section underneath its
                        name.</small>
                    <el-input v-model="world.description" maxlength="100"
                        placeholder="Provide a short description of your item." show-word-limit type="textarea"
                        rows='4' />
                </div>
                <div>
                    <label>Gallery<span class="red">*</span></label>
                    <small>Images will be included on the World's gallery. Upload an image at least <b>W: 1200 H: 700
                            px</b></small>
                    <ImageGallery />
                </div>
                <div>
                    <label>Capabilities<span class="red">*</span></label>
                    <small>Add or select your World capabilities.</small>
                    <el-select v-model="world.capabilitie" placeholder="Select Capabilities" multiple filterable
                        allow-create :reserve-keyword="false" default-first-option>
                        <el-option v-for="item in capabilities" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <div>
                    <label>Playable on *<span class="red">*</span></label>
                    <small>Add the platforms your World is available to be played on.</small>
                    <el-select v-model="world.capability" placeholder="Select Platforms" multiple>
                        <el-option v-for="item in capabilities" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <div>
                    <label>System requirements<span class="red">*</span></label>
                    <el-input v-model="world.cpu" placeholder="CPU" />
                    <el-row class="mt-10" :gutter="25">
                        <el-col :span="12">
                            <el-input v-model="world.ram" placeholder="RAM" />
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="world.graphics" placeholder="Graphics Card" />
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <label>Publisher info<span class="red">*</span></label>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-input v-model="world.published" placeholder="Published By" />
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="world.developed" placeholder="Developed By" />
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="publish">
                    <h3>Publish</h3>
                    <p>Publish, save as a draft or preview.</p>
                    <el-row class="mt-15" :gutter="15">
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" plain size="large">Save Draft</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" plain size="large">Preview</el-button>
                        </el-col>
                    </el-row>
                    <div class="mt-10 d-flex justify-between align-center">
                        <h3>Released on:</h3>
                        <el-button type="primary" size="large" link>Edit</el-button>
                    </div>
                    <p class="relised-date ma-0">Aug 24, 2022 at 9:19 AM</p>
                    <el-row class="mt-15" :gutter="15">
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" link size="large">Archive World</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" size="large">Publish</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="thumbnail mt-20">
                    <h3>Thumbnail Image</h3>
                    <p>Upload an image at least <b>W: 300 H: 300 px</b></p>
                    <ImageGallery :limit="1" />
                </div>
                <el-button class="full-width mt-15" type="primary" size="large">World Editor</el-button>
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup>
import WorldUpload from './WorldUpload.vue'
import WorldUploadImage from './WorldUploadImage.vue'
import ImageGallery from '../ImageGallery.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()
const imageTypes = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4', 'WEBM', 'WAV', 'OGG', 'GLB', 'GLTF']
const world = reactive({
  name: '',
  description: '',
  capability: '',
  cpu: '',
  ram: '',
  graphics: '',
  published: '',
  developed: ''
})
const capabilities = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  }
]
</script>

<style lang="scss">
#world {
    max-width: 1000px;
    margin: 0 auto;
    color: #1c1c1c;
    font-size: 12px;
    padding-bottom: 15px;

    .title {
        font-size: 30px;
        font-family: 'Montserrat-SemiBold';
        margin: 0;
    }

    .description {
        font-size: 14px;
        font-family: 'Montserrat-SemiBold';
        line-height: 20px;
    }

    .el-input__wrapper {
        background-color: #fff;
        padding: 0;
        padding: 5px 15px;
        margin-top: 5px;
    }

    .el-textarea__inner {
        box-shadow: none;
    }

    label {
        font-size: 12px;
        font-family: 'Montserrat-SemiBold';
        margin-top: 24px;
        display: block;
    }

    small {
        font-size: 12px;
        margin-bottom: 10px;
        display: block;
    }

    h3 {
        margin: 0;
        font-size: 16px;
        font-family: 'Montserrat-Bold';
    }

    .el-dialog__body {
        img {
            width: 100%;
        }
    }

    .el-select {
        display: block;
    }

    .publish,
    .thumbnail {
        background-color: #fff;
        border-radius: 10px;
        padding: 12px;
        overflow: hidden;

        p {
            font-size: 12px;
            margin: 0;
            line-height: 24px;
            margin-bottom: 5px;
        }

        .relised-date {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }

    .el-button {
        font-family: 'Montserrat-SemiBold';

        &.is-link {
            height: 40px;
            font-style: italic;
            text-decoration: underline;
        }
    }

    .thumbnail {

        .el-upload-list__item,
        .el-upload--picture-card {
            width: 275px;
            height: 275px;
            margin: 0 auto;
        }
    }
}
</style>
