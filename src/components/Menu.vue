<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical"
    :collapse="isCollapse"
    @mouseenter="openMenu"
    @mouseleave="collapseMenu"
  >
    <router-link to="/">
      <img
        class="logo"
        src="../assets/icons/Sequin.world.svg"
        alt="logo"
      >
    </router-link>
    <el-button
      v-show="!isCollapse"
      text
      large
      class="collapseButton"
      :class="{ flip: !blockCollapse }"
      @click="toggleCollapse"
    >
      <img
        src="../assets/icons/CollapseLeftpanel_icon.svg"
        alt="collapseIcon"
      >
    </el-button>
    <el-menu-item
      index="1"
      :class="showIntruction(0)"
      @click="goTo('/')"
    >
      <img
        src="../assets/icons/Worlds.svg"
        alt="worlds"
      >
      <template #title>
        Worlds
      </template>
    </el-menu-item>
    <el-menu-item
      index="2"
      :class="showIntruction(1)"
      @click="goTo('/team')"
    >
      <img
        src="../assets/icons/Teams.svg"
        alt="team"
      >
      <template #title>
        Team
      </template>
    </el-menu-item>
    <!-- <el-menu-item index="3" @click="goTo('/analytics')">
            <img src="../assets/Analytics.png" alt="analytics">
            <template #title>Analytics</template>
        </el-menu-item> -->
    <el-menu-item
      class="onboarding"
      index="4"
      @click="isOnboarding = true"
    >
      <img
        src="../assets/icons/Onboarding.svg"
        alt="Onboarding"
      >
      <template #title>
        Onboarding
      </template>
    </el-menu-item>
  </el-menu>
  <Onboarding
    v-if="isOnboarding"
    :is-open="isOnboarding"
    :is-collapsed="isCollapse"
    :top="rectTopInsruction"
    @change="slideChange"
    @close="isOnboarding = false"
  />
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue"
import { useRouter } from 'vue-router'

const Onboarding = defineAsyncComponent(() =>
  import('./modals/Onboarding.vue')
)

const router = useRouter()

let isCollapse = ref(true);
let blockCollapse = ref(false);
let onboardingSlide = ref(0);
const isOnboarding = ref(false);

const rectTopInsruction = computed(() => {
    return document.querySelectorAll('.el-menu-item')[onboardingSlide.value].getBoundingClientRect().top;
})

function openMenu() {
    if (isOnboarding.value) return;
    isCollapse.value = false;
}

function collapseMenu() {
    if (blockCollapse.value) return;
    isCollapse.value = true;
}

function toggleCollapse() {
    blockCollapse.value = !blockCollapse.value;
    if (!blockCollapse.value) isCollapse.value = true;
}

function goTo(route) {
    if (isOnboarding.value) return;
    router.push(route);
}

function slideChange(index) {
    onboardingSlide.value = index;
}

function showIntruction(index) {
    return {
        'instruction': isOnboarding.value && onboardingSlide.value === index
    }
}
</script>

<style scoped lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;
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
    z-index: 999999;
}
</style>
