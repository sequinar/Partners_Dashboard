<template>
    <div class="logIn authContainer">
        <h1>Hi There,</h1>
        <p>Welcome to Sequin.World – to begin, enter your email and password. Don't have an account? <router-link
                to="/auth">Sign Up</router-link>
        </p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="name">
                <el-input v-model="data.name" placeholder="User name" size="large" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="data.password" placeholder="Password" autocomplete="off"
                    size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large">Log In</el-button>
        </el-form>
        <div class="d-flex align-center justify-between mt-10">
            <router-link to="/auth/pass-update">Forgot Password?</router-link>
            <router-link class="wrongEmail" to="/auth">Wrong Email or Password*</router-link>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const formRef = ref(null)
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
    { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }]
})
</script>

<style scoped lang="scss">
.wrongEmail {
    color: #FF3E00
}
</style>
