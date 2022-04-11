import React from 'react';
import { Route, useHistory} from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({userEmail, onLogout}) {
  
  const history = useHistory();

  function handleClickLogin () {
    history.push('/sign-in');
  }

  function handleClickRegister () {
    history.push('/sign-up');
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="logo header__logo"/>
      <Route path="/sign-up">
        <button className="header__button" onClick={handleClickLogin}>Войти</button>
      </Route>
      <Route path="/sign-in">
        <button className="header__button" onClick={handleClickRegister}>Регистрация</button>
      </Route>
      <Route exact path="/">
      <div className="header__profile" >
        <p className="header__user-email">{userEmail}</p>
        <button className="header__button header__button_color_grey" onClick={onLogout}>Выйти</button>
      </div>
      </Route>
    </header>
  );
}

export default Header;
