import Popup from "./Popup.jsx";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitButtonText,
  isSubmitDisabled,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h3 className="popup__title">{title}</h3>
      <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          className={`button popup__button ${isSubmitDisabled ? "popup__button_disabled" : ""}`}
          disabled={isSubmitDisabled}
        >
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
