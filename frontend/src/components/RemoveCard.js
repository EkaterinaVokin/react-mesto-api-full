import React from 'react';
import closePath from '../images/close.svg';

export function RemoveCard(props) {
  
  const {onClose,title,buttonText,isOpen,onDelete} = props;

  return (
    <section className={`popup popup_type_remove ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__content">
          <button className="popup__button-close" type="button" onClick={onClose}>
            <img className="popup__close" src={closePath} alt="кнопка закрыть" />
          </button>
          <h2 className="popup__title popup__title_margin_bottom">{title}</h2>
          <button className="popup__button popup__button_type_remove" type="button" onClick={onDelete}>{buttonText}</button>
        </div>
      </div>
    </section>
  )
}