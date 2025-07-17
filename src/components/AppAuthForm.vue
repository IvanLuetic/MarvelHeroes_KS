<template>
  <div class="w-full max-w-md mx-auto px-4 sm:px-6">
    <p
      v-if="errorMessages.otherError"
      class="text-red-300 text-sm bg-red-900/50 border border-red-500/50 backdrop-blur-sm p-3 rounded-lg text-center my-4 font-medium"
    >
      {{ errorMessages.otherError }}
    </p>

    <form
      class="relative flex flex-col bg-black/70 backdrop-blur-md border-2 border-yellow-500/60 shadow-2xl rounded-2xl p-8 sm:px-10 sm:py-10 overflow-hidden"
      @submit.prevent="submit"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-red-600/10 rounded-2xl"
      ></div>

      <div class="relative text-center mb-6">
        <h2
          class="text-red-500 text-4xl sm:text-5xl font-black tracking-widest uppercase"
          style="
            font-family: 'Oswald', sans-serif;
            text-shadow:
              3px 3px 0px #000,
              -2px -2px 0px #000,
              2px -2px 0px #000,
              -2px 2px 0px #000,
              0px 0px 10px #dc2626;
          "
        >
          MARVEL
        </h2>

        <h3
          class="text-yellow-400 text-lg font-bold tracking-wider"
          style="font-family: 'Oswald', sans-serif"
        >
          HEROES
        </h3>
      </div>

      <div class="relative">
        <div v-if="!isLogin">
          <AppInput
            v-model="firstName"
            id="First name"
            label="First name"
            :error="errorMessages.firstnameError"
          />
          <AppInput
            v-model="lastName"
            id="Last name"
            label="Last name"
            :error="errorMessages.lastnameError"
          />
        </div>

        <div class="">
          <AppInput
            v-model="email"
            id="Email"
            label="Email"
            type="email"
            :error="errorMessages.emailError"
          />
          <AppInput
            v-model="password"
            id="Password"
            label="Password"
            type="password"
            :error="errorMessages.passwordError"
          />
        </div>

        <AppButton
          type="submit"
          :label="isLogin ? 'SIGN IN' : 'REGISTER'"
          primary
          class="mt-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg tracking-wide uppercase border-2 border-yellow-500/50 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          style="font-family: 'Oswald', sans-serif; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)"
        />

        <div
          class="flex flex-col md:flex-row md:gap-2 md:justify-center text-center mt-6 text-gray-300"
          style="font-family: 'Oswald', sans-serif"
        >
          <span class="mb-2 text-gray-400">{{
            isLogin ? 'New to our app?' : 'Already have an account?'
          }}</span>
          <span
            class="underline cursor-pointer text-yellow-400 hover:text-yellow-300 transition-colors font-semibold tracking-wide"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? 'Sign up' : 'Log in' }}
          </span>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import authApi from '../api/authApi.js'
import AppInput from './AppInput.vue'
import AppButton from './AppButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const errorMessages = ref({
  firstnameError: '',
  lastnameError: '',
  emailError: '',
  passwordError: '',
  otherError: '',
})
const isLogin = ref(false)

const submit = async () => {
  Object.keys(errorMessages.value).forEach((error) => {
    errorMessages.value[error] = ''
  })

  let hasError = false

  if (!isLogin.value && !firstName.value) {
    errorMessages.value.firstnameError = 'First name is required'
    hasError = true
  }

  if (!isLogin.value && !lastName.value) {
    errorMessages.value.lastnameError = 'Last name is required'
    hasError = true
  }
  if (!email.value) {
    errorMessages.value.emailError = 'Email is required'
    hasError = true
  }
  if (password.value.length < 8) {
    errorMessages.value.passwordError = 'Password must be at least 8 characters long!'
    hasError = true
  }
  if (hasError) return

  try {
    const { token, user } = await authApi[isLogin.value ? 'signIn' : 'signUp']({
      email: email.value,
      password: password.value,
      ...(!isLogin.value ? { firstName: firstName.value, lastName: lastName.value } : {}),
    })
    userStore.currentUser = user
    localStorage.setItem('token', token)
    router.push({
      name: 'home',
    })
  } catch (err) {
    console.error('Error details:', err.response?.data.message)
    const message = err.response?.data?.message

    // display backend errors
    if (message?.toLowerCase().includes('email')) {
      errorMessages.value.emailError = message
    } else if (message?.toLowerCase().includes('password')) {
      errorMessages.value.passwordError = message
    } else if (message?.toLowerCase().includes('first')) {
      errorMessages.value.firstnameError = message
    } else if (message?.toLowerCase().includes('last')) {
      errorMessages.value.lastnameError = message
    } else {
      errorMessages.value.otherError = message
    }
  }
}
watch(isLogin, () => {
  Object.keys(errorMessages.value).forEach((error) => {
    errorMessages.value[error] = ''
  })
})
</script>
