<template>
  <div class="common-layout">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { useStore } from 'vuex'

const store = useStore();
const auth = inject('Auth');

onMounted(async () => {
  store.commit('setUser', auth.user.value);
  await auth.getTokenSilently().then((data) => {
    store.commit('updateAccessToken', data);
  });
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
