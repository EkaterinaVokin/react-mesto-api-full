import closePath from '../images/close.svg';

export function PopupWithForm(props) {
  const { title, name, children, isOpen, onClose, buttonText, onSubmit, isValid } = props;

  // функция проверяет если поле валидно разблокировать кнопку , если нет значит заблокировать кнопку
  const getButton = () => {
    if (isValid) {
      return (
        <button className="popup__button" type="submit">
          {buttonText}
        </button>
      );
    }
    return (
      <button className="popup__button popup__button_disabled" type="submit" disabled>
        {buttonText}
      </button>
    );
  };

  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__content">
          <button className="popup__button-close" type="button" onClick={onClose}>
            <img className="popup__close" src={closePath} alt="кнопка закрыть" />
          </button>
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__form popup__form_type_${name}`}
            action="#"
            name={`popup-form-${name}`}
            noValidate
            onSubmit={onSubmit}
          >
            {children}
            {getButton()}
          </form>
        </div>
      </div>
    </section>
  );
}
