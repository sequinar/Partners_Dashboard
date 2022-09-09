<template>
  <el-container v-loading="loading">
    <el-aside>
      <Menu />
    </el-aside>
    <el-container class="main-container">
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view v-if="token"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { onMounted, inject, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import Menu from '../components/Menu.vue'
import Header from '../components/Header.vue'

const store = useStore()
const auth = inject('Auth')
const messageSuccess = computed(() => store.state.messageSuccess)
const messageError = computed(() => store.state.messageError)
const token = computed(() => store.state.accessToken)

const loading = ref(false)

onMounted(async () => {
  store.commit('setUser', auth.user.value)
  await auth.getTokenSilently().then((data) => {
    store.commit('updateAccessToken', data)
  })
  store.dispatch('getUser')
  await store.dispatch('team/getTeam')
  await store.dispatch('worlds/getWorlds')
  loading.value = false
})

watch(messageSuccess, (value) => {
  if (!value) return
  ElMessage.success(value)
  store.commit('setMessageSuccess', null)
})

watch(messageError, (value) => {
  if (!value) return
  ElMessage({
    type: 'error',
    message: value,
    duration: 5000
  })
  store.commit('setMessageError', null)
})
</script>
