<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="icon"
        class="essential-link__text"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="essential-link__text">
        {{ title }}
      </q-item-label>
      <q-item-label
        caption
        class="essential-link__text"
      >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: ''
})
</script>

<style>
.essential-link__text {
  color: #757575;
}
</style>
