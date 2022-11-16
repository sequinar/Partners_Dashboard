<template>
    <el-container id="world" class="direction-column" v-loading="!editedWorld">
        <el-row :gutter="60" v-if="editedWorld">
            <el-col :span="15">
                <div class="d-flex justify-between">
                    <h1 class="title">{{route.name}}</h1>
                    <el-button type="primary" link :icon="ArrowLeft" @click="router.push('/')">Back to Worlds
                    </el-button>
                </div>
                <p class="description">Upload World zip file, and world assets like title ,description, gallery images,
                    thumbnails, system requirements and world capabilities. <span class="red">*</span></p>
                <WorldUpload width="100%" height="105px" @fileChanged="fileChanged"/>
                <WorldUploadImage width="100%" height="300px" title="Feature Image" :image="{banner_url: editedWorld?.featureImageUrl}" :types="imageTypes" max-size="20MB"
                    resolution="W: 1600 H: 800 px" @imageUpdate="onFeatureImage"/>
                <div>
                    <label>Name<span class="red">*</span></label>
                    <el-input v-model="world.worldName" placeholder="World name" maxlength="20" show-word-limit />
                </div>
                <div>
                    <label>Short Description<span class="red">*</span></label>
                    <small>The short description will be included on the iWorld's feature section underneath its
                        name.</small>
                    <el-input v-model="world.worldDescription" maxlength="100"
                        placeholder="Provide a short description of your item." show-word-limit type="textarea"
                        rows='4' />
                </div>
                <div class="gallery">
                    <label>Gallery<span class="red">*</span></label>
                    <small>Images will be included on the World's gallery. Upload an image at least <b>W: 1200 H: 700
                            px</b></small>
                    <ImageGallery @imageUpdate="onGalleryUpdate" :images="editedWorld?.imageUrls"/>
                </div>
                <div>
                    <label>Capabilities<span class="red">*</span></label>
                    <small>Add or select your World capabilities.</small>
                    <el-select v-model="world.worldCapabilities" placeholder="Select Capabilities" multiple filterable
                        allow-create :reserve-keyword="false" default-first-option @change="detectNewTag">
                        <el-option v-for="item in capabilities" :key="item" :label="item"
                            :value="item" />
                    </el-select>
                </div>
                <div>
                    <label>Playable on<span class="red">*</span></label>
                    <small>Add the platforms your World is available to be played on.</small>
                    <el-select v-model="world.playabelOn" placeholder="Select Platforms" multiple>
                        <el-option v-for="item in playableOn" :key="item" :label="item"
                            :value="item" />
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
                            <el-input v-model="world.gc" placeholder="Graphics Card" />
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <label>Publisher info<span class="red">*</span></label>
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-input v-model="world.publishedBy" placeholder="Published By" />
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="world.developedBy" placeholder="Developed By" />
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
                            <el-button class="full-width" type="primary" plain size="large" :disabled="actionsDisabled" @click="saveWorld(WORLD_STATUSES.DRAFT)">Save Draft</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" plain size="large" :disabled="actionsDisabled" @click="saveWorld(WORLD_STATUSES.PREVIEW)">Preview</el-button>
                        </el-col>
                    </el-row>
                    <ReleaseDate :init-date="world.releaseDate" @change-date="changeDate"/>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" link size="large" :disabled="actionsDisabled" @click="saveWorld(WORLD_STATUSES.ARCHIVE)">Archive World</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="full-width" type="primary" size="large" :disabled="actionsDisabled" @click="saveWorld(WORLD_STATUSES.PUBLISH)">Publish</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="thumbnail mt-20">
                    <h3>Thumbnail Image</h3>
                    <p>Upload an image at least <b>W: 300 H: 300 px</b></p>
                    <ImageGallery :limit="1" :images="[{image_url: editedWorld?.thumbnailLink}]" @imageUpdate="onThumbnailUpdate"/>
                </div>
                <!-- <el-button class="full-width mt-15" type="primary" size="large">World Editor</el-button> -->
            </el-col>

        </el-row>
    </el-container>
</template>

<script setup>
import WorldUpload from '@/components/worlds/WorldUpload.vue'
import WorldUploadImage from '@/components/worlds/WorldUploadImage.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import ReleaseDate from '../components/worlds/ReleaseDate.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, computed, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { WORLD_STATUSES } from '@/helpers/constants'

const store = useStore()
const router = useRouter()
const route = useRoute()

const imageTypes = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4', 'WEBM', 'WAV', 'OGG', 'GLB', 'GLTF']

