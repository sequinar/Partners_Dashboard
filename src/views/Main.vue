<template>
  <el-container v-if="token && team && user">
    <el-aside>
      <Menu />
    </el-aside>
    <el-container class="main-container">
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import Menu from '../components/Menu.vue'
import Header from '../components/Header.vue'

const store = useStore()
const messageSuccess = computed(() => store.state.messageSuccess)
const messageError = computed(() => store.state.messageError)
const token = computed(() => store.state.accessToken)
const team = computed(() => store.state.team.team)
const user = computed(() => store.state.user)

onMounted(async () => {
  store.dispatch('getUser')
  await store.dispatch('team/getTeam')
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
