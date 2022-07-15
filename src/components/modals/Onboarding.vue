<template>
  <div class="onboardingDialog">
    <div
      class="onboardingDialog--container"
      :class="leftGap"
      :style="{ top: top + 10 + 'px' }"
    >
      <el-button
        type="primary"
        text
        :icon="Close"
        @click="closeOnboarding"
      />
      <el-carousel
        :autoplay="false"
        :loop="false"
        trigger="click"
        arrow="always"
        height="450px"
        @change="onChange"
      >
        <el-carousel-item>
          <img
            src="../../assets/Group.png"
            alt="onboarding image1"
          >
          <h2>Manage and preview your World</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore.
          </p>
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="../../assets/Group2.png"
            alt="onboarding image2"
          >
          <h2>Manage your team</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore.
          </p>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { Close } from '@element-plus/icons-vue'
import { computed } from 'vue';

const emits = defineEmits(['close', 'change']);
const props = defineProps({
  isOpen: {
    type: Boolean
  },
  isCollapsed: {
    type: Boolean
  },
  top: {
    type: Number,
    default: () => 0
  }
})
const leftGap = computed(() => `${props.isCollapsed ? 'left-90' : 'left-310'}`);

const onChange = (index) => {
    emits('change', index);
}

const closeOnboarding = () => {
  emits('close');
  onChange(0);
}

</script>

<style lang="scss">
.onboardingDialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
    z-index: 99;
    color: #000000;

    &--container {
        position: absolute;
        width: 460px;
        background-color: #fff;
        border-radius: 5px;
        padding: 40px 70px;
        word-break: normal;

        &::before {
            position: absolute;
            content: '';
            left: -6px;
            top: 15px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 10px 5px 0;
            border-color: transparent #ffffff transparent transparent;
        }

        &.left-90 {
            left: 90px;
        }

        &.left-310 {
            left: 310px;
        }

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
            margin-bottom: 20px;
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
            transition: all 0.3s ease;

            &:hover {
                opacity: 1;
            }
        }
    }

    .el-button {
        position: absolute;
        top: 15px;
        right: 10px;
        font-size: 22px;
    }
}
</style>