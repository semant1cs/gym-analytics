<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-form
            v-if="!isCodeRequire"
            class="q-gutter-md login-form"
            @submit="onSubmit"
            @reset="onReset"
        >
          <q-input
              v-model="login"
              label="Логин"
              hint="Введите Email"
              color="panel-primary"
              type="email"
              filled
              :error-message="errors['login']"
              :error="!!errors['login']"
              @update:model-value="errors['login'] = ''"
          />

          <div>
            <q-btn
                label="Продолжить"
                type="submit"
                color="panel-primary"
                :loading="componentLoading"
            />
            <q-btn
                label="Сбросить"
                type="reset"
                color="panel-primary"
                flat
                class="q-ml-sm"
                :loading="componentLoading"
            />
          </div>
        </q-form>
        <q-form
            v-if="isCodeRequire"
            class="q-gutter-md login-form"
            @submit="onSubmitCode"
            @reset="onResetCode"
        >
          <q-input
              v-model="code"
              label="Код"
              hint="Введите код с почты"
              color="panel-primary"
              type="text"
              filled
              :error-message="errors['code']"
              :error="!!errors['code']"
              @update:model-value="errors['code'] = ''"
          />

          <div>
            <q-btn
                label="Продолжить"
                type="submit"
                color="panel-primary"
                :loading="componentLoading"
            />
            <q-btn
                label="Сбросить"
                type="reset"
                color="panel-primary"
                flat
                class="q-ml-sm"
                :loading="componentLoading"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import type {UnwrapNestedRefs} from 'vue';

definePageMeta({
  layout: 'empty'
})

useSeoMeta({
  title: 'Вход',
})

const {notify} = useQuasar()
const router = useRouter()

const login = ref('')
const code = ref('')
const isCodeRequire = ref(false)
const userId = ref('')

const errors = reactive({
  login: '',
  password: '',
  code: ''
}) as UnwrapNestedRefs<Record<string, any>>
const componentLoading = ref(false)

const onReset = () => {
  login.value = ''
}

const onResetCode = () => {
  code.value = ''
}

const onSubmitCode = async () => {
  componentLoading.value = true

  let url = `http://51.250.45.111:8083/api/v1/email/${userId.value}/confirm`

  await $fetch(url, {
    method: 'POST',
    body: {code: Number(code.value)}
  }).then((result: any) => {
    onReset()
    notify({
      color: 'positive',
      textColor: 'white',
      icon: 'done',
      message: 'Успешный вход'
    })
    localStorage.setItem('token', `Bearer ${result.token}`)
    router.push('/admin')
  }).catch((e) => {
    errors['code'] = 'Введен неверный код'
    notify({
      color: 'negative',
      textColor: 'white',
      icon: 'warning',
      message: 'Упс, произошла ошибка'
    })
  })
  componentLoading.value = false
}

const onSubmit = async () => {
  componentLoading.value = true

  let url = `http://51.250.45.111:8083/api/v1/email/send`

  await $fetch(url, {
    method: 'POST',
    body: {email: login.value}
  }).then((result: any) => {
    userId.value = result.id
    onReset()
    notify({
      color: 'positive',
      textColor: 'white',
      icon: 'done',
      message: 'Проверьте код на почте'
    })
    isCodeRequire.value = true
  }).catch((e) => {
    errors['login'] = 'Введена неверная почта'
    errors['password'] = 'Введен неверный пароль'
    notify({
      color: 'negative',
      textColor: 'white',
      icon: 'warning',
      message: 'Упс, произошла ошибка'
    })
  })
  componentLoading.value = false
}

</script>
