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

const parseHash = async () => {
  if (window.location.hash) {
    await auth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err) {
        return console.log('hash', err)
      }
      auth.client.userInfo(authResult.accessToken, (err, user) => {
        if (err) {
          return console.log('user', err)
        }
        console.log(user)
        store.commit('setUser', user)
        loading.value = false
        router.push('/worlds')
      })
    })
  }
}

onBeforeMount(async () => {
  await auth.checkSession({
    responseType: 'token'
  },
  async (err, authResult) => {
    if (err) {
      return console.log('session', err)
    }
    console.log(authResult)
    store.commit('updateAccessToken', authResult.accessToken)
    await parseHash()
  })
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
