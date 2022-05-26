<template>
    <el-card class="worldItem" :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
        <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
                <time class="time">12</time>
                <el-button text class="button">Operating</el-button>
            </div>
        </div>
    </el-card>
</template>
<script setup>
</script>

<style scoped lang="scss">
.worldItem {
    //min-width: 300px;
    // max-height: 380px;
    // flex: 1 300px;

    img {
        width: 100%;
        height: auto;
    }
}
</style>