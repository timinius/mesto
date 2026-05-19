import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useFormWithValidation } from "../hooks/useFormWithValidation.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({ avatar: "" }, {}, false);
    }
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: values.avatar });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={isLoading ? "Сохранение..." : "Сохранить"}
      isSubmitDisabled={!isValid}
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="user-avatar"
          className={`popup__input popup__input_type_avatar ${errors.avatar ? "popup__input_type_error" : ""}`}
          placeholder="Ссылка на изображение"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span
          className={`popup__error ${errors.avatar ? "popup__error_visible" : ""}`}
          id="user-avatar-error"
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
