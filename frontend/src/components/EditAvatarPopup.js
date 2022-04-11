import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarPopup = React.useRef();

  React.useEffect(() => {
    avatarPopup.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarPopup.current.value);
  } 

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" textButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input 
          ref={avatarPopup}
          required
          name="avatarLink"
          id="avatar-link"
          type="url"
          placeholder="Ссылка на аватар" 
          className="form-popup__input form-popup__input_type_link-card"/>
          <span id="avatar-link-error" className="error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;