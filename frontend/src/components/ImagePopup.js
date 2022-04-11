import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_img ${ Object.keys(card).length !== 0 ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_img">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;