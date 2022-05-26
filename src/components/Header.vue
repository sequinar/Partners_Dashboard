<template>
    <el-row>
        <el-col :span="12">
            <el-input v-model="search" class="w-50 m-2" size="large" placeholder="Search Worlds"
                :prefix-icon="Search" />
        </el-col>
        <el-col :span="12" class="alignment-container">
            <el-button class="bell" text size="large" :icon="Bell" circle />
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="Setting">Settings</el-dropdown-item>
                        <el-dropdown-item :icon="User">Profile</el-dropdown-item>
                        <el-dropdown-item :icon="User">LogOut</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script setup>
import { Search, Bell, ArrowDown, Setting, User } from '@element-plus/icons-vue'
import { ref } from "vue"
const search = ref("");
</script>

<style>
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
}
</style>