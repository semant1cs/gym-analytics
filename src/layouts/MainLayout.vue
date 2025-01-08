<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Гимнастика
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="background-color: #161E43;"
    >
      <q-list>
        <q-item-label
          header
        >
          Панель управления
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Панель',
    caption: 'Главная страница',
    icon: 'home',
    link: '/admin/',
  },
  {
    title: 'Видео',
    caption: 'Добавьте видео для сотрудников',
    icon: 'menu_book',
    link: '/admin/videos/',
  },
  {
    title: 'Расписание',
    caption: 'Создайте/отредактируйте расписание по которому сотрудники будут выполнять гимнастику',
    icon: 'turned_in',
    link: '/admin/schedule/',
  },
  {
    title: 'Статистика по видео',
    caption: 'Статистика по просмотренным видео',
    icon: 'trending_up',
    link: '/admin/stats/videos',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style>
.q-drawer--left {
  border-right: none !important;
}
</style>
