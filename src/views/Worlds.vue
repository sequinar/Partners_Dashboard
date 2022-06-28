<template>
    <el-row>
        <el-col :span="12">
            <h1 class="pageTitle">All Worlds</h1>
        </el-col>
        <el-col :span="12" class="buttonsGroup">
            <!-- <el-button type="primary" size="large" :icon="Plus">New World</el-button> -->
            <el-button-group>
                <el-button size="large" disabled :icon="ArrowLeft"></el-button>
                <el-button size="large" :icon="ArrowRight"></el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <el-row class="worldsContainer">
        <World v-for="o in 6" :key="o" />
    </el-row>
</template>

<script setup>
import { Plus, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import World from '../components/World.vue';
</script>

<style scoped lang="scss">
.buttonsGroup {
    display: flex;
    justify-content: flex-end;

    &>button:first-child {
        margin-right: 30px;
    }
}

.worldsContainer {
    padding-top: 40px;
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>