const world = reactive({
  worldName: '',
  worldDescription: '',
  worldCapabilities: [],
  cpu: '',
  ram: '',
  gc: '',
  publishedBy: '',
  developedBy: '',
  playabelOn: [],
  releaseDate: new Date().toLocaleDateString('en-CA')
})

const updateFeaturedImage = () => {
  store.dispatch('worlds/updateFeaturedImage', featureImage.value)
}
const updateGallery = () => {
  store.dispatch('worlds/updateGallery', gallery.value)
}
const updateThumbnailImage = () => {
  store.dispatch('worlds/updateThumbnailImage', thumbnailImage.value)
}
const completeMultipartUpload = async () => {
  await store.dispatch('worlds/completeMultipartUpload', {
    fileName: fileName.value, etags: etags.value, uploadID: uploadId.value
  })
}

const featureImage = ref(null)
const thumbnailImage = ref(null)
const gallery = ref(null)
const functionsForEdit = ref(new Set())
const editedWorld = computed(() => store.state.worlds.editedWorld)
const capabilities = computed(() => store.getters['worlds/getCapabilities'])
const playableOn = computed(() => store.getters['worlds/getPlatforms'])
const etags = computed(() => store.state.worlds.eTags.length > 0 ? store.state.worlds.eTags : null)
const uploadId = computed(() => store.state.worlds.uploadUrl.uploadid)
const fileName = computed(() => store.state.worlds.fileName)
const uploadedWorldUrl = computed(() => store.state.worlds.uploadedWorldUrl)
const actionsDisabled = computed(() => !(isWorldFilled.value && featureImage.value && gallery.value && etags.value))
const isWorldFilled = computed(() => {
  return Object.values(world).every(value => value.length !== 0)
})

const createWorld = async () => {
  return await store.dispatch('worlds/createWorld', {
    worldAssetsUrl: uploadedWorldUrl.value,
    ...world
  })
}

const saveWorld = async (status) => {
  if (editedWorld.value) {
    functionsForEdit.value.forEach(func => func())
    store.dispatch('worlds/setWorldStatus', status)
  } else {
    await completeMultipartUpload()
    await createWorld()
    await store.dispatch('worlds/setWorldStatus', status)
    updateFeaturedImage()
    updateGallery()
    if (thumbnailImage.value) {
      updateThumbnailImage()
    }
    ElMessage.success('World successfully created')
  }
}

const onFeatureImage = (formData) => {
  functionsForEdit.value.add(updateFeaturedImage)
  featureImage.value = formData
}

const onGalleryUpdate = (images) => {
  console.log(images)
  functionsForEdit.value.add(updateGallery)
  const fd = new FormData()
  images.forEach((image, index) => {
    fd.append(index, image.raw)
  })
  gallery.value = fd
}

const onThumbnailUpdate = (images) => {
  functionsForEdit.value.add(updateThumbnailImage)
  const fd = new FormData()
  fd.append('thumbnailImage', images[0] ? images[0].raw : '')
  thumbnailImage.value = fd
}

const detectNewTag = (tags) => {
  tags.forEach(tag => {
    if (!capabilities.value.includes(tag)) {
      store.dispatch('worlds/createCapability', tag)
    }
  })
}

const changeDate = (date) => { world.releaseDate = date }

const editWorld = (worldToEdit) => {
  world.worldName = worldToEdit.worldName
  world.worldDescription = worldToEdit.worldDescription
  world.worldCapabilities = worldToEdit.capabilities
  world.cpu = worldToEdit.systemRequirements.cpu
  world.ram = worldToEdit.systemRequirements.ram
  world.gc = worldToEdit.systemRequirements.gc
  world.publishedBy = worldToEdit.publishedBy
  world.developedBy = worldToEdit.developedBy
  world.playabelOn = worldToEdit.playabelOn
  world.releaseDate = worldToEdit.releaseDate
}

onBeforeMount(async () => {
  if (route.params.id) {
    await store.dispatch('worlds/getWorld', route.params.id)
    editWorld(editedWorld.value)
  }
  await store.dispatch('worlds/getCapabilities')
  await store.dispatch('worlds/getPlatforms')
})
</script>

<style lang="scss">
#world {
    max-width: 1000px;
    color: #1c1c1c;
    font-size: 12px;
    padding-bottom: 15px;
    margin: 0 auto;

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
        padding: 15px 10px;
        overflow: hidden;

        p {
            font-size: 12px;
            margin: 0;
            line-height: 24px;
            margin-bottom: 5px;
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

    .gallery {
        .el-upload-list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-auto-flow: dense;
        }
        .el-upload-list__item,
        .el-upload--picture-card {
            width: 185px;
            height: 115px;
        }

        .el-upload-list--picture-card {
            gap: 23px;
        }
    }
}
</style>
