import React from 'react';

function PopupWithForm({name, isOpen, title, children, textButton, onClose, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}` } onClick={onClose}> 
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form className="form-popup" name={name} noValidate onSubmit={onSubmit}>
          <h3 className="form-popup__title">{title}</h3>
          {children}
          <button type="submit" className="form-popup__button-save" aria-label={textButton}>{textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
