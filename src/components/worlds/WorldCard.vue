<template>
  <el-card
    class="world-card"
    :body-style="{ padding: '0px' }"
    @click="openWorld('view', props.world)"
  >
    <div v-if="props.world.thumbnail_link" class="image-container" :style="{ backgroundImage: `url(${props.world.thumbnail_link})` }"></div>
    <img v-else class="default-image" src="@/assets/default.png" alt="default-image">
    <dropdown @click.stop>
      <!-- <li @click.stop="router.push(`/settings/${props.world.public_id}`)">
        Settings
      </li> -->
      <li @click="copyLink(props.world.public_id)">
        Share
      </li>
      <li @click.stop="router.push(`/world-editor/${props.world.public_id}`)">
        World Editor
      </li>
    </dropdown>
    <div class="world-card__footer">
      <h3>{{ props.world.worldname }}</h3>
      <div class="world-statuses">
        <span v-if="props.world.publish_status === WORLD_STATUSES.PUBLISH" class="status published">Published</span>
        <span v-if="props.world.publish_status === WORLD_STATUSES.ARCHIVE" class="status archived">Archived</span>
        <span v-if="props.world.publish_status === WORLD_STATUSES.DRAFT" class="status drafted">Drafted</span>
      </div>
    </div>
  </el-card>
  <WorldLoadingModal
    :show-modal="isWorldLoadingModal"
    :world="props.world"
    @close="isWorldLoadingModal = false"
  />
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useOpenWorld } from '@/composables/OpenWorld'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { WORLD_STATUSES } from '@/helpers/constants'

const WorldLoadingModal = defineAsyncComponent(() =>
  import('@/components/modals/WorldLoadingModal.vue')
)

const Dropdown = defineAsyncComponent(() =>
  import('@/components/Dropdown.vue')
)

const store = useStore()
const router = useRouter()
const { openWorld, isWorldLoadingModal } = useOpenWorld(store)
const props = defineProps({
  world: {
    type: Object,
    default: () => { }
  }
})
// const isOnline = ref(true)

const copyLink = (id) => {
  navigator.clipboard.writeText(`${window.document.location.href}settings/${id}`)
  ElMessage.success('Copied')
}
</script>

<style lang="scss">
.world-card {
  position: relative;
  cursor: pointer;

  .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .image-container {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
  }

  .default-image {
    height: 300px;
  }

  .dropdown {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__footer {
    padding: 20px 15px;

    h3 {
      margin: 0;
      font-size: 18px;
      font-family: 'Montserrat-SemiBold';
    }

  }

  .statistics {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    color: #d8d8d8;

    &--card {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .world-statuses {
    .status {
      position: relative;
      font-size: 14px;
      padding-left: 20px;

      &:before {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #A6A6A6;
        border-radius: 50%;
        left: 0;
        top: 2px;
      }
    }
    .published::before {
      background-color: #09B700;
    }
    .archived::before {
      background-color: #F00505;
    }
    .drafted::before {
      background-color: #A6A6A6;
    }
  }

  .online {
    background-color: var(--el-color-success);
  }

  .green {
    color: var(--el-color-success);
  }
}
</style>
