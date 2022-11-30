<template>
    <div class="error-page">
        <img src="@/assets/icons/Sequin.world.svg" alt="Logo">
        <h1>Oops!</h1>
        <h2 class="ma-0">{{route.params.message}}</h2>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style lang="scss">
.error-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0F0F0F;
    color: #fff;
    text-align: center;

    img {
        width: 100px;
    }
}
</style>
