<template>
    <div class="signUp authContainer">
        <img src="@/assets/icons/Sequin.world.svg" alt="Logo">
        <h1>Welcome</h1>
        <p>Sign Up to Sequin.World</p>
        <el-form ref="formRef" label-position="top" :model="data" @submit.prevent :rules="rules">
            <el-form-item prop="name">
                <el-input v-model="data.name" placeholder="Name" size="large" />
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="data.email" placeholder="Email address" size="large" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="data.password" placeholder="Password" autocomplete="off"
                    size="large" />
            </el-form-item>
            <el-form-item prop="passwordRepeat">
                <el-input type="password" v-model="data.passwordRepeat" placeholder="Repeat password" autocomplete="off"
                    size="large" />
            </el-form-item>
            <el-button class="full-width" type="primary" size="large" :loading="loading" @click="signup">Continue</el-button>
        </el-form>
        <p class="haveAccount">Already have an account? <router-link to="/auth/login">Log in</router-link>
        </p>
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
  name: '',
  email: '',
  password: '',
  passwordRepeat: ''
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
const validatePassRepeat = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (value !== data.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' }
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwordRepeat: [{ validator: validatePassRepeat, trigger: 'blur' }]
})

const signup = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      auth.signup({
        email: data.email,
        name: data.name,
        username: data.name,
        password: data.password,
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
            message: 'User created successfully',
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
.signUp .haveAccount {
    margin-top: 10px !important;
    margin-bottom: 0 !important;
    a {
        font-size: 14px;
    }
}
</style>
