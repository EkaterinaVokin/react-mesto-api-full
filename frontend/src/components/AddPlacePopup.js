import React, { useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { useFormValidator } from '../hooks/useFormValidator.js';

export function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const { values, errors, isValid, handleInputChange, resetForm } = useFormValidator();

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values);
  }

  // при открытии попап очищается форма
  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="new"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__block">
        <input
          className={
            errors.name
              ? 'popup__input popup__input_type_name popup__input_type_error'
              : 'popup__input popup__input_type_name'
          }
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleInputChange}
          value={values.name || ''}
        />
        <span className={errors.name ? 'popup__error popup__error_active' : 'popup__error'}>{errors.name}</span>
      </div>
      <div className="popup__block">
        <input
          className={
            errors.link
              ? 'popup__input popup__input_type_url popup__input_type_error'
              : 'popup__input popup__input_type_url'
          }
          type="url"
          name="link"
          placeholder="ссылка на картинку"
          required
          onChange={handleInputChange}
          value={values.link || ''}
        />
        <span className={errors.link ? 'popup__error popup__error_active' : 'popup__error'}>{errors.link}</span>
      </div>
    </PopupWithForm>
  );
}
