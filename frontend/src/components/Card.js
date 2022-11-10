import buttonRemove from '../images/btn-remove.svg';
import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Card(props) {
  const { card, onCardClick,onCardLike,onCardDelete} = props; // получаем карточку и обрабчик

  const {currentUser: user} = useContext(CurrentUserContext); // подписываемся на контекст и получаем значение контекста (объект текущего пользователя)

  const isOwn = card.owner._id === user._id; // Определяем, являемся ли мы владельцем текущей карточки
 
  const isLiked = card.likes.some((like) => {
    // проверяем, есть ли уже лайк на этой карточке
    return like._id === user._id;
  });

  const cardRemoveButtonClassName = ( // Создаём переменную, которую после зададим в `className` для кнопки удаления
    `element__button-remove ${isOwn ? 'element__button-remove_display_block' : 'element__button-remove_display_none'}`
  );

  function handleClick() { // при клике на карточку обработчик передает карточку
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card, isLiked); // при клике на кнопку "лайк" обработчик передает карточку
  }

  function handleDeleteClick() {
    onCardDelete(card); // при клике на кнопку "удалить" обработчик передает карточку
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button className={cardRemoveButtonClassName} type="button" onClick={handleDeleteClick}>
        <img src={buttonRemove} alt="button_remove" />
      </button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className={`element__button element__button_hover ${isLiked ? 'element__button_active' : ''}`} type="button" onClick={handleLikeClick}></button>
          <span className="element__number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
