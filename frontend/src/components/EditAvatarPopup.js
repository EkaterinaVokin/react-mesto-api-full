import React, { useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { useFormValidator } from '../hooks/useFormValidator.js';

export function EditAvatarPopup(props) {
  
  const { isOpen, onClose, onUpdateAvatar,isLoading } = props;

  const {values,errors,isValid,handleInputChange,resetForm} = useFormValidator();

  // при открытии попап очищается форма
  useEffect(() => { 
    resetForm();
  },[resetForm,isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ 
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__block">
        <input
          className={errors.avatar ? 'popup__input popup__input_type_url popup__input_type_error' : 'popup__input popup__input_type_url'}
          type="url"
          name="avatar"
          placeholder="ссылка на аватарку"
          value={values.avatar || ''}
          onChange={handleInputChange}
          required
        />
        <span className={errors.avatar ? 'popup__error popup__error_active' : 'popup__error'}>{errors.avatar}</span>
      </div>
    </PopupWithForm>
  );
}
