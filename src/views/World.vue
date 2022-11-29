<template>
  <el-container id="world" class="direction-column" v-loading="loading">
    <UploadProgress :showProgress="showProgress" :percentage="progress" />
    <el-row :gutter="60" v-if="!loading">
      <el-col :span="15">
        <div class="d-flex justify-between">
          <h1 class="title">{{ route.name }}</h1>
          <el-button type="primary" link :icon="ArrowLeft" @click="router.push('/')">Back to Worlds
          </el-button>
        </div>
        <p class="description">Upload World zip file, and world assets like title ,description, gallery images,
          thumbnails, system requirements and world capabilities. <span class="red">*</span></p>
        <WorldUpload width="100%" height="105px" :file="file" @fileChanged="fileChanged" @fileRemoved="fileRemoved" />
        <WorldUploadImage width="100%" height="300px" title="Feature Image" :file="{ banner_url: featureImage, type: world.featuredType }"
          :types="imageTypes" max-size="20MB" resolution="W: 1600 H: 800 px" @imageUpdate="onFeatureImage" />
        <div>
          <label>Name<span class="red">*</span></label>
          <el-input v-model="world.worldName" placeholder="World name" maxlength="20" show-word-limit />
        </div>
        <div>
          <label>Short Description<span class="red">*</span></label>
          <small>The short description will be included on the iWorld's feature section underneath its
            name.</small>
          <el-input v-model="world.worldDescription" maxlength="100"
            placeholder="Provide a short description of your item." show-word-limit type="textarea" rows='4' />
        </div>
        <div class="gallery">
          <label>Gallery<span class="red">*</span></label>
          <small>Images will be included on the World's gallery. Upload an image at least <b>W: 1200 H: 700
              px</b></small>
          <ImageGallery @imageUpdate="onGalleryUpdate" @imageRemove="onGalleryRemove" :images="gallery" />
        </div>
        <div>
          <label>Capabilities<span class="red">*</span></label>
          <small>Add or select your World capabilities.</small>
          <el-select v-model="world.worldCapabilities" placeholder="Select Capabilities" multiple filterable
            allow-create :reserve-keyword="false" default-first-option @change="detectNewTag">
            <el-option v-for="item in capabilities" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <div>
          <label>Playable on<span class="red">*</span></label>
          <small>Add the platforms your World is available to be played on.</small>
          <el-select v-model="world.playabelOn" placeholder="Select Platforms" multiple>
            <el-option v-for="item in playableOn" :key="item" :label="item" :value="item" />
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
        <PublishCard :date="world.releaseDate" :loading="buttonLoading" :disabled="actionsDisabled"
          @change-date="changeDate" @change-status="saveWorld" />
        <div class="thumbnail mt-20">
          <h3>Thumbnail Image</h3>
          <p>Upload an image at least <b>W: 300 H: 300 px</b></p>
          <ImageGallery :limit="1" :images="thumbnailImage" @imageUpdate="onThumbnailUpdate"
            @imageRemove="onThumbnailRemove" />
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
import UploadProgress from '@/components/worlds/UploadProgress.vue'
import PublishCard from '@/components/worlds/PublishCard.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, computed, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useFileUpload } from '@/composables/fileUpload'

const store = useStore()
const router = useRouter()
const route = useRoute()

const imageTypes = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4', 'WEBM', 'WAV', 'OGG', 'GLB', 'GLTF']
const { uploadFile, progress } = useFileUpload(store)
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

const loading = ref(false)
const buttonLoading = ref(false)
const featureImage = ref(null)
const thumbnailImage = ref([])
const gallery = ref([])
const functionsForEdit = ref(new Set())
const imagesToDelete = ref([])
const showProgress = ref(false)
const file = computed(() => store.state.worlds.file)
const editedWorld = computed(() => store.state.worlds.editedWorld)
const capabilities = computed(() => store.getters['worlds/getCapabilities'])
const playableOn = computed(() => store.getters['worlds/getPlatforms'])
const actionsDisabled = computed(() => !(isWorldFilled.value && featureImage.value && gallery.value.length && file.value))
const isWorldFilled = computed(() => {
  return Object.values(world).every(value => value.length !== 0)
})

