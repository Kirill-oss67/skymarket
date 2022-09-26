import React, { useState } from "react";
import UserForm from "../userForm/UserForm";
import useFormValidation from "../../utils/hooks/useFormValidation";

function EditPhotoAdPopup({ isOpen, onClose, handleEdit, id }) {
  const [image, setImage] = useState(null);
  const { handleChange, errors, isValid } = useFormValidation();

  const handleImageChange = (e) => {
    handleChange(e);
    setImage(e.target.files[0]);
  };

  function editPhotoAdd(e) {
    e.preventDefault();
    handleEdit(image);
    setTimeout(() => window.location.reload(), 700);
  }

  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container-comment">
        <button
          onClick={onClose}
          className="close-button close-button_form"
        ></button>
        <UserForm
          id={id}
          title="Изменить"
          onSubmit={editPhotoAdd}
          buttonText="Изменить"
          errors={!isValid}
        >
          <label className="userForm__label userForm__label-comment">
            <h2 className="userForm__subtitle">Фотография</h2>
            <input
              className="userForm__input"
              name="image"
              required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              className={`input-hidden ${errors.title ? "input-error" : ""}`}
            >
              {errors.title}
            </div>
          </label>
        </UserForm>
      </div>
    </div>
  );
}

export default EditPhotoAdPopup;
