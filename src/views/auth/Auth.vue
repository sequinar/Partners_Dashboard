<template>
    <div class="loginPage">
        <div class="body d-flex justify-center align-center">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
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
        height: 100%;
    }

    .authContainer {
        width: 400px;
        background-color: #fff;
        border-radius: 10px;
        text-align: center;
        padding: 30px 35px;
        color: #1c1c1c;

        h1 {
            font-size: 24px;
            font-family: 'Montserrat-Bold';
            color: var(--el-color-primary);
            margin: 0;
        }

        p {
            font-size: 14px;
            font-family: 'Montserrat-Light';
            margin-top: 0;
            margin-bottom: 25px;
        }

        a {
            font-size: 12px;
            font-family: 'Montserrat-Bold';
        }

        .el-input__wrapper {
            background-color: transparent;
            border: 1px solid #d9d9d9;
            height: 50px;
        }
    }
}
</style>
