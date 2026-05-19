import { useEffect } from "react";

function Popup({ isOpen, onClose, name, children, contentClass = "" }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) onClose();
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className={`popup__content ${contentClass}`}>
        <button type="button" className="popup__close" onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

export default Popup;
