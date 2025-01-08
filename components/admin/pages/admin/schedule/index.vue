<template>
  <div>
    <q-table
        v-model:selected="selected"
        flat
        bordered
        title="Расписание"
        row-key="pageId"
        hide-pagination
        no-data-label="Данные отсутствуют"
        loading-label="Загрузка..."
        selection="multiple"
        :selected-rows-label="(numberOfRows: number) => `Выбрано ${numberOfRows} шт.`"
        :rows="data"
        :columns="columns"
        :rows-per-page-options="[10]"
    >
      <template
          #top-right
      >
        <q-input
            v-model.trim="filterData.search"
            class="mr-6 gt-sm filter-input"
            dense
            outlined
            label="Поиск"
            color="panel-primary"
        />

        <q-btn
            class="mr-4"
            round
            flat
            icon="add"
            @click="router.push('/admin/schedule/create')"
        />

        <q-btn
            round
            flat
            icon="more_vert"
        >
          <q-menu>
            <q-list style="min-width: 135px">
              <q-item
                  v-close-popup
                  clickable
                  @click="deleteDialog = true"
              >
                <q-item-section>Удалить</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import {viewDate} from '~/components/admin/shared/libs/helpers'

const router = useRouter()
definePageMeta({
  layout: 'panel',
})

useSeoMeta({
  title: 'Расписание'
})
const url = `http://51.250.45.111:8083/api/v1/schedule/1`
const selected = ref([])
const filterData = reactive({
  search: '',
  selectedActivity: null,
  selectedPageType: null
})
const deleteDialog = ref(false)
const columns: any = [
  {
    name: 'ID',
    align: 'center',
    label: 'ID',
    field: 'ID',
    sortable: true
  },
  {
    name: 'Время',
    align: 'center',
    label: 'Время',
    field: 'Time',
    sortable: false
  },
  {
    name: 'Дата создания',
    align: 'center',
    label: 'Дата создания',
    field: (row: any) => viewDate(row.CreatedAt),
    sortable: false
  },
  {
    name: 'Дата редактирования',
    align: 'center',
    label: 'Дата редактирования',
    field: (row: any) => viewDate(row.UpdatedAt),
    sortable: false
  }
]
const data = ref()
await $fetch(url, {
  method: "GET"
}).then((res) => data.value = res)
</script>
<style>

</style>