const updateFeaturedImage = async () => {
  const fd = new FormData()
  fd.append('featuredImage', featureImage.value.raw)
  return await store.dispatch('worlds/updateFeaturedImage', fd)
}
const updateGallery = async () => {
  const fd = new FormData()
  gallery.value.forEach((image, index) => {
    if (image.raw) {
      fd.append(index, image.raw)
    }
  })
  return store.dispatch('worlds/updateGallery', fd)
}
const updateThumbnailImage = async () => {
  const fd = new FormData()
  fd.append('thumbnailImage', thumbnailImage.value[0].raw)
  return await store.dispatch('worlds/updateThumbnailImage', fd)
}
const removeWorldFile = async () => {
  return await store.dispatch('worlds/deleteWorldFile', route.params.id)
}

const removeGalleryImage = () => {
  const promises = []
  imagesToDelete.value.forEach(image => {
    promises.push(store.dispatch('worlds/deleteGalleryImage', image.id))
  })
  imagesToDelete.value = []
  return Promise.all(promises)
}

const removeThumbnailImage = async () => {
  return await store.dispatch('worlds/deleteThumbnailImage', route.params.id)
}

const removeFeatureImage = async () => {
  return await store.dispatch('worlds/deleteFeaturedImage', route.params.id)
}

const createWorld = async () => {
  return await store.dispatch('worlds/createWorld', { ...world })
}

const saveWorld = async (status) => {
  buttonLoading.value = true
  if (editedWorld.value) {
    if (functionsForEdit.value.has(uploadFile)) showProgress.value = true
    for (const func of functionsForEdit.value) {
      await func() // call all functions for edited data
    }
    await store.dispatch('worlds/updateWorld', {
      worldId: route.params.id,
      world: { ...world }
    })
    await store.dispatch('worlds/setWorldStatus', status)
    getWorld()
    functionsForEdit.value = new Set()
  } else {
    showProgress.value = true
    await createWorld()
    await uploadFile()
    await store.dispatch('worlds/setWorldStatus', status)
    await updateFeaturedImage()
    await updateGallery()
    if (thumbnailImage.value) {
      await updateThumbnailImage()
    }
    ElMessage.success('World successfully created')
  }
  buttonLoading.value = false
  showProgress.value = false
}

const onFeatureImage = (image) => {
  functionsForEdit.value.add(removeFeatureImage)
  functionsForEdit.value.add(updateFeaturedImage)
  featureImage.value = image
}

const onGalleryUpdate = (images) => {
  functionsForEdit.value.add(updateGallery)
  gallery.value = images
}

const onThumbnailUpdate = (images) => {
  functionsForEdit.value.add(updateThumbnailImage)
  thumbnailImage.value = images
}

const onGalleryRemove = (image) => {
  if (!image.id) return
  functionsForEdit.value.add(removeGalleryImage)
  imagesToDelete.value.push(image)
}

const onThumbnailRemove = () => {
  functionsForEdit.value.add(removeThumbnailImage)
}

const detectNewTag = (tags) => {
  tags.forEach(tag => {
    if (!capabilities.value.includes(tag)) {
      store.dispatch('worlds/createCapability', tag)
    }
  })
}

const changeDate = (date) => { world.releaseDate = date }

const fileChanged = () => {
  functionsForEdit.value.add(uploadFile)
}

const fileRemoved = () => {
  functionsForEdit.value.add(removeWorldFile)
  store.commit('worlds/setFile', null)
}

const fillWorld = (worldToEdit) => {
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

  featureImage.value = worldToEdit.featuredUrl
  thumbnailImage.value = worldToEdit.thumbnailLink ? [{ url: worldToEdit.thumbnailLink }] : []
  gallery.value = worldToEdit.imageUrls.map(image => {
    return { url: image.image_url, id: image.id }
  })
}

const getWorld = async () => {
  if (route.params.id) {
    loading.value = true
    await store.dispatch('worlds/getWorld', route.params.id)
    await store.dispatch('worlds/getWorldFileInfo', route.params.id)
    fillWorld(editedWorld.value)
    loading.value = false
  } else {
    store.commit('worlds/setEditedWorld', null)
  }
}

onBeforeMount(async () => {
  getWorld()
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
