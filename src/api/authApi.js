import apiConfig from './config'

async function signUp(inputData) {
  console.log(import.meta.env.VITE_API_URL)
  const response = await apiConfig.post('/users/signup', inputData)

  const {
    token,
    data: { user },
  } = response.data

  return {
    token,
    user,
  }
}

async function signIn(inputData) {
  const response = await apiConfig.post('/users/login', inputData)

  const {
    token,
    data: { user },
  } = response.data

  return {
    token,
    user,
  }
}

async function getMe() {
  const response = await apiConfig.get('/users/me')

  const {
    data: { user },
  } = response.data

  return user
}

const authApi = {
  signUp,
  signIn,
  getMe,
}

export default authApi
