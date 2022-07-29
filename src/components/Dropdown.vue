<template>
  <div class="dropdown">
    <span>
      <el-button
        circle
        size="small"
        @click.stop="showDropdown = !showDropdown"
      >
        <img
          src="@/assets/icons/Sub_menu_Dots.svg"
          alt="Sub_menu_Dots"
        >
      </el-button>
    </span>
    <ul
      v-if="showDropdown"
      class="dropdown__list"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)

window.addEventListener('click', () => {
  if (showDropdown.value) showDropdown.value = false
})
</script>

<style lang="scss">
.dropdown {
    &__list {
        padding: 0;
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #fff;
        border-radius: 3px;
        margin: 0;

        li {
            font-size: 14px;
            font-family: 'Montserrat-SemiBold';
            color: var(--el-color-primary);
            padding: 10px 20px;
            list-style: none;
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
                background-color: rgba(96, 58, 150, 0.1);
            }
        }
    }
}
</style>
