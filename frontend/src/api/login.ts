import request from '@/utils/request'
interface LoginCredentials {
  email: string;
  password: string;
}

// 注册
export function register(data:LoginCredentials) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false,
    },
    method: 'post',
    data: data
  })
}

// 登录
export function login(data:LoginCredentials) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false,
    },
    method: 'post',
    data: data
  })
}

