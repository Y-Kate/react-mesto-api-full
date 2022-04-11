import React, {useState} from 'react';
import * as authApi from '../utils/authApi';

function Login({onLogin}) {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }

    onLogin(loginData);
  }

  return (
    <section className="register" >
      <form className="form-user" onSubmit={handleSubmit}>
        <label className="form-user__title">Вход</label>
        <input
        required
        name="email"
        id="user-email"
        placeholder="Email"
        type="email"
        minLength="2"
        maxLength="30"
        className="form-user__input"
        onChange={handleChange}
        value={loginData.email}/>
        <span>{message}</span>
        <input
        required
        name="password"
        id="user-password"
        placeholder="Пароль"
        type="password"
        minLength="2"
        maxLength="30"
        className="form-user__input"
        onChange={handleChange}
        value={loginData.password}
        />
        <span>{message}</span>
        <button className="register__button" type="submit">Войти</button>
      </form>

    </section>
  );
}

export default Login;