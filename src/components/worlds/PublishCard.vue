<template>
    <div class="publish">
        <h3>Publish</h3>
        <p>Publish, save as a draft or preview.</p>
        <el-row class="mt-15" :gutter="15">
            <el-col :span="12">
                <el-button class="full-width" type="primary" plain size="large" :loading="props.loading"
                    :disabled="disabled" @click="emits('changeStatus', WORLD_STATUSES.DRAFT)">Save Draft</el-button>
            </el-col>
            <el-col :span="12">
                <el-button class="full-width" type="primary" plain size="large"
                    :disabled="!world" @click="onPreview">Preview</el-button>
            </el-col>
        </el-row>
        <ReleaseDate :init-date="date" @change-date="emits('changeDate', $event)" />
        <el-row :gutter="15">
            <el-col :span="12">
                <el-button class="full-width" type="primary" link size="large" :loading="props.loading"
                    :disabled="disabled" @click="emits('changeStatus', WORLD_STATUSES.ARCHIVE)">Archive World</el-button>
            </el-col>
            <el-col :span="12">
                <el-button class="full-width" type="primary" size="large" :loading="props.loading" :disabled="disabled"
                    @click="emits('changeStatus', WORLD_STATUSES.PUBLISH)">Publish</el-button>
            </el-col>
        </el-row>
    </div>
    <WorldLoadingModal
    :show-modal="isWorldLoadingModal"
    :world="world"
    @close="isWorldLoadingModal = false"
  />
</template>
<script setup>
import ReleaseDate from '@/components/worlds/ReleaseDate.vue'
import WorldLoadingModal from '@/components/modals/WorldLoadingModal.vue'
import { WORLD_STATUSES } from '@/helpers/constants'
import { computed, ref } from 'vue'
import { useOpenWorld } from '@/composables/OpenWorld'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  loading: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  date: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['changeStatus', 'changeDate'])
const { openWorld } = useOpenWorld(store)
const isWorldLoadingModal = ref(false)
const world = computed(() => store.state.worlds.editedWorld)
const onPreview = () => {
  openWorld('view', world)
  isWorldLoadingModal.value = true
}
</script>
<style lang="scss">
.publish {
  .el-button--primary.is-plain {
  &:active {
    color: var(--el-color-primary);
  }
}
}
</style>
