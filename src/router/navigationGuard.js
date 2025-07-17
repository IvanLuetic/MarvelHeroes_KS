import authApi from '@/api/authApi'
import { useUserStore } from '@/stores/user'

async function forbidUnauthenticated() {
  const userStore = useUserStore()

  if (userStore.currentUser) return true

  try {
    const user = await authApi.getMe()

    userStore.currentUser = user

    return true
  } catch {
    return { name: 'auth' }
  }
}

export default forbidUnauthenticated
