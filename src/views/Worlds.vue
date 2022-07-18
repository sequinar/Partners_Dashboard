<template>
  <el-row>
    <el-col :span="12">
      <h1 class="pageTitle">
        All Worlds
      </h1>
    </el-col>
    <el-col
      :span="12"
      class="worldsPagination"
    >
      <!-- <el-button type="primary" size="large" :icon="Plus">New World</el-button> -->
      <el-pagination
        v-if="worlds.data"
        v-model:currentPage="page"
        background
        :total="worlds.meta.totalCount"
        :page-size="limit"
        layout="prev, pager, next"
        hide-on-single-page
      />
    </el-col>
  </el-row>
  <el-row
    v-loading="loading"
    class="worldsContainer"
  >
    <World
      v-for="world in worlds.data"
      :key="world.world_id"
      :world="world"
    />
  </el-row>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const World = defineAsyncComponent(() =>
  import('../components/World.vue')
)

const store = useStore();
const worlds = computed(() => store.state.worlds.worlds);
const loading = ref(true);
const limit = ref(8);
const page = ref(1);

onMounted(async () => {
  await store.dispatch('worlds/getWorlds', {
    limit: limit.value,
    page: page.value,
    filter: ''
  });
  loading.value = false;
})

watch(page, async (newPage) => {
    loading.value = true;
    await store.dispatch('worlds/getWorlds', {
      limit: limit.value,
      page: newPage,
      filter: ''
    });
    loading.value = false;
})
</script>

<style lang="scss">
.worldsPagination {
  display: flex;
  justify-content: flex-end;

  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
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
</style>