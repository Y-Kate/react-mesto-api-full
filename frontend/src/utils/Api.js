import { BASE_URL } from './constants'

class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._handleResponse)
  }

  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
      
    })
    .then(this._handleResponse)
  }

  editProfile( authorName, authorAbout, token ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: authorName,
        about: authorAbout
      })
    })
    .then(this._handleResponse)
  }

  addNewCard( cardName, cardLink, token ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._handleResponse)
  }

  deleteCard( cardId, token ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._handleResponse)
  }

  setLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._handleResponse)
  }

  deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._handleResponse)
  }

  updateAvatar(avatarLink, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',  
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(this._handleResponse)
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }});

export default api;