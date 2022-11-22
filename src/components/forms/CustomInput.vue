<template>
    <div class="custom-input">
        <label v-if="props.label">{{ label }}<span v-if="required" class="red">*</span></label>
        <small v-if="description">{{ description }}</small>
        <el-input :modelValue="modelValue" :placeholder="placeholder" :maxlength="maxLength" :show-word-limit="!!maxLength"
            @input="updateValue"  :type="type" :rows='rows'/>
    </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String
  },
  label: {
    type: String
  },
  required: {
    type: Boolean
  },
  maxLength: {
    type: [Number, String]
  },
  placeholder: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String,
    default: () => 'text'
  },
  rows: {
    type: [Number, String]
  }
})
const emits = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  emits('update:modelValue', value)
}
</script>
<style lang="scss">
.custom-input {
  margin-top: 24px;

    .el-input__wrapper {
        background-color: #fff;
        padding: 0;
        padding: 5px 15px;
        margin-top: 5px;
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
