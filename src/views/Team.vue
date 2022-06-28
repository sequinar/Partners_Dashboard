<template>
    <el-row class="teamPage">
        <el-col :span="12">
            <h1 class="pageTitle">Team</h1>
            <small class="d-flex align-center">
                <img class="lock" src="@/assets/icons/Lock_Icon.svg" alt="Lock_Icon" />Only invited members can access
            </small>
        </el-col>
        <el-col :span="12" class="buttonsGroup d-flex align-center">
            <el-input v-model="search" size="large" placeholder="Search for a team member">
                <template #prefix>
                    <img src="../assets/icons/Search.svg" alt="Search" />
                </template>
            </el-input>
            <el-button type="primary" size="large" :icon="Plus" @click="newMemeberDialog = true">Add Member</el-button>
        </el-col>
    </el-row>
    <el-row class="teamsContainer">
        <el-table v-loading="loading" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Name">
                <template #default="scope">
                    <div class="d-flex align-center">
                        <div class="mr-15">
                            <el-avatar :src="scope.row.profileImage" />
                        </div>
                        <div>
                            <p class="ma-0">{{ scope.row.name }}</p>
                            <small>{{ scope.row.email }}</small>
                        </div>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="worlds" label="Worlds" />
            <el-table-column prop="teamRole" label="Role" />
            <el-table-column prop="date" label="Last seen">
                <template #default="scope">
                    <span>{{ getTimeSince(new Date(scope.row.lastLogin).getTime()) }} ago</span>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-popconfirm v-if="userID !== scope.row.uniqueId" confirm-button-text="Remove"
                        cancel-button-text="Cancel" title="Are you sure?" @confirm="removeMember(scope.row.user_id)">
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
import { Plus } from '@element-plus/icons-vue';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import useUtils from '@/composables/utils.js'

const { getTimeSince } = useUtils();
const loading = ref(true)
const store = useStore();
const search = ref('');
const newMemeberDialog = ref(false);

const userID = computed(() => store.state.user.sub.split('|')[1]);
const tableData = computed(() => store.state.team.members);

const removeMember = (id) => {
    store.dispatch('team/removeMember', id);
}

onMounted(async () => {
    await store.dispatch('team/getTeam');
    await store.dispatch('team/getMembers');
    loading.value = false;
})
</script>

<style lang="scss">
.teamPage {
    .lock {
        margin-right: 10px;
    }
}

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