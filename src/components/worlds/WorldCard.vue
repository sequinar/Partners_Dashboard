<template>
  <el-card
    class="worldItem"
    :body-style="{ padding: '0px' }"
    @click="openWorld('view', props.world)"
  >
    <img
      :src="props.world.thumbnail_link"
      class="image"
    >
    <dropdown @click.stop>
      <li @click.stop="router.push(`/settings/${props.world.public_id}`)">
        Settings
      </li>
      <li @click="copyLink(props.world.public_id)">
        Share
      </li>
      <li @click.stop="router.push(`/world-editor/${props.world.public_id}`)">
        World Editor
      </li>
    </dropdown>
    <div class="worldItem--footer">
      <h3>{{ props.world.worldname }}</h3>
      <!-- <div class="statistics">
                <span class="statistics--item">
                    <span class="status" :class="{ online: isOnline }"></span>
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <EyeOutline />
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <ChatOutline />
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <HeartOutline />
                    <small>0045</small>
                </span>
                <ArrowUp class="green" />
            </div> -->
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
.worldItem {
  position: relative;
  cursor: pointer;

  .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  img {
    width: 100%;
    height: auto;
  }

  .dropdown {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &--footer {
    padding: 30px 15px;
    text-align: center;

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

    &--item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .status {
    width: 12px;
    height: 12px;
    display: inline-block;
    background-color: var(--el-color-error);
    border-radius: 10px;
  }

  .online {
    background-color: var(--el-color-success);
  }

  .green {
    color: var(--el-color-success);
  }
}
</style>
