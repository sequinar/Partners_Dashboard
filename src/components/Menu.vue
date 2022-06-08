<template>
    <el-menu default-active="1" class="el-menu-vertical" :collapse="isCollapse" @mouseenter="openMenu"
        @mouseleave="collapseMenu">
        <router-link to="/"><img class="logo" src="../assets/Sequin.world.png" alt="logo"></router-link>
        <el-button v-show="!isCollapse" text large class="collapseButton" :class="{ flip: !blockCollapse }"
            @click="toggleCollapse">
            <img src="../assets/CollapseMenu.png" alt="collapseIcon">
        </el-button>
        <el-menu-item index="1" @click="goTo('/')">
            <img src="../assets/Worlds.png" alt="worlds">
            <template #title>Worlds</template>
        </el-menu-item>
        <!-- <el-menu-item index="2" @click="goTo('/analytics')">
            <img src="../assets/Analytics.png" alt="analytics">
            <template #title>Analytics</template>
        </el-menu-item> -->
        <el-menu-item index="3" @click="goTo('/team')">
            <img src="../assets/Team.png" alt="team">
            <template #title>Team</template>
        </el-menu-item>
        <el-menu-item class="onboarding" index="4" @click="isOnboarding = true">
            <el-icon>
                <QuestionFilled />
            </el-icon>
            <template #title>Onboarding</template>
        </el-menu-item>
    </el-menu>
    <Onboarding :is-open="isOnboarding" @close="isOnboarding = false" />
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { QuestionFilled } from '@element-plus/icons-vue'
import Onboarding from "./modals/Onboarding.vue";

const router = useRouter()

let isCollapse = ref(true);
let blockCollapse = ref(false);
const isOnboarding = ref(false);

function openMenu() {
    isCollapse.value = false;
};

function collapseMenu() {
    if (blockCollapse.value) return;
    isCollapse.value = true;
}

function toggleCollapse() {
    blockCollapse.value = !blockCollapse.value;
    if (!blockCollapse.value) isCollapse.value = true;
}

function goTo(route) {
    router.push(route);
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
    bottom: 0;
    left: 0;
    right: 0;

    i {
        font-size: 23px;
        margin-right: 20px;
    }
}
</style>
