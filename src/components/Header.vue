<template>
    <el-row class="header">
        <el-col :span="12">
            <el-input v-model="search" size="large" placeholder="Search Worlds" :prefix-icon="Search" />
        </el-col>
        <el-col :span="12" class="alignment-container">
            <el-button class="bell" text size="large" circle>
                <bell-outline />
            </el-button>
            <el-dropdown trigger="click" popper-class="headerDropdown" placement="bottom-end">
                <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="drawer = true">
                            <cog-outline /> Account Settings
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <logout />Log Out
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
    <el-drawer v-model="drawer" size="400px" :with-header="false" destroy-on-close>
        <account-settings @close="drawer = false" />
    </el-drawer>
</template>

<script setup>
import AccountSettings from './AccountSettings.vue';
import { CogOutline, Logout, BellOutline } from 'mdue';
import { Search, ArrowDown } from '@element-plus/icons-vue';
import { ref } from "vue";
const search = ref("");
const drawer = ref(false);

</script>

<style scoped lang="scss">
.header {
    .bell {
        font-size: 22px;
    }

    .alignment-container {
        display: flex;
        justify-content: flex-end;
    }

    .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}
</style>