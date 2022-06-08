<template>
    <div class="loginPage">
        <div class="header d-flex justify-between align-center">
            <router-link to="/"><img src="../assets/Sequin.world.png" alt="Logo" /></router-link>
            <el-button v-if="route.path == '/auth'" type="primary" size="large" @click="goTo('/auth/login')">Log In
            </el-button>
            <el-button v-if="route.path == '/auth/login'" type="primary" size="large" @click="goTo('/auth')">Sign Up
            </el-button>
        </div>
        <div class="body d-flex justify-center align-center">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const goTo = (path) => {
    router.push(path);
}
</script>

<style lang="scss" scoped>
.loginPage {
    background-color: #0f0f0f;
    height: 100vh;

    .header {
        padding: 25px 45px;

        .el-button {
            width: 140px;
            height: 40px;
        }
    }

    .body {
        height: 85%;
    }
}
</style>