<template>
  <div
    class="common-layout"
  >
    <router-view />
  </div>
</template>

<script setup>
import { onBeforeMount, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const auth = inject('Auth')

onBeforeMount(() => {
  if (window.location.hash) {
    auth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err) {
        return console.log('hash', err)
      }
      auth.client.userInfo(authResult.accessToken, (err, user) => {
        if (err) {
          return console.log('user', err)
        }
        console.log(user)
        store.commit('setUser', user)
        router.push('/worlds')
      })
    })
  } else {
    router.push('/auth/login')
  }
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
