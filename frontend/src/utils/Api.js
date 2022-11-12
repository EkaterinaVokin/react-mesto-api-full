class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  _request(url, options) {
    // функция запрос которая принимает два аргумента ссылку и объект опций
    return fetch(url, {
      ...options,
      credentials: 'include',
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getUser() {
    // сделать запрос чтобы  получить информацию о пользователе с сервера
    return this._request(`${this._url}/users/me`, { headers: this._headers });
  }
  getCard() {
    // создать запрос чтобы загрузить карточки с сервера
    return this._request(`${this._url}/cards`, { headers: this._headers });
  }
  editProfile({ name, about }) {
    // создать запрос для редактирование профиля
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
  addCard({name,link}) {
    // создать запрос добавить новую карточку
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
  deleteCard(id) {
    // создать запрос чтобы удалить карточку
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
      },
    });
  }
  putLike(id) {
    // поставить лайк карточки
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
      },
    });
  }
  deleteLike(id) {
    // создаем запрос на удаление лайка с карточки
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
      },
    });
  }
  changeLike(id, isLikeAdded) {
    return isLikeAdded
      ? this.putLike(id)
      : this.deleteLike(id);
  }
  updateAvatar({ avatar }) {
    // создаем запрос чтобы изменить аватар пользователя
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

const object = {
  url: process.env.REACT_APP_API_URL || 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {},
};

 export const api = new Api(object);