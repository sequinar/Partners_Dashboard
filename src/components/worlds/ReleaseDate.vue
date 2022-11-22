<template>
    <div id="release-date">
        <div class="mt-10 d-flex justify-between align-center">
            <h3>Released on:</h3>
            <el-button type="primary" size="large" link @click="editDate">Edit</el-button>
        </div>
        <p class="date ma-0">{{ realeaseDate }}</p>
        <el-date-picker ref="datePicker" v-model="date" type="date" placeholder="Pick a day" />
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const emits = defineEmits(['changeDate'])
const props = defineProps({
  initDate: {
    type: String
  }
})
const datePicker = ref(null)
const date = computed({
  get () {
    return props.initDate
  },
  set (date) {
    emits('changeDate', date.toLocaleDateString('en-CA'))
  }
})
const realeaseDate = computed(() => new Date(props.initDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))

const editDate = () => {
  datePicker.value.focus()
}
</script>
<style lang="scss">
#release-date {
    .date {
        font-size: 14px !important;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .el-date-editor {
        height: 0 !important;
        overflow: hidden;
    }
}
</style>
