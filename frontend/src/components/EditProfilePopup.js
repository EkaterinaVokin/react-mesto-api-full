import React, { useEffect ,useContext} from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useFormValidator } from '../hooks/useFormValidator.js';


export function EditProfilePopup(props) {

  const {isOpen,onClose,onUpdateUser,isLoading} = props;

  const {values,errors,isValid,handleInputChange,resetForm} = useFormValidator();

  const {currentUser} = useContext(CurrentUserContext); // подписываемся на контекст и получаем значение контекста (объект текущего пользователя)

  useEffect(() => { // при открытии попап данные пользователя были записаны в инпутах которые пришли с сервера
    if (isOpen) {
      resetForm({
        initials: currentUser.name,
        profession: currentUser.about,
      });
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ // Передаём значения управляемых компонентов во внешний обработчик
      name: values.initials,
      about: values.profession
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__block">
        <input
          className={errors.initials ? 'popup__input popup__input_type_initial popup__input_type_error' : 'popup__input popup__input_type_initial'}
          type="text"
          name="initials"
          placeholder="имя пользователя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleInputChange}
          value={values.initials || ''}
        />
        <span className={errors.initials ? 'popup__error popup__error_active' : 'popup__error'}>{errors.initials}</span>
      </div>
      <div className="popup__block">
        <input
          className={errors.profession ? 'popup__input popup__input_type_profession popup__input_type_error' : 'popup__input popup__input_type_profession'}
          type="text"
          name="profession"
          placeholder="должность"
          minLength="2"
          maxLength="200"
          required
          onChange={handleInputChange}
          value={values.profession || ''}
        />
        <span className={errors.profession ? 'popup__error popup__error_active' : 'popup__error'}>{errors.profession}</span>
      </div>
    </PopupWithForm>
  );
}
