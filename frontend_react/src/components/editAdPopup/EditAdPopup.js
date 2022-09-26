import React, { useState, useEffect } from "react";
import UserForm from "../userForm/UserForm";
import useFormValidation from "../../utils/hooks/useFormValidation";

function EditAdPopup({ isEditPopupOpen, onClose, handleEditAdd, id, ad }) {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid, setValues } =
    useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  function editAdd(e) {
    e.preventDefault();
    handleEditAdd({
      title: values.title,
      price: values.price,
      description: values.description,
    });
  }

  useEffect(() => {
    setValues(ad);
  }, [ad, setValues]);

  return (
    <div
      className={`popup ${isEditPopupOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="close-button close-button_form"
        ></button>
        <UserForm
          id={id}
          title="Изменить товар"
          onSubmit={editAdd}
          buttonText="Изменить"
          errors={!isValid}
        >
          <label className="comment-label">
            <h2 className="userForm__subtitle">Название</h2>
            <input
              className="userForm__input"
              value={values.title || ""}
              name="title"
              required
              type="text"
              minLength="3"
              maxLength="30"
              onChange={handleChangeInput}
            />
            <div
              className={`input-hidden ${
                errors.title ? "input-error" : ""
              }`}
            >
              {errors.title}
            </div>
          </label>
            <label className="comment-label">
              <h2 className="userForm__subtitle">Цена</h2>
              <input
                className="userForm__input"
                type="number"
                value={values.price || ""}
                name="price"
                required
                minLength="1"
                maxLength="30"
                onChange={handleChangeInput}
              />
              <div
                className={`input-hidden ${
                  errors.price ? "input-error" : ""
                }`}
              >
                {errors.price}
              </div>
            </label>
            <label className="comment-label">
              <h2 className="userForm__subtitle">Описание</h2>
              <input
                className="userForm__input"
                name="description"
                value={values.description || ""}
                type="text"
                minLength="8"
                maxLength="50"
                required
                onChange={handleChangeInput}
              />
              <div
                className={`input-hidden ${
                  errors.description ? "input-error" : ""
                }`}
              >
                {errors.description}
              </div>
            </label>
        </UserForm>
      </div>
    </div>
  );
}

export default EditAdPopup;
