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
                <el-button v-if="world" class="full-width" type="primary" plain size="large" :loading="props.loading"
                    :disabled="disabled" @click="openWorld('view', world)">Preview</el-button>
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
</template>
<script setup>
import ReleaseDate from '@/components/worlds/ReleaseDate.vue'
import { WORLD_STATUSES } from '@/helpers/constants'
import { computed } from 'vue'
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
const world = computed(() => store.state.worlds.editedWorld)
</script>
<style lang="scss">

</style>
