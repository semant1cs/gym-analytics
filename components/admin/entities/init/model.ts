export type AdminUser = {
  userId: number
  groupId: number
}

export const useInitStore = defineStore('panel', () => {
  const user: Ref<AdminUser | null> = ref(null)

  const setUser = (data: AdminUser) => {
    user.value = data
  }

  return {
    setUser,
    user
  }
})
