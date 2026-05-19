import Popup from "./Popup.jsx";

function ImagePopup({ card, onClose }) {
  return (
    <Popup
      name="image"
      isOpen={!!card}
      onClose={onClose}
      contentClass="popup__content_content_image"
    >
      {card && (
        <>
          <img src={card.link} alt={card.name} className="popup__image" />
          <p className="popup__caption">{card.name}</p>
        </>
      )}
    </Popup>
  );
}

export default ImagePopup;
