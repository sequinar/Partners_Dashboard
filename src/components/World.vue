<template>
    <el-card class="worldItem" :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
        <el-dropdown class="dropdown" placement="bottom-end" trigger="click">
            <span class="el-dropdown-link">
                <el-button circle>
                    <DotsHorizontal />
                </el-button>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Analytics</el-dropdown-item>
                    <el-dropdown-item>Settings</el-dropdown-item>
                    <el-dropdown-item>Share</el-dropdown-item>
                    <el-dropdown-item>Unpublish</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <div class="worldItem--footer">
            <h3>Club Camelot</h3>
            <div class="statistics">
                <span class="statistics--item">
                    <span class="status" :class="{ online: isOnline }"></span>
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <EyeOutline />
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <ChatOutline />
                    <small>0045</small>
                </span>
                <span class="statistics--item">
                    <HeartOutline />
                    <small>0045</small>
                </span>
                <ArrowUp class="green" />
            </div>
        </div>
    </el-card>
</template>
<script setup>
import { HeartOutline, ChatOutline, EyeOutline, DotsHorizontal, ArrowUp } from 'mdue';
import { ref } from 'vue'
const isOnline = ref(true);
</script>

<style scoped lang="scss">
.worldItem {
    position: relative;

    img {
        width: 100%;
        height: auto;
    }

    .dropdown {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    &--footer {
        padding: 10px 15px 15px 15px;

        h3 {
            margin: 0;
            font-size: 18px;
            font-family: 'Montserrat-SemiBold';
        }
    }

    .statistics {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        color: #d8d8d8;

        &--item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
    }

    .status {
        width: 12px;
        height: 12px;
        display: inline-block;
        background-color: var(--el-color-error);
        border-radius: 10px;
    }

    .online {
        background-color: var(--el-color-success);
    }

    .green {
        color: var(--el-color-success);
    }
}
</style>