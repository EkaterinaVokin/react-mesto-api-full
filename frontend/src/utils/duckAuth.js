export const BASE_URL = 'https://auth.nomoreparties.co'; // базовая ссылка

export function request({url,method = 'POST',token,data}) {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...!!token && {"Authorization" : `Bearer ${token}`} 
    },
    ...!!data && {body:JSON.stringify(data)}
    })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  })
}

// Регистрация пользователя
export function register (email,password) {
  return request({
    url: '/signup',
    data: {email,password}
  })
}

// Авторизация пользователя
export function authorize (email,password) {
  return request({
    url: '/signin',
    data: {email,password}
  })
}

// проверить токен и получить данные пользователя
export function getContent (token) {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  })
}
 