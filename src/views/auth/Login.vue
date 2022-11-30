<template>
    <div class="logIn authContainer">
        <h1>Hi There,</h1>
        <p>Welcome to Sequin.World – to begin, enter your email and password. Don't have an account? <router-link
                to="/auth/signup">Sign Up</router-link>
        </p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="name">
                <el-input v-model="data.name" placeholder="User name" size="large" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="data.password" placeholder="Password" autocomplete="off"
                    size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large" @click="login" :loading="loading">Log In</el-button>
        </el-form>
        <div class="d-flex align-center justify-between mt-10">
            <router-link to="/auth/pass-update">Forgot Password?</router-link>
            <router-link class="wrongEmail" to="/auth/new-password">Wrong Email or Password*</router-link>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue'
import { ElMessage } from 'element-plus'

const auth = inject('Auth')
const formRef = ref(null)
const loading = ref(false)
const data = reactive({
  name: '',
  password: ''
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
const rules = reactive({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 3, max: 35, message: 'The length should be from 3 to 35', trigger: 'change' }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

const login = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      auth.login({
        username: data.name,
        password: data.password
      }, (err) => {
        ElMessage({
          type: 'error',
          message: err.description,
          duration: 5000
        })
        loading.value = false
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
.wrongEmail {
    color: #FF3E00
}
</style>
