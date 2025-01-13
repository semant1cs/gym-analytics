<template>
  <div style="background-color: rgb(22, 30, 67); width: 100%; height: 100vh; margin-top: 0;">
    <h3
      style="margin-left: 30px; margin-top: 0; padding-top: 20px; color: white"
    >
      Расписание
    </h3>
    <div style="background-color: #04448a; height: 85%; margin-left: 30px; margin-right: 30px; border-radius: 20px; padding: 20px">
      <div style="display: flex; width: 100%; gap: 20px">
        <div
          v-for="(day, idx) in days"
          :key="idx"
          style="color: white; font-weight: 700; width: 14.2%; background-color: rgb(22, 30, 67); padding: 10px; border-radius: 20px;"
        >
          <span v-text="day" />
          <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <span>19:30</span>
            <span>Видео 1</span>
          </div>
          <q-btn style="margin: 0 auto;">asd</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
</script>
<style>

</style>
