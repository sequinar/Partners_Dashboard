<template>
  <el-row class="header">
    <el-col :span="12">
      <el-input
        v-model.trim="search"
        size="large"
        placeholder="Search Worlds"
      >
        <template #prefix>
          <img
            src="../assets/icons/Search.svg"
            alt="Search"
          >
        </template>
      </el-input>
    </el-col>
    <el-col
      :span="12"
      class="alignment-container"
    >
      <!-- <el-button class="bell" text size="large" circle>
                <bell-outline />
            </el-button> -->
      <el-dropdown
        trigger="click"
        popper-class="headerDropdown"
        placement="bottom-end"
      >
        <span class="el-dropdown-link">
          <el-avatar
            :key="user.updated_at"
            :src="user.picture"
          />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawer = true">
              <img
                src="../assets/icons/AccountSettings.svg"
                alt="AccountSettings"
              > Account Settings
            </el-dropdown-item>
            <el-dropdown-item @click="logOut">
              <img
                src="../assets/icons/LogoutIcon.svg"
                alt="LogoutIcon"
              >Log Out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
  <el-drawer
    v-model="drawer"
    size="400px"
    :with-header="false"
    destroy-on-close
  >
    <account-settings @close="drawer = false" />
  </el-drawer>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { ref, computed, defineAsyncComponent, watch } from "vue";
import { useStore } from 'vuex';
import useDebounce from '../composables/debounce';

const AccountSettings = defineAsyncComponent(() =>
  import('./AccountSettings.vue')
)

const store = useStore();
const user = computed(() => store.state.user);
const search = ref('');
const drawer = ref(false);

const logOut = () => {
    auth.logout();
}

watch(search, useDebounce((newVal) => {
  store.dispatch('worlds/getWorlds', {
      limit: 10,
      page: 1,
      filter: newVal
    });
}, 500))
</script>

<style scoped lang="scss">
.header {
    .bell {
        font-size: 22px;
    }

    .alignment-container {
        display: flex;
        justify-content: flex-end;
    }

    .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>