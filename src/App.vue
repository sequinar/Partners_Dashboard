<template>
  <div
    v-loading="loading"
    class="common-layout"
  >
    <router-view v-if="worlds && team" />
  </div>
</template>

<script setup>
import { onMounted, inject, computed, ref, watch } from 'vue';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore();
const auth = inject('Auth');
const worlds = computed(() => store.state.worlds.worlds);
const team = computed(() => store.state.team.team);
const messageSuccess = computed(() => store.state.messageSuccess);
const messageError = computed(() => store.state.messageError);

let loading = ref(true);

onMounted(async () => {
  store.commit('setUser', auth.user.value);
  await auth.getTokenSilently().then((data) => {
    store.commit('updateAccessToken', data);
  });
  let team = await store.dispatch('team/getTeam');
  if(!team.data[0]) {
    await store.dispatch('team/createTeam');
  } 
  loading.value = false;
})

watch(messageSuccess, (value) => {
  if (!value) return;
  ElMessage.success(value);
  store.commit('setMessageSuccess', null)
})

watch(messageError, (value) => {
  if (!value) return;
  ElMessage.error(value);
  store.commit('setMessageError', null)
})
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
