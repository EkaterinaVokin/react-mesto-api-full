import closePath from '../images/close.svg';

export function ImagePopup(props) {
  const {card,onClose,isOpen} = props;

  return (
    <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_dynamic_width">
        <div className="popup__content">
          <button className="popup__button-close" type="button" onClick={onClose}>
            <img className="popup__close" src={closePath} alt="кнопка закрыть" />
          </button>
          {card && <figure className="popup__image">
            <img className="popup__image-item" src={card.link} alt={card.name} />
            <figcaption className="popup__signature">{card.name}</figcaption>
          </figure>}
        </div>
      </div>
    </section>
  )
}