<template>
    <el-row class="teamPage">
        <el-col :span="12">
            <h1 class="pageTitle">Team</h1>
            <small class="d-flex align-center">
                <el-icon class="mr-10">
                    <Lock />
                </el-icon>Only invited members can access
            </small>
        </el-col>
        <el-col :span="12" class="buttonsGroup d-flex align-center">
            <el-input v-model="search" size="large" placeholder="Search for a team member" :prefix-icon="Search" />
            <el-button type="primary" size="large" :icon="Plus" @click="newMemeberDialog = true">Add Member</el-button>
        </el-col>
    </el-row>
    <el-row class="teamsContainer">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Name">
                <template #default="scope">
                    <div class="d-flex align-center">
                        <div class="mr-15">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </div>
                        <div>
                            <p class="ma-0">{{ scope.row.name }}</p>
                            <small>{{ scope.row.email }}</small>
                        </div>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="worlds" label="Worlds" />
            <el-table-column prop="role" label="Role" />
            <el-table-column prop="date" label="Last seen" />
            <el-table-column align="right">
                <template #default="scope">
                    <el-popconfirm confirm-button-text="Remove" cancel-button-text="Cancel" title="Are you sure?"
                        @confirm="removeMember(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" text>Remove member
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <AddNewMember :isOpen="newMemeberDialog" @close="newMemeberDialog = false"></AddNewMember>
</template>

<script setup>
import AddNewMember from '../components/modals/AddNewMember.vue';
import { Plus, Search, Lock } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore();
const search = ref('');
const newMemeberDialog = ref(false);

const tableData = computed(() => store.getters['team/getMembers'])

const removeMember = (id) => {
    store.dispatch('team/removeMember', id);
    ElMessage.success("Member is removed");
}
</script>

<style lang="scss">
.teamsContainer {
    margin-top: 50px;

    .el-table {
        background-color: #f6f6f6;
        font-size: 12px;
        font-family: 'Montserrat-SemiBold';
        color: #1c1c1c;

        tr,
        .el-table__cell {
            background-color: transparent;
        }

        small {
            font-family: 'Montserrat';
        }

        p {
            line-height: 1;
        }
    }
}
</style>