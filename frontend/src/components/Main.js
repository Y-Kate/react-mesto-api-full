import React from 'react';
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main"> 
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
        <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        <div className="profile__info">
          <div className="profile__name-overlay">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__modify" type="button" aria-label="Редактировть профиль" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" aria-label="Добавить профиль" onClick={onAddPlace}></button>
      </section>
      <section className="catalog">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} key={card._id} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        ))}
      </section>
    </main>
  );
}

export default Main;