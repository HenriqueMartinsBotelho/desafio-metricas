<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="mb-4 text-4xl font-semibold">Log in</h1>
    <p class="mb-4 text-base leading-5">
      New to CopyBase?
      <RouterLink :to="{ name: 'signup' }" class="font-semibold text-primary">Sign up</RouterLink>
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
      >
        <template #appendInner>
          <VaIcon
            :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div class="flex flex-col items-start justify-between auth-layout__options sm:flex-row sm:items-center">
      <VaCheckbox v-model="formData.keepLoggedIn" class="mb-2 sm:mb-0" label="Keep me signed in on this device" />
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 font-semibold sm:mt-0 sm:ml-1 text-primary">
        Forgot password?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import axios from './../../services/axios'
import { useAuth } from './../../stores/auth'

const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const formData = reactive({
  email: '',
  password: '',
  keepLoggedIn: false,
})

const submit = async () => {
  const { setIsAuth } = useAuth()

  if (validate()) {
    try {
      const response = await axios.post('/auth', {
        email: formData.email,
        password: formData.password,
      })

      if (response.data.accessToken) {
        init({ message: "You've successfully logged in", color: 'success' })
        setIsAuth(true)
        push({ name: 'dashboard' })
      } else {
        init({ message: response.data.message, color: 'error' })
      }
    } catch (error: any) {
      init({ message: 'Tente novamente!', color: 'error' })
    }
  }
}
</script>
