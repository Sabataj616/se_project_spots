class Api {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeProfilePic({ avatar }) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard({ id }) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeStatus(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

export default Api;
