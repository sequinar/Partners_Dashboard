<template>
    <div class="signUp authContainer">
        <h1>Update password</h1>
        <p>Enter the email associated with your account and we'll send an email with instructions to update your
            password.</p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="email">
                <el-input v-model="data.email" placeholder="Email address" size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large">Update Password</el-button>
        </el-form>
        <div class="d-flex align-center mt-10">
            <router-link class="mr-15" to="/auth/login">Back</router-link>
            <router-link class="wrongEmail" to="/auth">Resend Email</router-link>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
const formRef = ref(null);
const data = reactive({
    email: '',
})

const rules = reactive({
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
    ]
})
</script>

<style scoped lang="scss">
</style>