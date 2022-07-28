<template>
  <div v-if="props.showInstaractions">
    <div
      v-if="isWindows"
      class="loadingInstructions"
    >
      <div class="loadingInstructions__header">
        <h3>
          Thanks for Downloading
        </h3>
        <img
          src="@/assets/exiticon.svg"
          alt="close icon"
          @click="emits('close')"
        >
      </div>
      <div class="loadingInstructions__body">
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            1
          </h4>
          <div class="modalText">
            Click <b>{{ props.world.worldname }}.msi</b> to run Sequin.World installer, Which just
            downloaded via your web browser.
          </div>
          <img
            src="@/assets/SequinWorldInstaller.png"
            style="width:200px;margin:auto;margin-top:50px"
          >
        </div>
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            2
          </h4>
          <div class="modalText">
            Click <b>Yes</b> when prompted by your computer to begin the installation process.
          </div>
          <img
            src="@/assets/SequinWorldInstallerModal.png"
            style="width:200px;margin:auto;margin-top:40px"
          >
        </div>
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            3
          </h4>
          <div class="modalText">
            After installation, click <b>Start</b> below to enter your world.
          </div>
          <el-button
            type="primary"
            size="large"
            @click="emits('openWorld')"
          >
            Start
          </el-button>
        </div>
      </div>
      <p class="loadingInstructions__footer">
        The Sequin.World installer should download shortly. If it doesn't,
        start
        the download now.
      </p>
    </div>
    <div
      v-else
      class="loadingInstructions"
    >
      <div class="loadingInstructions__header">
        <h3>
          Thanks for Downloading
        </h3>
        <img
          src="@/assets/exiticon.svg"
          alt="close icon"
          @click="emits('close')"
        >
      </div>
      <div class="loadingInstructions__body">
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            1
          </h4>
          <div class="modalText">
            Click <b>{{ props.world.worldname }}.dmg</b> to run Sequin.World installer, Which just
            downlaoded
            via your web browser.
          </div>
          <img
            src="@/assets/Camelot_DMG_Image.png"
            style="width:200px;margin:auto;margin-top:50px"
          >
        </div>
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            2
          </h4>
          <div class="modalText">
            To install <b>drag</b> world's icon to the application folder
          </div>
          <img
            src="@/assets/Camelot_mac_Installer.png"
            style="width:200px;margin:auto;margin-top:40px"
          >
        </div>
        <div class="loadingInstructions__body--item">
          <h4 class="step">
            3
          </h4>
          <div class="modalText">
            After installation, <b>look for {{ props.world.worldname }}</b> in your application folder to
            enter the world.
          </div>
          <el-button
            type="primary"
            size="large"
            @click="emits('openWorld')"
          >
            Start
          </el-button>
        </div>
      </div>
      <p class="loadingInstructions__footer">
        The Sequin.World installer should download shortly. If it doesn't,
        start
        the download now.
      </p>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['close', 'openWorld'])
const isWindows = (window.navigator.userAgent.indexOf('Windows') !== -1)
const props = defineProps({
  showInstaractions: {
    type: Boolean,
    default: false
  },
  world: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.loadingInstructions {
    width: 800px;
    background: white;
    border-radius: 5px;
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    display: flex;
    flex-direction: column;

    .modalText {
        line-height: 1.4;
    }

    &__header {
        font-family: Montserrat-Bold;
        padding: 15px 30px;
        color: #7749b7;
        border-bottom: 1px solid #7749b7;

        h3 {
            margin: 0;
            font-size: 18px;
        }

        img {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
            width: 15px;
            height: auto;
        }
    }

    &__body {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 30px;
        padding-bottom: 0;
        gap: 40px;

        &--item {
            display: flex;
            flex-direction: column;
            flex: 1;

            .step {
                font-size: 26px;
                font-weight: bold;
                margin: 10px 0;
                color: #7749b7;
                font-family: 'Montserrat-Bold';
            }

            .el-button {
                margin-top: 80px;
            }
        }
    }

    &__footer {
        margin-left: 30px;
        margin-bottom: 30px;
        font-size: 14px;
    }
}
</style>
