import { useState } from "react";

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value } = input;

    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage || "");
    } else {
      input.setCustomValidity("");
    }

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: input.validationMessage }));
    setIsValid(input.closest("form").checkValidity());
  };

  const resetForm = (newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  };

  return { values, handleChange, errors, isValid, resetForm };
}
