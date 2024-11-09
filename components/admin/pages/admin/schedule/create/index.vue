<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-date v-model="model" mask="DD-MM-YYYY HH:mm" color="primary" />
      <q-time v-model="model" mask="DD-MM-YYYY HH:mm" color="primary" />
      <q-space />
      <q-btn color="primary" label="Сохранить" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = ref(null)

definePageMeta({
  layout: 'panel',
})

useSeoMeta({
  title: 'Добавление расписания'
})
</script>

<style>

</style>