import { request } from '@/utils/request'

export interface LoginParams {
  loginName: string
  password: string
}
export async function login(params: LoginParams) {
  return request<{ code: number; msg: string; data: string }>('/login', {
    method: 'post',
    isLoading: true,
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}
export async function logout() {
  return request('/logout', {
    method: 'post'
  })
}
