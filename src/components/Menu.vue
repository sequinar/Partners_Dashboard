<template>
  <el-menu default-active="1" class="el-menu-vertical">
    <router-link to="/">
      <img class="logo" src="../assets/icons/Sequin.world.svg" alt="logo">
    </router-link>
    <el-button text large class="collapseButton" :class="{ flip: !blockCollapse }" @click="toggleCollapse($event)">
      <img src="../assets/icons/CollapseLeftpanel_icon.svg" alt="collapseIcon">
    </el-button>
    <el-menu-item index="1" :class="showIntruction(0)" @click="goTo('/')">
      <img src="../assets/icons/Worlds.svg" alt="worlds">
      <template #title>
        <span class="title">Worlds</span>
      </template>
    </el-menu-item>
    <el-menu-item index="2" :class="showIntruction(1)" @click="goTo(`/team/${team?.teamId || ''}`)">
      <img src="../assets/icons/Teams.svg" alt="team">
      <template #title>
        <span class="title">Team</span>
      </template>
    </el-menu-item>
    <el-menu-item index="3" @click="goTo('/listings')">
      <img src="../assets/icons/Listings.svg" alt="Listings">
      <template #title>
        <span class="title">Listings or Products</span>
      </template>
    </el-menu-item>
    <el-menu-item class="onboarding" index="4" @click="isOnboarding = true">
      <img src="../assets/icons/Onboarding.svg" alt="Onboarding">
      <template #title>
        <span class="title">Onboarding</span>
      </template>
    </el-menu-item>
  </el-menu>
  <Onboarding v-if="isOnboarding" :is-open="isOnboarding" :top="rectTopInsruction" @change="slideChange"
    @close="isOnboarding = false" />
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const Onboarding = defineAsyncComponent(() =>
  import('./modals/Onboarding.vue')
)

const router = useRouter()
const store = useStore()
const blockCollapse = ref(false)
const onboardingSlide = ref(0)
const isOnboarding = ref(false)

const team = computed(() => store.state.team.team)
const rectTopInsruction = computed(() => {
  return document.querySelectorAll('.el-menu-item')[onboardingSlide.value].getBoundingClientRect().top
})

function toggleCollapse (event) {
  event.target.classList.toggle('flip')
  const menu = document.querySelector('.el-menu-vertical')
  menu.classList.toggle('open-menu')
}

function goTo (route) {
  if (isOnboarding.value) return
  router.push(route)
}

function slideChange (index) {
  onboardingSlide.value = index
}

function showIntruction (index) {
  return {
    instruction: isOnboarding.value && onboardingSlide.value === index
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical {
  width: 80px;
  overflow: hidden;
  transition: width 0.3s ease;

  .title {
    opacity: 0;
    margin-left: 20px;
    transition: all 0.3s;
  }

  .collapseButton {
    opacity: 0;
  }

  &:hover {
    width: 300px;

    .title,
    .collapseButton {
      opacity: 1;
    }
  }
}

.open-menu {
  width: 300px !important;

  .title,
  .collapseButton {
    opacity: 1;
  }
}

.flip {
  transform: rotateY(180deg);
}

.onboarding {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin-bottom: 0;

  i {
    font-size: 23px;
    margin-right: 20px;
  }
}

.instruction {
  border: 2px solid #FFF;
  box-shadow: 0 1px 4px 0 #FFF;
  border-radius: 5px;
}
</style>
