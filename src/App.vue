<template>
  <div v-loading="loading" class="common-layout">
    <router-view v-if="worlds"></router-view>
  </div>
</template>

<script setup>
import { onMounted, inject, computed, ref } from 'vue';
import { useStore } from 'vuex'

const store = useStore();
const auth = inject('Auth');

const worlds = computed(() => store.state.worlds.worlds);
let loading = ref(true);

onMounted(async () => {
  store.commit('setUser', auth.user.value);
  await auth.getTokenSilently().then((data) => {
    store.commit('updateAccessToken', data);
  });
  await store.dispatch('team/getTeam');
  await store.dispatch('worlds/getWorlds');
  loading.value = false;
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
