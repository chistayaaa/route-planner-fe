import { api } from './api'

interface LoginBody {
  email: string
  password: string
}

export async function loginUser(body: LoginBody) {
  return await api<LoginBody>({ path: 'auth/login', body, method: 'POST' })
}
