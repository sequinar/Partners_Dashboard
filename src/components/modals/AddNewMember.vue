<template>
    <el-dialog custom-class="addMember" v-model="isOpen" title="Add new member" width="30%">
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

        <template #footer>
            <el-row class="addMember--buttons" :gutter="25">
                <el-col :span="12">
                    <el-button size="large" type="primary" @click="submitMemberForm">Send Invite</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button size="large" @click="emit('close')">Cancel</el-button>
                </el-col>
            </el-row>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore();
const props = defineProps(['isOpen']);
const emit = defineEmits(['close']);
const memberForm = ref();
const member = reactive({
    name: '',
    last_name: '',
    email: '',
})

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
            store.dispatch('team/addMember', {
                ...member,
                id: Date.now()
            })
            emit('close');
            ElMessage.success("Member has been added");
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss">
.addMember {
    &--buttons {
        button {
            width: 100%;
        }
    }

    .el-dialog__header {
        border-bottom: 1px solid rgba($color: #858585, $alpha: 0.4);
        margin-right: 0;
        padding-right: 35px;

        .el-dialog__title {
            font-size: 18px;
            font-family: 'Montserrat-SemiBold';
            color: #1c1c1c;
        }
    }

    .el-form-item__label {
        font-size: 12px;
        color: #1c1c1c;
        font-family: 'Montserrat-SemiBold';
    }
}
</style>