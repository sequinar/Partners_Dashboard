<template>
    <div class="bannerCleanUp">
        <el-row :gutter="15">
            <el-col :span="columns[0]">
                <el-input v-model="props.banner.banner_url" disabled>
                    <template #append>
                        <el-tooltip content="Copy url" placement="top">
                            <el-button text :icon="DocumentCopy" @click="copyLink" />
                        </el-tooltip>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="columns[1]">
                <el-button class="full-width" type="primary" size="large" @click="clearBanner">Clear</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { DocumentCopy } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

const props = defineProps({
    banner: {
        type: Object,
        default: {
            banner_url: ''
        }
    },
    columns: {
        type: Array,
        default: [18, 6]
    }
});

const clearBanner = () => {
    store.dispatch("worlds/deleteBanner", {
        id: route.params.id,
        bannerId: props.banner.banner_id
    })
}

const copyLink = () => {
    navigator.clipboard.writeText(props.url);
    ElMessage.success("Copied")
}
</script>

<style lang="scss">
.bannerCleanUp {
    margin-top: 10px;
    margin-bottom: 10px;

    .el-input {
        margin-bottom: 10px;
    }

    .el-input.is-disabled .el-input__wrapper,
    .el-input .el-input-group__append {
        background-color: #fff !important;
    }
}
</style>