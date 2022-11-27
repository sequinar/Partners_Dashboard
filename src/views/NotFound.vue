<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <img
    style="position: absolute; left: 48px; top: 26px; cursor: pointer;"
    src="@/assets/icons/Sequin.world.svg"
    alt="Sequin.world"
    @click="goHome"
  >
  <div
    style="display: flex; height: 100vh; width: 100%; display: flex; align-items: center;
    justify-content: center; flex-direction: column; background-color: #282828;"
  >
    <img
      style="height: 310px; width: 452px;"
      src="../assets/astronautimage.png"
      alt=""
    >
    <div class="title">
      No page here, just empty space.
    </div>
    <div class="desc">
      <span style="font-family: 'Montserrat-Bold';">404</span> - The page you are looking for does not exist.<br>
      Try to search again or use the "Back to Home" button below.
    </div>
    <el-button
      type="primary"
      dark
      @click="goHome"
    >
      Back to Home
    </el-button>
  </div>
</template>

<script setup>
import router from '../router'

const goHome = () => {
  router.push('/')
}

</script>

<style scoped>
.title {
  height: 24px;
  width: 565px;
  color: #FFF;
  font-family: 'Montserrat-SemiBold';
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  text-align: center;
  margin-top: 83px;
}

.desc {
  height: 48px;
  width: 565px;
  color: #FFF;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0.13px;
  line-height: 20px;
  text-align: center;
  margin-top: 14px;
}
</style>
