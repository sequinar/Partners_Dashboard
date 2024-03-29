<template>
  <el-row class="header">
    <el-col :span="12">
      <el-input v-if="route.name === 'Worlds'" v-model.trim="search" size="large" placeholder="Search Worlds"
        autocomplete="off">
        <template #prefix>
          <img src="../assets/icons/Search.svg" alt="Search">
        </template>
      </el-input>
    </el-col>
    <el-col :span="12" class="alignment-container">
      <el-dropdown trigger="click" popper-class="headerDropdown" placement="bottom-end">
        <span class="el-dropdown-link">
          <el-avatar :key="user.updated_at" :src="user.picture" />
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawer = true">
              <img src="../assets/icons/AccountSettings.svg" alt="AccountSettings"> Account Settings
            </el-dropdown-item>
            <el-dropdown-item @click="logOut">
              <img src="../assets/icons/LogoutIcon.svg" alt="LogoutIcon">Log Out
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
  <el-drawer v-model="drawer" size="400px" :with-header="false" destroy-on-close>
    <AccountSettings :user="user" @close="drawer = false" @update-user="updateUser" @updatePassword="updatePassword">
      <template v-slot:avatar>
        <UserAvatar :user-avatar="user.picture" @avatar-update="updateUser" @error="showError"/>
      </template>
    </AccountSettings>
  </el-drawer>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { AccountSettings, UserAvatar } from 'sequin-platform-packages'

const store = useStore()
const route = useRoute()
const user = computed(() => store.state.user)
const search = computed({
  get () {
    return store.state.worlds.filter
  },
  set (value) {
    store.commit('worlds/setFilter', value)
  }
})
const drawer = ref(false)
const auth = inject('Auth')

const showError = (error) => {
  store.commit('setMessageError', error)
}

const updateUser = (data) => {
  store.dispatch('updateUser', data)
}

const updatePassword = (data) => {
  store.dispatch('updatePassword', data)
}

const logOut = () => {
  sessionStorage.removeItem('token')
  auth.logout()
}
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
