<template>
    <div class="signUp authContainer">
        <h1>Create new password</h1>
        <p>Your new password must be different from previous used passwords.</p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="pass">
                <el-input type="password" placeholder="Password" v-model="data.pass" autocomplete="off" size="large" />
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" placeholder="Confirm password" v-model="data.checkPass" autocomplete="off"
                    size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large">Update Password</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
const formRef = ref(null);
const data = reactive({
    pass: '',
    checkPass: '',
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (data.pass !== '') {
            if (!formRef.value) return
            formRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== data.pass) {
        callback(new Error("Passwords are not matching*"))
    } else {
        callback()
    }
}

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})
</script>

<style scoped lang="scss">
</style>