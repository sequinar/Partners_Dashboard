<template>
    <div class="signUp authContainer">
        <h1>Update password</h1>
        <p>Enter the email associated with your account and we'll send an email with instructions to update your
            password.</p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="email">
                <el-input v-model="data.email" placeholder="Email address" size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large" @click="updatePassword">Update Password</el-button>
        </el-form>
        <div class="d-flex align-center mt-10">
            <router-link class="mr-15" to="/auth/login">Back</router-link>
            <router-link class="wrongEmail" to="/auth">Resend Email</router-link>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = inject('Auth')
const formRef = ref(null)
const loading = ref(false)
const data = reactive({
  email: ''
})
const rules = reactive({
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ]
})

const updatePassword = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      auth.changePassword({
        email: data.email,
        connection: 'Username-Password-Authentication'
      }, (err) => {
        if (err) {
          ElMessage({
            type: 'error',
            message: err.description,
            duration: 5000
          })
          loading.value = false
        } else {
          ElMessage({
            type: 'success',
            message: 'Instructions have been sent to your email',
            duration: 5000
          })
          router.push('/auth/login')
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
</style>
