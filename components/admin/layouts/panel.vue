<template>
  <q-layout
    class="panel-layout"
    view="lHh Lpr lFf"
  >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          outline
          icon="menu"
          aria-label="Меню"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Панель управления
        </q-toolbar-title>

        <template v-if="enableAdditionalButtons">
          <q-btn
            unelevated
            class="mr-8"
            color="white"
            text-color="panel-primary"
            label="Назад"
            aria-label="Назад"
            :loading="headerLoading"
            @click="triggerCallback('backCallback')"
          />

          <q-btn
            unelevated
            class="mr-16"
            color="white"
            text-color="panel-primary"
            label="Сохранить"
            aria-label="Сохранить"
            :loading="headerLoading"
            @click="triggerCallback('submitCallback')"
          />
        </template>

        <q-btn
          outline
          flat
          dense
          round
          :loading="componentLoading"
          icon="logout"
          aria-label="Выход"
          @click="logoutAlert = true"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="300"
    >
      <q-list>
        <template
          v-for="(group, j) in essentialLinks"
          :key="j"
        >
          <q-item-label
            header
            class="group-label"
          >
            {{ group.label }}
          </q-item-label>

          <EssentialLink
            v-for="link in group.items"
            :key="link.title"
            v-bind="link"
            @close-drawer="leftDrawerOpen = false"
          />
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="pa-16">
        <slot />
      </div>
    </q-page-container>

    <q-dialog v-model="logoutAlert">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Вы уверены?
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Сессия будет удалена, придется снова вводить логин и пароль для входа.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Закрыть"
            color="panel-primary"
          />

          <q-btn
            flat
            label="Выйти"
            color="negative"
            @click="logout"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
// @ts-ignore
import EssentialLink from '../widgets/EssentialLink.vue'
import { apiFetch } from '../../../extensions/fetch'
import { usePageHeaderStore } from '../entities/pages/header/model'
import { useInitStore as panelInitStore } from '../entities/init/model'
import { initPanelModel } from '../entities/layouts/panel/model'

const { user } = panelInitStore()

const { notify } = useQuasar()
const router = useRouter()

const {
  enableAdditionalButtons,
  headerLoading,
  triggerCallback
} = usePageHeaderStore()

const {
  menuArray,
  filterMenuByAccessRights
} = initPanelModel()
const essentialLinks = filterMenuByAccessRights(menuArray, user?.groupId || 0)

const leftDrawerOpen = ref(false)
const logoutAlert = ref(false)
const componentLoading = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = async () => {
  componentLoading.value = true

  notify({
    color: 'positive',
    textColor: 'white',
    icon: 'done',
    message: 'Готово'
  })
  router.push('/admin/login')

  // await apiFetch('/api/user/logout', { method: 'delete' })
  //   .then((result: any) => {
  //     notify({
  //       color: 'positive',
  //       textColor: 'white',
  //       icon: 'done',
  //       message: result.message || 'Готово'
  //     })
  //     router.push('/admin/login')
  //   })
  //   .catch((err: { message: any }) => {
  //     notify({
  //       color: 'negative',
  //       textColor: 'white',
  //       icon: 'warning',
  //       message: err.message || 'Упс, произошла ошибка'
  //     })
  //   })

  componentLoading.value = false
}
</script>

<style lang="scss">
.panel-layout {
  @import '~/components/admin/css/common.scss';
  @import '~/components/admin/css/panel.scss';

  .group-label {
    font-size: 1rem;
  }

  .q-layout__section--marginal {
    background-color: $panel-primary;
  }
}
</style>
