<template>
  <el-dialog
    class="worldLoadingModal"
    :model-value="props.showModal"
    width="500px"
    top="30vh"
    @closed="emits('close')"
  >
    <div class="modalContainer">
      <img
        src="@/assets/icons/Sequin.world.svg"
        alt="sequin logo"
      >
      <h2>Get Ready!</h2>
      <p>{{ props.world.worldname || props.world.worldName }} is now loading...</p>
      <a
        href="#"
        @click="downloadWorld()"
      >Download window Example</a>
    </div>
  </el-dialog>
  <LoadingInstructions
    :show-instaractions="showInstaractions"
    :world="props.world"
    @close="showInstaractions = false"
  />
</template>

<script setup>
import LoadingInstructions from './LoadingInstructions.vue'
import { ref, onMounted } from 'vue'

const props = defineProps({
  showModal: {
    type: Boolean
  },
  world: {
    type: Object,
    default: () => {}
  }
})
const isWindows = (window.navigator.userAgent.indexOf('Windows') !== -1)
const emits = defineEmits(['close'])
const showInstaractions = ref(false)

const downloadWorld = () => {
  if (props.world.template_name === 'Camelot') {
    window.open(isWindows ? process.env.CAMELOT_UEAPP_DOWNLOAD_LINK_WINDOWS : process.env.CAMELOT_UEAPP_DOWNLOAD_LINK_MAC, '_self')
  } else {
    window.open(isWindows ? process.env.UEAPP_DOWNLOAD_LINK_WINDOWS : process.env.UEAPP_DOWNLOAD_LINK_MAC, '_self')
  }
  showInstaractions.value = true
  emits('close')
}

onMounted(() => {
  setTimeout(() => emits('close'), 10000)
})
</script>

<style lang="scss">
.worldLoadingModal {

    .el-dialog__headerbtn,
    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        height: 300px;
        padding: 0;
    }

    .modalContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            height: 75px;
            width: 75px;
            margin-top: 70px;
        }

        h2 {
            font-size: 20px;
            color: var(--el-color-primary);
            font-family: 'Montserrat-Bold';
            margin-top: 34px;
            margin-bottom: 0;
        }

        p {
            margin: 0;
        }

        a {
            font-size: 14px;
            color: #9B3D97;
            margin-top: 15px;
            font-family: 'Montserrat';
        }
    }
}
</style>
