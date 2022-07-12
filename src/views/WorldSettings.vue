<template>
  <div
    v-loading="loading"
    class="worldSettings"
  >
    <div
      v-if="world"
      class="worldSettings__container"
    >
      <h1>World Settings</h1>
      <p>Edit content available inside the world as banner ads, video uploads, and streming.</p>
      <div class="switcher mt-30">
        <label @click="disableChat = !disableChat">Enable or disable chat in world?</label>
        <el-switch
          v-model="world.chat_status"
          size="large"
          @change="switchChat"
        />
      </div>
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
      >
        <el-tab-pane
          label="World Banners"
          name="first"
        >
          <WorldBanners :world="world" />
        </el-tab-pane>
        <el-tab-pane
          label="Video Streaming"
          name="second"
        >
          <VideoStreaming :world="world" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import WorldBanners from '../components/WorldSettings/TabWorldBanners.vue';
import VideoStreaming from '../components/WorldSettings/TabVideoStreaming.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const activeName = ref('first');
const world = computed(() => store.state.worlds.currentWorld)

let loading = ref(true);

const switchChat = (status) => {
    store.dispatch('worlds/updateChatStatus', {
        id: route.params.id,
        status: status
    })
}

onMounted(async () => {
    await store.dispatch('worlds/getCurrentWorld', route.params.id);
    loading.value = false;
})
</script>

<style lang="scss">
.worldSettings {
    display: flex;
    justify-content: center;
    color: #1c1c1c;

    &__container {
        width: 600px;

        h1 {
            font-size: 30px;
            font-family: 'Montserrat-SemiBold';
            margin: 0;
        }

        p {
            font-size: 14px;
            font-family: 'Montserrat-Light';
            margin-top: 5px;
        }

        .switcher {
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
                font-size: 14px;
                font-family: 'Montserrat-Bold';
                cursor: pointer;
            }
        }
    }

    .el-input {
        height: 40px;

        .el-input__wrapper,
        .el-input-group__append {
            background-color: #fff;
            box-shadow: none;
        }

        &.is-disabled .el-input__wrapper,
        .el-input-group__append {
            background-color: #eee;
            box-shadow: none;
        }

        .el-input-group__append button {
            position: relative;

            &:hover,
            &:focus {
                background-color: transparent;
            }

            &:before {
                content: '';
                position: absolute;
                width: 1px;
                height: 16px;
                top: 8px;
                left: 0;
                background-color: #808080;
                overflow: visible;
            }
        }
    }
}
</style>

<style lang="scss">
.worldSettings {
    .el-tabs__item {
        font-size: 14px;
        font-family: 'Montserrat-Bold';
    }

    .el-tabs__item {
        height: unset;
        line-height: 1.2;
        padding-top: 0;
        padding-bottom: 0;
        margin: 10px 0;
    }

    #tab-first {
        border-right: 3px solid var(--el-color-primary);
    }
}
</style>