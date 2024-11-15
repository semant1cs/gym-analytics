<template>
  <q-page class="w100">
    <q-table
      v-model:selected="selected"
      flat
      bordered
      title="Сотрудники"
      row-key="pageId"
      hide-pagination
      no-data-label="Данные отсутствуют"
      loading-label="Загрузка..."
      selection="multiple"
      :selected-rows-label="(numberOfRows: number) => `Выбрано ${numberOfRows} шт.`"
      :rows="data.rows"
      :columns="columns"
      :rows-per-page-options="[10]"
      :loading="componentLoading"
      @row-click="rowClick"
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
          @click="router.push('/admin/employee/create')"
        />

        <q-btn
          round
          flat
          icon="more_vert"
          :loading="componentLoading"
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

    <div class="row justify-center mt-16">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        size="sm"
        boundary-numbers
        :max="pagination.max"
        :max-pages="6"
        @update:model-value="updatePagination"
      />
    </div>

    <q-dialog
      v-model="deleteDialog"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Вы уверены?
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Выбранные элементы будут удалены без возможности восстановления.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Отмена"
            color="panel-primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Удалить"
            color="negative"
            @click="doDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>

</template>

<script lang="ts" setup>
import { viewDate } from '~/components/admin/shared/libs/helpers'
import { useRouter } from 'vue-router'
import { apiFetch } from '~/extensions/fetch'
import { useQuasar } from 'quasar';

const router = useRouter()
const { notify } = useQuasar()
const selected = ref([])
const data = ref({
  rows: [],
  count: 0,
  pageTypes: []
})

const columns: any = [
  {
    name: 'ID',
    align: 'center',
    label: 'ID',
    field: 'pageId',
    sortable: true
  },
  {
    name: 'Название',
    align: 'center',
    label: 'Название',
    field: 'name',
    sortable: false
  },
  {
    name: 'Дата создания',
    align: 'center',
    label: 'Дата создания',
    field: (row: any) => viewDate(row.createdAt),
    sortable: false
  },
  {
    name: 'Дата редактирования',
    align: 'center',
    label: 'Дата редактирования',
    field: (row: any) => viewDate(row.updatedAt),
    sortable: false
  }
]

const componentLoading = ref(false)

const rowClick = (_evt: any, row: any) => {
  router.push(`/admin/employee/${row.pageId}`)
}

const deleteDialog = ref(false)

const activity = [
  {
    label: 'Да',
    value: true
  },
  {
    label: 'Нет',
    value: false
  }
]

const filterData = reactive({
  search: '',
  selectedActivity: null,
  selectedPageType: null
})

const pagination = ref({
  page: 1,
  max: 0
})

const updatePagination = () => {
  loadData()
}

onMounted(() => {
  loadData()
})

const loadData = async () => {
  componentLoading.value = true

  let url = `/api/v1/videos`
  const body = {
    ...filterData
  }

  if (body.search && body.search.length > 25) {
    body.search = body.search.slice(0 , 25)
  }

  await apiFetch(url, {
    method: 'get'
  })
    .then((result: any) => {
      pagination.value.max = Math.ceil(result.count / 10)
      data.value = result
    })
    .catch((err) => {
      notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: err.message || 'Упс, произошла ошибка'
      })
    })

  componentLoading.value = false
}

const doDelete = async () => {
  componentLoading.value = true

  const pageIds = selected.value.map((row: any) => row.pageId)

  await apiFetch('/api/admin/employee/destroy', {
    method: 'post',
    body: {
      pageIds
    },
    headers: {
      'Content-Type': 'application/json',
      'Host': 'http://130.193.35.80:8083',
      'Access-Control-Allow-Origin': 'http://130.193.35.80:8083',
      'Access-Control-Allow-Credentials': true
    }
  })
    .then((result: any) => {
      notify({
        color: 'positive',
        textColor: 'white',
        icon: 'done',
        message: result.message || 'Успех'
      })

      loadData()
      selected.value = []
    })
    .catch((err) => {
      notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: err.message || 'Упс, произошла ошибка'
      })
    })

  componentLoading.value = false
}

definePageMeta({
  layout: 'panel',
})

useSeoMeta({
  title: 'Сотрудники'
})
</script>

<style>

</style>