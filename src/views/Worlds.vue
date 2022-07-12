<template>
  <el-row>
    <el-col :span="12">
      <h1 class="pageTitle">
        All Worlds
      </h1>
    </el-col>
    <el-col
      :span="12"
      class="buttonsGroup"
    >
      <!-- <el-button type="primary" size="large" :icon="Plus">New World</el-button> -->
      <el-button-group class="buttonsGroup__pagination">
        <el-button
          size="large"
          disabled
          :icon="ArrowLeft"
        />
        <el-button
          size="large"
          :icon="ArrowRight"
        />
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="worldsContainer">
    <World
      v-for="world in worlds"
      :key="world.world_id"
      :world="world"
    />
  </el-row>
</template>

<script setup>
import { Plus, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';

const World = defineAsyncComponent(() =>
  import('../components/World.vue')
)

const store = useStore();
const worlds = computed(() => store.state.worlds.worlds);
</script>

<style scoped lang="scss">
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