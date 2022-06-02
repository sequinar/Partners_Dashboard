<template>
    <el-dialog custom-class="onboarding" v-model="isOpen" width="600px" @close="$emit('close')" destroy-on-close>
        <el-carousel :autoplay="false" :loop="false" trigger="click" arrow="always" height="450px">
            <el-carousel-item>
                <img src="../../assets/Group.png" alt="onboarding image1">
                <h2>Manage and preview your World</h2>
                <p>Follow projects at every stage. You know where work stands, keep everyone aligned on goals, and
                    control remotely any enviroment from anywhere in the world.</p>
            </el-carousel-item>
            <el-carousel-item>
                <img src="../../assets/Group2.png" alt="onboarding image2">
                <h2>Manage your team</h2>
                <p>Give access to world enviroments, and analytics. Collaborate seamlesly, share insights and improve
                    your world in one place.</p>
            </el-carousel-item>
        </el-carousel>
    </el-dialog>
</template>

<script setup>
const emits = defineEmits(['close']);
const props = defineProps(['isOpen']);


</script>

<style lang="scss">
.onboarding {
    h2 {
        font-size: 20px;
        font-family: 'Montserrat-Bold';
        color: var(--el-color-primary);
        margin-top: 40px;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: #1c1c1c;
        margin: 0;
        text-align: center;
    }

    .el-dialog__body {
        padding: 40px 70px;
        word-break: normal;
    }

    .el-carousel__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .el-carousel__button {
        width: 10px;
        height: 10px;
        background-color: var(--el-color-primary);
        border-radius: 50%;
    }

    .el-carousel__arrow {
        background-color: var(--el-color-primary);
        opacity: 0.3;
    }

    .el-dialog__close {
        color: var(--el-color-primary);
    }
}
</style>