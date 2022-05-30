<template>
    <div class="accountSetting">
        <div class="accountSetting--header d-flex align-center justify-between">
            <UserAvatar />
            <el-button text large class="collapseButton flip" @click="emit('close')">
                <img src="../assets/CollapseMenu.png" alt="collapseIcon">
            </el-button>
        </div>
        <el-form ref="nameForm" label-position="top" :model="settings" @submit.prevent :rules="rules">
            <el-form-item label="Name" prop="name">
                <el-input v-model="settings.name" size="large" />
            </el-form-item>
            <el-form-item label="User name" prop="user_name">
                <el-input v-model="settings.user_name" size="large" />
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="settings.email" placeholder="Emailexample@email.com" size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large" @click="submitNameForm">Save</el-button>
        </el-form>
        <el-form ref="passForm" label-position="top" :model="passwordUpdate" @submit.prevent :rules="rulesPass">
            <h3>Update Password</h3>
            <el-form-item class="ma-0" label="Current password" prop="currentPass">
                <el-input type="password" v-model="passwordUpdate.currentPass" autocomplete="off" size="large" />
            </el-form-item>
            <a href="#">Forgot password?</a>
            <el-form-item label="New password" prop="pass">
                <el-input type="password" v-model="passwordUpdate.pass" autocomplete="off" size="large" />
            </el-form-item>
            <el-form-item label="Confirm New password" prop="checkPass">
                <el-input type="password" v-model="passwordUpdate.checkPass" autocomplete="off" size="large" />
            </el-form-item>
            <ul class="rules">
                <li>Non-empty password required.</li>
                <li>Must have at least 8 characters in length.</li>
                <li>Lower case (a-z), upper case (A-Z) and numbers (0-9).</li>
            </ul>
            <el-button class="full-width" type="primary" size="large" @click="submitPassForm">Save</el-button>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import UserAvatar from './UserAvatar.vue';

const emit = defineEmits(['close']);
const nameForm = ref();
const passForm = ref();
const settings = reactive({
    name: '',
    user_name: '',
    email: '',
})
const passwordUpdate = reactive({
    currentPass: '',
    pass: '',
    checkPass: '',
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (passwordUpdate.pass !== '') {
            if (!passForm.value) return
            passForm.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== passwordUpdate.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

//Need to copy same rules because of Element UI bug: prop and v-model should be the same
const rules = reactive({
    name: [
        { required: true, message: 'Please input your name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' },
    ],
    user_name: [
        { required: true, message: 'Please input your name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' },
    ],
    email: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
    ],
})

const rulesPass = reactive({
    currentPass: [{ required: true, message: 'Please input the password', trigger: 'blur' },],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitNameForm = async () => {
    await nameForm.value.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
const submitPassForm = async () => {
    await passForm.value.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style scoped lang="scss">
.accountSetting {
    padding: 20px 10px;

    &--header {
        margin-bottom: 30px;
    }

    .collapseButton {

        &:hover,
        &:focus {
            background-color: #282828;
        }
    }

    a {
        margin-bottom: 10px;
        display: inline-block;
    }
}

.flip {
    transform: rotateY(180deg);
}

.rules {
    font-size: 12px;
    padding-left: 15px;
}
</style>