<template>
    <div class="switcher">
        <div>
            <label>{{ label }}</label>
            <small>{{ description }}</small>
        </div>
        <el-switch :model-value="props.modelValue" size="large" @change="updateValue" />
    </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String
  },
  description: {
    type: String
  }
})
const emits = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  emits('update:modelValue', value)
}
</script>
<style lang="scss">
.switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;

    label {
        font-size: 12px;
        font-family: 'Montserrat-SemiBold';
        cursor: pointer;
    }

    small {
        font-size: 12px;
        margin: 5px 0;
        display: block;
        color: #1c1c1c;
    }

    .el-switch__core {
        height: 14px;
        width: 30px;
    }

    .el-switch__action {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        top: -5px;
        left: -5px;
    }

    .el-switch--large.is-checked .el-switch__core .el-switch__action {
        margin-left: calc(-1px - 12px);
    }
}
</style>
