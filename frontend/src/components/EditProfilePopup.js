import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

 
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, description);
  } 

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" textButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input 
        onChange={handleChangeName}
        required
        minLength="2"
        maxLength="40"
        name="name"
        id="author-name"
        value={name}  
        type="text" 
        placeholder="Имя" 
        className="form-popup__input form-popup__input_type_name"/>
        <span id="author-name-error" className="error"></span>
        <input 
        onChange={handleChangeDescription}
        required 
        value={description}  
        minLength="2"
        maxLength="200"
        name="description"
        id="author-about" 
        type="text" 
        placeholder="О себе"
        className="form-popup__input form-popup__input_type_profession"/>
        <span id="author-about-error" className="error"></span>
    </PopupWithForm>
    );
}

export default EditProfilePopup;