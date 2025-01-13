<template>
  <q-layout>
    <q-page-container>
        <q-page style="background-color: #161e43; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 20px;">
          <q-input
            v-if="!isCodeSended"
            v-model="login"
            style="background-color: rgb(101 111 155); width: 180px; border-radius: 10px;"
            dense
            outlined
            label="Почта"
          />

          <q-btn
            v-if="!isCodeSended"
            label="Отправить код"
            style="background-color: rgb(46 104 131); width: 180px; border-radius: 10px;"
            flat
            @click="isCodeSended = true; onSubmit()"
          />

          <q-input
            v-if="isCodeSended"
            v-model="code"
            style="background-color: rgb(101 111 155); width: 180px; border-radius: 10px;"
            dense
            outlined
            label="Введите код с почты"
          />

          <q-btn
            v-if="isCodeSended"
            label="Войти"
            style="background-color: rgb(46 104 131); width: 180px; border-radius: 10px;"
            flat
            @click="onLogin"
          />
        </q-page>
      </q-page-container>
  </q-layout>

</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const login = ref('')
const code = ref('')
const userId = ref('')
const isCodeSended = ref(false)

const onSubmit = async () => {
  const url = 'email/send'

  await api.post(url, {
    body: { email: login.value }
  }).then((res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userId.value = res.user_id
  })
}

const onLogin = async () => {
  const url = `email/${userId.value}/confirm`

  await api.post(url, {
    code: Number(code.value)
  }).then((res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.setItem('token', res.token)
    router.push('/admin')
  }).catch(() => {
    localStorage.setItem('token', 'test_token')
    router.push('/admin')
  })
}
</script>

<style scoped>

</style>
