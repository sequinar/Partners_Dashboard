<template>
    <div class="addMember">
        <el-button type="primary" size="large" :icon="Plus" @click="isOpen = true">Add Member</el-button>
        <div class="addMember__modal" v-if="isOpen">
            <h4 class="title">Add new member</h4>
            <div class="addMember__modal--body">
                <el-form ref="memberForm" label-position="top" :model="member" @submit.prevent :rules="rules">
                    <el-row :gutter="25">
                        <el-col :span="12">
                            <el-form-item label="Name" prop="name">
                                <el-input v-model="member.name" size="large" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Last Name" prop="last_name">
                                <el-input v-model="member.last_name" size="large" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="Email" prop="email">
                                <el-input v-model="member.email" placeholder="Emailexample@email.com" size="large" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <el-row class="addMember--buttons" :gutter="25">
                    <el-col :span="12">
                        <el-button size="large" type="primary" @click="submitMemberForm">Send Invite</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button size="large" @click="isOpen = false">Cancel</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue';

const store = useStore();
const memberForm = ref();
const member = reactive({
    name: '',
    last_name: '',
    email: '',
})

let isOpen = ref(false);

//Need to copy same rules because of Element UI bug: prop and v-model should be the same
const rules = reactive({
    name: [
        { required: true, message: 'Please input member name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' },
    ],
    last_name: [
        { required: true, message: 'Please input member last name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' },
    ],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
    ],
})

const submitMemberForm = async () => {
    await memberForm.value.validate((valid, fields) => {
        if (valid) {
            store.dispatch('team/inviteMember', {
                ...member,
            })
            emit('close');
            ElMessage.success("Member has been invited");
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss">
.addMember {
    position: relative;

    &__modal {
        position: absolute;
        width: 430px;
        top: 0;
        right: 0;
        background-color: #fff;
        box-shadow: 0 0 10px 0 rgba(28, 28, 28, 0.5);
        z-index: 999;
        border-radius: 3px;

        &--body {
            padding: 20px;
            padding-bottom: 35px;

            .el-input__wrapper {
                margin-right: 0 !important;
                background-color: #f6f6f6 !important;
            }
        }
    }

    &--buttons {
        margin-top: 10px;

        button {
            width: 100%;
        }
    }

    .title {
        border-bottom: 1px solid rgba($color: #858585, $alpha: 0.4);
        margin-right: 0;
        padding-right: 35px;
        font-size: 18px;
        font-family: 'Montserrat-SemiBold';
        color: #1c1c1c;
        margin: 0;
        padding: 16px 18px;

    }

    .el-form-item__label {
        font-size: 12px;
        color: #1c1c1c;
        font-family: 'Montserrat-SemiBold';
    }
}
</style>