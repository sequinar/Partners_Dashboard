<template>
  <el-row class="teamPage">
    <el-col :span="12">
      <h1 class="pageTitle">
        Team
      </h1>
      <small class="d-flex align-center">
        <img class="lock" src="@/assets/icons/Lock_Icon.svg" alt="Lock_Icon">Only invited members can access
      </small>
    </el-col>
    <el-col v-if="team" :span="12" class="buttonsGroup d-flex align-center">
      <el-input v-model="search" size="large" placeholder="Search for a team member">
        <template #prefix>
          <img src="../assets/icons/Search.svg" alt="Search">
        </template>
      </el-input>
      <AddNewMember />
    </el-col>
  </el-row>
  <el-row v-if="team" class="teamsContainer">
    <el-table v-loading="loading" :data="sortedMembers" style="width: 100%">
      <el-table-column prop="name" label="Name">
        <template #default="scope">
          <div class="d-flex align-center">
            <div class="mr-15">
              <el-avatar :src="scope.row.profileImage" />
            </div>
            <div>
              <p class="ma-0">
                {{ scope.row.name || scope.row.userName }}
              </p>
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
          <el-button v-if="!scope.row.acceptedInvite" type="primary" text @click="resendInvitation(scope.row)">
            Resend Invitation
          </el-button>
          <PermissionModal v-else-if="showRemoveButton(scope.row)" @confirm="removeMember(scope.row.userId)">
            <el-button type="danger" text>
              Remove member
            </el-button>
          </PermissionModal>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
    <el-empty v-else description="You don't have any teams available yet." />
  <el-pagination v-if="members" v-model:currentPage="page" class="mt-10" background :total="members.meta.totalCount"
    :page-size="limit" layout="prev, pager, next" hide-on-single-page />
</template>

<script setup>
import useUtils from '@/composables/utils'
import useDebounce from '../composables/debounce'
import { ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const PermissionModal = defineAsyncComponent(() =>
  import('../components/modals/PermissionModal.vue')
)
const AddNewMember = defineAsyncComponent(() =>
  import('../components/modals/AddNewMember.vue')
)

const route = useRoute()
const { getTimeSince } = useUtils()
const loading = ref(true)
const store = useStore()
const search = ref('')
const limit = ref(10)
const page = ref(1)

const userID = computed(() => store.state.user.sub ? store.state.user.sub.split('|')[1] : store.state.user.user_id.split('|')[1])
const members = computed(() => store.state.team.members)
const team = computed(() => store.state.team.team)
// eslint-disable-next-line vue/no-side-effects-in-computed-properties
const sortedMembers = computed(() => members.value?.data.sort((a, b) => b.teamRole.localeCompare(a.teamRole)))

const removeMember = async (id) => {
  loading.value = true
  await store.dispatch('team/removeMember', id)
  await getMembers()
  loading.value = false
}

const showRemoveButton = (user) => {
  return userID.value !== user.uniqueId && user.teamRole !== 'Super Admin'
}

const resendInvitation = async (member) => {
  await store.dispatch('team/inviteMember', {
    ...member
  })
}

const getMembers = async (newPage, filter) => {
  if (!route.params.id) return
  return await store.dispatch('team/getMembers', {
    params: {
      limit: limit.value,
      page: newPage || page.value,
      filter: filter || ''
    },
    teamId: route.params.id
  })
}

onMounted(async () => {
  await getMembers()
  loading.value = false
})

watch(page, async (newPage) => {
  loading.value = true
  await getMembers(newPage, search.value)
  loading.value = false
})
watch(search, useDebounce(async (newVal) => {
  loading.value = true
  await getMembers(page.value, newVal)
  loading.value = false
}, 500))
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
    overflow: visible;

    * {
      overflow: visible;
    }

    .el-avatar--circle {
      overflow: hidden;
    }

    tr,
    .el-table__cell {
      background-color: transparent;
      z-index: unset;
    }

    small {
      font-family: 'Montserrat';
    }

    p {
      line-height: 1;
    }

    .el-table__inner-wrapper::before {
      z-index: 0;
    }
  }
}
</style>
