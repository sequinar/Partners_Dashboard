<template>
  <div
    class="permissionModal"
    @click="slotClick"
  >
    <slot />

    <div
      v-if="showModal"
      class="permissionModal__body"
    >
      <h4>Are you sure?</h4>
      <p>Once you remove a user, the user wont be able to access any information from the account</p>
      <div class="actions">
        <el-button
          type="primary"
          @click.stop="onRemove"
        >
          Remove
        </el-button>
        <el-button
          type="primary"
          plain
          @click.stop="onCancel"
        >
          Cancel
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['confirm'])
let showModal = ref(false);

const onRemove = () => {
    emits('confirm');
    showModal.value = false;
}

const onCancel = () => {
    showModal.value = false;
}

const slotClick = () => {
    showModal.value = true;
}
</script>

<style lang="scss">
.permissionModal {

    &__body {
        position: absolute;
        top: 0;
        right: 0;
        width: 355px;
        background-color: #fff;
        z-index: 999;
        border-radius: 3px;
        box-shadow: 0 0 10px 0 rgba(28, 28, 28, 0.12);
        padding: 20px;
        font-size: 12px;
        text-align: left;

        h4 {
            margin: 0;
            font-family: 'Montserrat-SemiBold';
            line-height: 15px;
        }

        p {
            margin-top: 0;
            font-family: 'Montserrat-Light';
        }

        .actions {
            display: flex;
            gap: 40px;

            button {
                flex: 1;
                height: 40px;
                font-size: 14px;
                margin: 0;
            }
        }
    }
}
</style>