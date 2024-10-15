export const usePageHeaderStore = defineStore('pageHeaderModel', () => {
  const _enableAdditionalButtons = ref(false)
  const _headerLoading = ref(false)
  const _callbacks = ref({
    backCallback: async () => {},
    submitCallback: async () => {}
  })

  const enableAdditionalButtons = computed(() => _enableAdditionalButtons)
  const headerLoading = computed(() => _headerLoading)

  function setCallbacks(bool: boolean, backCallback = async () => {}, submitCallback = async () => {}) {
    _enableAdditionalButtons.value = bool
    _callbacks.value.backCallback = backCallback
    _callbacks.value.submitCallback = submitCallback
  }

  async function triggerCallback(name: 'backCallback' | 'submitCallback') {
    await _callbacks.value[name]()
  }

  function setHeaderLoading(bool: boolean) {
    _headerLoading.value = bool
  }

  return {
    enableAdditionalButtons,
    headerLoading,
    setCallbacks,
    triggerCallback,
    setHeaderLoading
  }
})
