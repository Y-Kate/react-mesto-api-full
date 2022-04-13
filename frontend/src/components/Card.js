import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(id => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked && 'card__button-like_active'}`
  );  

  function handleClickImage() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClickDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClickImage}/>
      {isOwn && <button type="button" className="card__button-trash" aria-label="Корзина" onClick={handleClickDelete}></button>}
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} aria-label="Нравится" onClick={handleLikeClick}></button>
          <p className="card__counter-like">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
