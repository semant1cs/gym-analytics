<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-form
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import type { UnwrapNestedRefs } from 'vue';


definePageMeta({
  layout: 'empty'
})

useSeoMeta({
  title: 'Вход',
})

const { notify } = useQuasar()
const router = useRouter()

const login = ref('')

const errors = reactive({
  login: '',
  password: ''
}) as UnwrapNestedRefs<Record<string, any>>
const componentLoading = ref(false)

const onReset = () => {
  login.value = ''
}

const onSubmit = async () => {
  componentLoading.value = true

  setTimeout(() => {
    if (Math.random() * 100 > 50) {
      onReset()
      notify({
        color: 'positive',
        textColor: 'white',
        icon: 'done',
        message: 'Успешный вход'
      })
      router.push('/admin')
    } else {
      errors['login'] = 'Введена неверная почта'
      errors['password'] = 'Введен неверный пароль'
      notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: 'Упс, произошла ошибка'
      })
    }
    componentLoading.value = false
  }, 1000)
}


</script>
