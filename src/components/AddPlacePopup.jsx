import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useFormWithValidation } from "../hooks/useFormWithValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    name: "",
    link: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({ name: "", link: "" }, {}, false);
    }
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name: values.name, link: values.link });
  };

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? "Создание..." : "Создать"}
      isSubmitDisabled={!isValid}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="place-name"
          className={`popup__input popup__input_type_card-name ${errors.name ? "popup__input_type_error" : ""}`}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
          data-error-message="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
          value={values.name}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.name ? "popup__error_visible" : ""}`}
          id="place-name-error"
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="link"
          id="place-link"
          className={`popup__input popup__input_type_url ${errors.link ? "popup__input_type_error" : ""}`}
          placeholder="Ссылка на картинку"
          required
          value={values.link}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.link ? "popup__error_visible" : ""}`}
          id="place-link-error"
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
