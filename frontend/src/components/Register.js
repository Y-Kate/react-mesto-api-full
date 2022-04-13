import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import * as authApi from '../utils/authApi';

function Register({onRegister}) {

  const[registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    // authApi.register(email, password)
    //   .then((res) => {
    //     history.push('/sign-up')
    //   })
    onRegister(registerData).catch((err) => setMessage(err.message || 'Что-то пошло не так'));
  }

  return (
    <section className="register" >
      <form className="form-user" onSubmit={handleSubmit}>
        <label className="form-user__title">Регистрация</label>
        <input
        required
        name="email"
        id="user-email"
        placeholder="Email"
        type="email"
        minLength="2"
        maxLength="30"
        className="form-user__input"
        value={registerData.email}
        onChange={handleChange}/>
        
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
        value={registerData.password}
        onChange={handleChange}/>
        <span>{message}</span>
        <button className="register__button" type="submit">Зарегистрироваться</button>
        <p className="register__сaption"> Уже зарегистрированы? <a href="/sign-in" className="register__alredy">Войти</a>
        </p>
      </form>
    </section>
  );
}

export default Register;