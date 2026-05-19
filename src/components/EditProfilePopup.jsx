import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useFormWithValidation } from "../hooks/useFormWithValidation.js";

function EditProfilePopup({ isOpen, onClose, currentUser, onUpdateUser, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    name: "",
    about: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm(
        { name: currentUser.name || "", about: currentUser.about || "" },
        {},
        true
      );
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? "Сохранение..." : "Сохранить"}
      isSubmitDisabled={!isValid}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="user-name"
          className={`popup__input popup__input_type_name ${errors.name ? "popup__input_type_error" : ""}`}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-ЯёЁ\s\-]+"
          data-error-message="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
          value={values.name}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.name ? "popup__error_visible" : ""}`}
          id="user-name-error"
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="about"
          id="user-description"
          className={`popup__input popup__input_type_description ${errors.about ? "popup__input_type_error" : ""}`}
          placeholder="Занятие"
          required
          minLength="2"
          maxLength="200"
          value={values.about}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.about ? "popup__error_visible" : ""}`}
          id="user-description-error"
        >
          {errors.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
