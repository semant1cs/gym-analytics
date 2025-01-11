<template>
  <q-page class="flex flex-center">
    <div class="upload-wrapper">
      <div class="upload-container" @click="handleContainerClick">
        <div class="upload-header">
          <q-icon name="video_library" size="50px" color="primary" />
          <h2 class="upload-title">Загрузите ваше видео</h2>
          <p class="upload-description">
            Выберите видео в формате MP4 (до 500 МБ).
          </p>
        </div>

        <q-btn label="Выберите видео" color="primary" class="upload-btn" />
        <input
          type="file"
          ref="fileInput"
          accept="video/mp4"
          @change="handleFileChange"
          style="display: none"
        />

        <div v-if="errorMessage" class="error-message q-mt-md">
          {{ errorMessage }}
        </div>

        <div v-if="isUploading" class="progress-container q-mt-md">
          <q-linear-progress
            :value="uploadProgress"
            color="primary"
            size="15px"
          />
        </div>

        <div v-if="uploadedFiles.length" class="uploaded-files q-mt-lg">
          <div
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="uploaded-file"
          >
            <span>{{ file.name }}</span>
            <q-btn
              flat
              icon="cancel"
              color="negative"
              @click.stop="removeFile(index)"
            size="sm"
            />
          </div>
        </div>
      </div>

      <q-btn
        label="Отправить"
        color="secondary"
        @click="uploadFiles"
        :disabled="uploadedFiles.length === 0 || isUploading"
        class="upload-btn q-mt-md"
        style="width: 80%"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'VideoUploadPage',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null);
    const uploadedFiles = ref<File[]>([]);
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const errorMessage = ref<string>('');

    /** Триггерим выбор файла */
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    /** Обработка клика по контейнеру */
    const handleContainerClick = (event: MouseEvent) => {
      /** Проверяем, что клик не был на кнопке "Отправить" или на крестике */
      if (event.target instanceof HTMLElement && !event.target.closest('.uploaded-file')) {
        triggerFileInput();
      }
    };

    /** Обработка выбранного файла */
    const handleFileChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0]!;
        if (file.type !== 'video/mp4') {
          errorMessage.value = 'Только файлы в формате MP4.';
          return;
        }
        if (file.size > 500 * 1024 * 1024) {
          errorMessage.value = 'Файл должен быть не более 500 МБ.';
          return;
        }
        errorMessage.value = '';

        uploadedFiles.value.push(file);
      }
    };

    /** Удаление файла из списка */
    const removeFile = (index: number) => {
      uploadedFiles.value.splice(index, 1);
    };

    /** Отправка файлов на сервер */
    const uploadFiles = async () => {
      if (uploadedFiles.value.length === 0) return;

      isUploading.value = true;
      const formData = new FormData();
      uploadedFiles.value.forEach((file) => {
        formData.append('files', file);
      });

      try {
        // TODO добавть корректной ури
        await axios.post('uri', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              uploadProgress.value = (progressEvent.loaded / progressEvent.total) * 100;
            }
          },
        });
        isUploading.value = false;
        uploadedFiles.value = [];
      } catch (error) {
        console.error(error);

        errorMessage.value = 'Ошибка при загрузке файла';
        isUploading.value = false;
      }
    };

    return {
      fileInput,
      uploadedFiles,
      isUploading,
      uploadProgress,
      errorMessage,
      triggerFileInput,
      handleFileChange,
      removeFile,
      uploadFiles,
      handleContainerClick,
    };
  },
});
</script>

<style scoped>
.upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.upload-container {
  width: 80%;
  padding: 30px;
  border: 2px dashed #1976d2;
  border-radius: 12px;
  text-align: center;
  position: relative;
  background-color: #f1f8ff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.upload-container:hover {
  transform: translateY(-5px);
}

.upload-header {
  margin-bottom: 20px;
}

.upload-title {
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
  margin: 10px 0;
}

.upload-description {
  font-size: 14px;
  color: #5a5a5a;
}

.upload-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.upload-btn:hover {
  background-color: #1565c0;
}

.error-message {
  color: red;
  font-size: 14px;
}

.progress-container {
  margin-top: 20px;
}

.uploaded-files {
  margin-top: 20px;
  text-align: left;
  max-height: 150px;
  overflow-y: auto;
}

.uploaded-file {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  padding: 8px;
  background-color: #e3f2fd;
  border-radius: 8px;
}

.uploaded-file span {
  font-size: 14px;
  color: #1976d2;
}

.uploaded-file q-btn {
  padding: 0;
}

.q-mt-lg {
  margin-top: 30px;
}

.q-mt-md {
  margin-top: 20px;
}
</style>
