<template>
  <el-row>
    <el-col :span="6">
      <h1 class="pageTitle">
        All Worlds
      </h1>
    </el-col>
    <el-col :span="18" class="worldsHeader">
      <div class="filters">
        <el-select class="filters__active" v-model="filters.periodFilter" placeholder="Select">
          <el-option v-for="item in filterActiveOptions" :key="item.value" :label="item.title" :value="item.value" />
        </el-select>
        <el-select class="filters__alphabet" v-model="filters.sortFilter" placeholder="Select">
          <el-option v-for="item in ['A-Z', 'Z-A']" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <el-pagination v-if="worlds?.data" v-model:currentPage="filters.page" background :total="worlds.meta.totalCount"
        :page-size="filters.limit" layout="prev, pager, next" hide-on-single-page />
      <el-button type="primary" size="large" :icon="Plus" @click="router.push('/worlds/new-world')">Add World</el-button>
    </el-col>
  </el-row>
  <div class="loadingContainer" v-loading="worlds === null">
    <el-row v-if="worlds?.data" class="worldsContainer">
      <WorldCard v-for="world in worlds.data" :key="world.world_id" :world="world" />
    </el-row>
    <el-empty v-if="worlds && Object.keys(worlds.data).length === 0"
      description="You don't have any worlds available yet." />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, watch, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import useDebounce from '@/composables/debounce'

const WorldCard = defineAsyncComponent(() =>
  import('@/components/worlds/WorldCard.vue')
)

const store = useStore()
const router = useRouter()
const worlds = computed(() => store.state.worlds.worlds)
const search = computed(() => store.state.worlds.filter)
const filters = reactive({
  limit: 8,
  page: 1,
  periodFilter: '',
  sortFilter: 'A-Z',
  filter: ''
})
const filterActiveOptions = [
  {
    value: '3 months',
    title: 'Active last 3 months'
  },
  {
    value: '6 months',
    title: 'Active last 6 months'
  },
  {
    value: '1 year',
    title: 'Active last 1 year'
  },
  {
    value: '',
    title: 'View All'
  }
]

watch(filters, async (newValue) => {
  await store.dispatch('worlds/getWorlds', {
    ...newValue,
    filter: search.value
  })
})

watch(search, useDebounce((newVal) => {
  store.dispatch('worlds/getWorlds', {
    ...filters,
    filter: newVal
  })
}, 500))

onMounted(async () => {
  await store.dispatch('worlds/getWorlds', filters)
})
</script>

<style lang="scss">
.worldsHeader {
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

  .filters {
    margin-right: 25px;
    display: flex;
    align-items: center;

    input {
      font-family: 'Montserrat-SemiBold';
      color: #1c1c1c
    }

    .el-input__wrapper {
      box-shadow: none !important;
    }

    &__active {
      width: 190px;
    }

    &__alphabet {
      width: 80px;
    }
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
