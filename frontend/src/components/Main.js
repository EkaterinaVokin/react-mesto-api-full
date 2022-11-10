import vectorAvatar from '../images/vector_avatar.svg';
import buttonPen from '../images/button__pen.svg';
import buttonPlus from '../images/button__plus.svg';
import React, { useContext } from 'react';
import { Card } from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick,cards ,onCardLike,onCardDelete} = props;

  const {currentUser} = useContext(CurrentUserContext); // подписываемся на контекст и получаем значение контекста (объект текущего пользователя)

  return (
    <main className="container">
      <section className="profile page__profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" alt="Аватарка" src={currentUser.avatar} />
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar-icon" src={vectorAvatar} alt="ручка" />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__info-column">
            <h1 className="profile__info-initials">{currentUser.name}</h1>
            <button className="profile__button-pen" type="button" onClick={onEditProfile}>
              <img src={buttonPen} alt="кнопка редактировать" />
            </button>
          </div>
          <p className="profile__info-profession">{currentUser.about}</p>
        </div>
        <button className="profile__button-plus" type="button" onClick={onAddPlace}>
          <img src={buttonPlus} alt="кнопка добавить" />
        </button>
      </section>
      <section className="elements page__elements" aria-label="Блок с картинками">
        {cards.map((card) => ( // перебираем массив карточек
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            /> // использование компонента и передаем карточку и 3 обработчика(клик на картинку,клик на лайк и клик на кнопку 'удалить')
          )
        )}
      </section>
    </main>
  );
}
