<template>
  <q-page class="w100">
    <q-table
        v-model:selected="selected"
        flat
        bordered
        title="Видео"
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
            @click="isShowUploadModal = true"
        />
        <q-dialog v-model="isShowUploadModal">
          <q-card class="q-pa-md tw-flex tw-flex-col tw-gap-4 tw-justify-start tw-items-start">
            <q-input
                v-model="videoName"
                label="Название видeo"
                filled
            />
            <q-uploader
                :headers="[{name: 'token', value: `Bearer ${bearerToken}` }]"
                :disable="!videoFile"
                @added="handleFileChange"
                ref="uploader"
                label="Выберите видeo"
            />
            <q-btn
                label="Сохрaнить"
                filled
                color="primary"
                class="tw-self-end"
                :loading="componentLoading"
                @click="uploadVideo"
            />
          </q-card>
        </q-dialog>
        <!-- Дообавить загрузку видео -->
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
                <q-item-section>Удaлить</q-item-section>
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
            Вы увeрены?
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
              label="Удaлить"
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
const bearerToken = localStorage.getItem('token')
const { notify } = useQuasar()
const selected = ref([])
const videoName = ref('')
const isShowUploadModal = ref(false)
const data = ref({
  rows: [
    {
      pageId: 1,
      name: 'Видeо 1',
      createdAt: '11-12-2024',
      updatedAt: '11-12-2024'
    },
    {
      pageId: 2,
      name: 'Видeо 2',
      createdAt: '11-12-2024',
      updatedAt: '11-12-2024'
    }
  ],
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

const deleteDialog = ref(false)

const filterData = reactive({
  search: '',
  selectedActivity: null,
  selectedPageType: null
})

const pagination = ref({
  page: 1,
  max: 0
})
const videoFile = ref<File | null>(null)

const updatePagination = () => {
  loadData()
}

onMounted(() => {
  loadData()
})

/** Обработчик при выборе видео в инпуте */
const handleFileChange = (files: readonly any[]) => {
  /** Мы предполагаем, что пользователь выберет только 1 видеофайл */
  if (files && files.length > 0) {
    videoFile.value = files[0]
  }
}

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

const showNotify = (message: string = 'Ошибка', icon?: string) => {
  return notify({
    color: 'negative',
    textColor: 'white',
    icon: icon ? 'warning' : icon,
    message: message
  })
}

/** Метод валидации и отправки видеофайла на сервер */
const uploadVideo = async () => {
  if (!videoFile.value) {
    showNotify('Пожалуйста, выберите файл для загрузки!');

    return;
  }

  /** Проверка формата файла */
  if (videoFile.value.type !== 'video/mp4') {
    showNotify('Файл должен быть в формате .mp4');

    return;
  }

  /** Проверка размера файла (максимум 300 MB) */
  if (videoFile.value.size > 300 * 1024 * 1024) {
    showNotify('Файл не должен превышать 300 MB');

    return;
  }

  componentLoading.value = true;

  const formData = new FormData();
  formData.append('video', videoFile.value);
  formData.append('name', videoName.value);

  await apiFetch('/api/v1/videos', {
    method: 'POST',
    body: formData,
    headers: {
      'token': `Bearer ${bearerToken}`
    }
  })
      .then(() => {
        showNotify('Видео успешно загружено!', 'done');
        isShowUploadModal.value = false;

        videoFile.value = null
      })
      .catch((error: any) => showNotify(error.message ?? 'Произошла ошибка при загрузке видео'))
      .finally(() => componentLoading.value = false)
}

definePageMeta({
  layout: 'panel',
})

useSeoMeta({
  title: 'Видео'
})
</script>

<style>

</style>