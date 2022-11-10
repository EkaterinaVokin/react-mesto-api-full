import yes from '../images/yes.svg';
import no from '../images/no.svg';
import closePath from '../images/close.svg';

export function InfoTooltip(props) {
  const { error, isOpen, onClose } = props;

  const imagePath = error ? no : yes;
  const imageText = error ? 'Ошибка' : 'Успех';
  const title = error ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!';

  return (
    <section className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <div className="popup__content">
          <button className="popup__button-close" type="button" onClick={onClose}>
            <img className="popup__close" src={closePath} alt="кнопка закрыть" />
          </button>
          <figure className="popup__tooltip">
            <img className="popup__tooltip-item" src={imagePath} alt={imageText} />
            <figcaption className="popup__tooltip-signature">{title}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
