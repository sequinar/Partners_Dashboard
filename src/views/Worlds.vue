<template>
  <el-row>
    <el-col :span="12">
      <h1 class="pageTitle">
        All Worlds
      </h1>
    </el-col>
    <el-col :span="12" class="worldsPagination">
      <el-pagination v-if="worlds?.data" v-model:currentPage="page" background :total="worlds.meta.totalCount"
        :page-size="limit" layout="prev, pager, next" hide-on-single-page />
        <el-button type="primary" size="large" :icon="Plus" @click="router.push('/new-world')">Add World</el-button>
    </el-col>
  </el-row>
  <div class="loadingContainer" v-loading="worlds === null">
    <el-row v-if="worlds?.data" class="worldsContainer">
      <WorldCard v-for="world in worlds.data" :key="world.world_id" :world="world" />
    </el-row>
    <el-empty v-if="worlds && Object.keys(worlds.data).length === 0" description="You don't have any worlds available yet." />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const WorldCard = defineAsyncComponent(() =>
  import('../components/worlds/WorldCard.vue')
)

const store = useStore()
const router = useRouter()
const worlds = computed(() => store.state.worlds.worlds)
const limit = ref(8)
const page = ref(1)

watch(page, async (newPage) => {
  await store.dispatch('worlds/getWorlds', {
    limit: limit.value,
    page: newPage,
    filter: ''
  })
})

onMounted(async () => {
  await store.dispatch('worlds/getWorlds')
})
</script>

<style lang="scss">
.worldsPagination {
  display: flex;
  justify-content: flex-end;

  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next {
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border: none;

    &:disabled {
      background-color: transparent;
    }
  }

  .el-pagination.is-background .el-pager li {
    background-color: #fff;
    width: 40px;
    height: 40px;
  }
}

.buttonsGroup {
  display: flex;
  justify-content: flex-end;

  &>button:first-child {
    margin-right: 30px;
  }

  &__pagination {
    .el-button {
      background-color: #fff;
      width: 40px;
      height: 40px;
      border-radius: 3px;
      border: none;

      &.is-disabled {
        background-color: transparent;
      }
    }
  }
}

.worldsContainer {
  padding-top: 40px;
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.loadingContainer {
  min-height: 500px;
}
</style>
