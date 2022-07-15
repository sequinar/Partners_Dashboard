<template>
  <div class="bannerCleanUp">
    <el-row :gutter="15">
      <el-col :span="columns[0]">
        <el-input
          v-model="url"
          disabled
        >
          <template #append>
            <el-tooltip
              content="Copy url"
              placement="top"
            >
              <el-button
                text
                :icon="DocumentCopy"
                @click="copyLink"
              />
            </el-tooltip>
          </template>
        </el-input>
      </el-col>
      <el-col :span="columns[1]">
        <el-button
          class="full-width"
          type="primary"
          size="large"
          :disabled="url === ''"
          @click="clearBanner"
        >
          Clear
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { DocumentCopy } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const store = useStore();
const emits = defineEmits(['delete']);

const url = computed(() => props.banner ? props.banner.banner_url : '');

const props = defineProps({
    banner: {
        type: Object,
        default: () => {
          ''
        }
    },
    columns: {
        type: Array,
        default: () => [18, 6]
    }
});

const clearBanner = () => {
    emits('delete', props.banner);
    store.dispatch("worlds/deleteBanner", {
        id: route.params.id,
        bannerId: props.banner.banner_id
    })
}

const copyLink = () => {
    navigator.clipboard.writeText(props.banner.banner_url);
    ElMessage.success("Copied")
}
</script>

<style lang="scss">
.bannerCleanUp {
    margin-top: 10px;
    margin-bottom: 10px;

    .el-input.is-disabled .el-input__wrapper,
    .el-input .el-input-group__append {
        background-color: #fff !important;
    }
}
</style>