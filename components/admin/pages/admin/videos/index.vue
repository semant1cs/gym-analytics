<template>
  <div>
    <q-uploader
      url="http://51.250.45.111:8083/api/v1/videos"
      method="POST"
      :headers="headers"
      square
      flat
      bordered
      max-files="1"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'panel',
})

// const headers = [
//   {
//     name: 'Authorization', value: localStorage.getItem('token')
//   },
  // {
  //   name: 'Access-Control-Allow-Origin', value: '*'
  // },
  // {
  //   name: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept'
  // }
// ]

const headers =  [
  { name: 'Content-Type', value: 'application/json' },
  { name: 'Accept', value: 'application/json' },
  { name: 'Authorization', value: localStorage.getItem('token')},
  // {
  //   name: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept'
  // },
  // {
  //   name: 'Access-Control-Allow-Origin', value: '*'
  // }
]


useSeoMeta({
  title: 'Видео'
})
</script>

<style>

</style>