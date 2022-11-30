<template>
  <div
    class="common-layout"
  >
    <router-view v-if="!loading" />
  </div>
</template>

<script setup>
import { onBeforeMount, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const auth = inject('Auth')
const loading = ref(true)

const userInfo = (token) => {
  auth.client.userInfo(token, (err, user) => {
    if (err) {
      loading.value = false
      return console.log('user error', err)
    }
    store.commit('setUser', user)
    store.commit('updateAccessToken', token)
    loading.value = false
    router.push('/worlds')
  })
}

const parseHash = () => {
  auth.parseHash({ hash: window.location.hash }, (err, authResult) => {
    if (err) {
      router.push({ name: 'Error', params: { message: err.errorDescription } })
      loading.value = false
      return console.log('hash error', err)
    }
    userInfo(authResult.accessToken)
  })
}

onBeforeMount(async () => {
  const token = sessionStorage.getItem('token')
  if (token) {
    userInfo(token)
  } else if (window.location.hash) {
    parseHash()
  } else {
    router.push('/auth/login')
    loading.value = false
  }
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
