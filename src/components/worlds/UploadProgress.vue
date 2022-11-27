<template>
    <div v-if="showProgress" id="upload-progress">
        <h4>Please wait. We creating your world.</h4>
        <el-progress type="circle" :percentage="props.percentage" color="#613C97"/>
    </div>
</template>
<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    required: true
  },
  showProgress: {
    type: Boolean,
    required: true
  }
})
</script>
<style lang="scss">
#upload-progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    z-index: 99;
}
</style>
