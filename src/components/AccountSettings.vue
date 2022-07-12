<template>
  <div class="accountSetting">
    <div class="accountSetting--header d-flex align-center justify-between">
      <UserAvatar :user-avatar="user.picture" />
      <el-button
        text
        large
        class="collapseButton"
        @click="emit('close')"
      >
        <img
          src="../assets/icons/Collapse_Profile_menu.svg"
          alt="collapseIcon"
        >
      </el-button>
    </div>
    <el-form
      ref="nameForm"
      label-position="top"
      :model="user"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        label="Name"
        prop="nickname"
      >
        <el-input
          v-model="user.nickname"
          size="large"
          maxlength="25"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="User name"
        prop="name"
      >
        <el-input
          v-model="user.name"
          size="large"
          maxlength="25"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="user.email"
          disabled
          placeholder="Emailexample@email.com"
          size="large"
        />
      </el-form-item>
      <el-button
        class="full-width"
        type="primary"
        size="large"
        @click="submitNameForm"
      >
        Save
      </el-button>
    </el-form>
    <el-form
      ref="passForm"
      label-position="top"
      :model="passwordUpdate"
      :rules="rulesPass"
      @submit.prevent
    >
      <h4>Update Password</h4>
      <el-form-item
        class="ma-0"
        label="Current password"
      >
        <el-input
          v-model="passwordUpdate.currentPass"
          type="password"
          autocomplete="off"
          size="large"
        />
      </el-form-item>
      <a href="#">Forgot password?</a>
      <el-form-item
        label="New password"
        prop="pass"
      >
        <el-input
          v-model="passwordUpdate.pass"
          type="password"
          autocomplete="off"
          size="large"
        />
      </el-form-item>
      <el-form-item
        label="Confirm New password"
        prop="checkPass"
      >
        <el-input
          v-model="passwordUpdate.checkPass"
          type="password"
          autocomplete="off"
          size="large"
        />
      </el-form-item>
      <ul class="rules">
        <li>Non-empty password required.</li>
        <li>Must have at least 8 characters in length.</li>
        <li>Lower case (a-z), upper case (A-Z) and numbers (0-9).</li>
      </ul>
      <el-button
        class="full-width"
        type="primary"
        size="large"
        @click="submitPassForm"
      >
        Save
      </el-button>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import UserAvatar from './UserAvatar.vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['close']);

const user = computed(() => store.state.user)
const nameForm = ref();
const passForm = ref();
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
    nickname: [
        { required: true, message: 'Please input your name', trigger: 'blur' },
        { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'change' },
    ],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
    ],
})

const rulesPass = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitNameForm = async () => {
    await nameForm.value.validate((valid, fields) => {
        if (valid) {
            store.dispatch('updateUser', {
                displayName: user.value.nickname,
                name: user.value.name
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
const submitPassForm = async () => {
    await passForm.value.validate((valid, fields) => {
        if (valid) {
            store.dispatch('updateUser', {
                password: passwordUpdate.value.pass
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss">
.accountSetting {
    width: 325px;
    margin: 0 auto;

    .el-avatar {
        border: 2px solid #fff;

        &--large {
            --el-avatar-size: 60px;
        }
    }

    &--header {
        margin-bottom: 30px;
    }

    .collapseButton {
        height: 40px;

        &:hover,
        &:focus {
            background-color: #282828 !important;
        }
    }

    a {
        margin-bottom: 10px;
        display: inline-block;
    }

    h4 {
        font-size: 16px;
        margin-bottom: 26px;
    }
}

.rules {
    font-size: 12px;
    padding-left: 15px;
    margin-bottom: 18px;
}
</style>