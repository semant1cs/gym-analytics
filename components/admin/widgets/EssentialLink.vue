<template>
  <q-item
    clickable
    tag="a"
    active-class="q-item-no-link-highlighting"
    :class="{ 'highlighting-is-on': route.meta.tag == props.tag }"
    :to="props.link"
    @click="sendEmit"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>
        {{ props.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '#'
  },
  tag: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['closeDrawer'])

const sendEmit = () => {
  if (route.path === props.link && window.innerWidth < 1024) {
    emit('closeDrawer')
  }
}
</script>

<style lang="scss" scoped>
.q-router-link--exact-active {
  color: $panel-primary;
}
</style>
