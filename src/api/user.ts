import request from '@/utils/request'

export function login(data: any) {
  return request({
    url: '/manage-vue3-ts/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token: string | undefined) {
  return request({
    url: '/manage-vue3-ts/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/manage-vue3-ts/user/logout',
    method: 'post'
  })
}
