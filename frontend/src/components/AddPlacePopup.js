import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');


  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  function handleChangeCardName(e) {
    setName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm name="add" title="Новое место" textButton="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input 
        required
        onChange={handleChangeCardName}
        minLength="2"
        maxLength="30"
        name="cardName"
        id="card-name" 
        value={name}
        type="text"
        placeholder="Название" 
        className="form-popup__input form-popup__input_type_name-card"/>
        <span id="card-name-error" className="error"></span>
        <input 
        required
        onChange={handleChangeCardLink}
        name="cardLink"
        value={link}
        id="card-link"
        type="url" 
        placeholder="Ссылка на картинку" 
        className="form-popup__input form-popup__input_type_link-card"/>
        <span id="card-link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;