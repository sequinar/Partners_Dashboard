<template>
    <div class="custom-select">
        <label v-if="props.label">{{ label }}<span v-if="required" class="red">*</span></label>
        <small v-if="description">{{ description }}</small>
        <el-select :model-value="modelValue" :placeholder="placeholder" :multiple="multiple"
            :reserve-keyword="false" default-first-option @change="updateValue">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
    </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: [Array, String],
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String
  },
  required: {
    type: Boolean
  },
  placeholder: {
    type: String
  },
  description: {
    type: String
  },
  multiple: {
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  emits('update:modelValue', value)
}
</script>
<style lang="scss">
.custom-select {
    margin-top: 24px;

    .el-input__wrapper {
        background-color: #fff;
        padding: 0;
        padding: 5px 15px;
        margin-top: 5px;
    }

    .el-select {
        display: block;
    }

    .el-textarea__inner {
        box-shadow: none;
    }

    label {
        font-size: 12px;
        font-family: 'Montserrat-SemiBold';
        display: block;
    }

    small {
        font-size: 12px;
        margin: 5px 0;
        display: block;
        color: #1c1c1c;
    }

    h3 {
        margin: 0;
        font-size: 16px;
        font-family: 'Montserrat-Bold';
    }
}
</style>
