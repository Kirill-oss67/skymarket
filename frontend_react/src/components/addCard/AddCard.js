import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserForm from "../userForm/UserForm";
import Preloader from "../preloader/Preloader";

function AddCard({ id, handleAddAd, isLoading }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    image: null,
    title: null,
    price: null,
    description: null,
  });
  let location = useLocation().pathname;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  function handleTitleChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setTitle(value);

    if (value.length < 8) {
      errors.title = "Минимальное колличество символоа - 8";
    } else {
      errors.title = "" && setValidationErrors(errors);
    }
  }

  function handlePriceChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setPrice(value);

    if (!value.length) {
      errors.price = "Это поле не дожно быть пустым";
    } else {
      errors.price = "" && setValidationErrors(errors);
    }
  }

  function handleDescriptionChange(e) {
    const { value } = e.target;
    let errors = validationErrors;
    setDescription(value);

    if (value.length < 8) {
      errors.description = "Минимальное колличество символоа - 8";
    } else {
      errors.description = "" && setValidationErrors(errors);
    }
  }

  function addNewAd(e) {
    e.preventDefault();
    handleAddAd({ image, title, price, description});
    setTimeout(() => window.location.reload(), 500)
  }

  return (
    <>
      <UserForm
        id={`${location === "/newAd" ? "" : id}`}
        title={`${
          location === "/newAd" ? "Добавить новый товар" : "Изменить товар"
        }`}
        buttonText={`${location === "/newAd" ? "Добавать" : "Изменить"}`}
        onSubmit={addNewAd}
        errors={
          title === null ||
          image === null ||
          price === null ||
          description === null ||
          validationErrors.title ||
          validationErrors.price ||
          validationErrors.description
        }
      >
        <div className="userForm__form-container userForm__form-box">
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Название</h2>
            <input
              className="userForm__input"
              name="title"
              type="text"
              minLength="3"
              maxLength="30"
              onChange={handleTitleChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.title ? "input-error" : ""
              }`}
            >
              {validationErrors.title}
            </div>
          </label>
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Изображение</h2>
            <input
              name="image"
              className="userForm__input"
              type="file"
              onChange={handleImageChange}
            />
            <div
              className={`input-hidden ${image === null ? "input-error" : ""}`}
            >
              {image === null ? "Загрузите фотографию" : ""}
            </div>
          </label>
        </div>
        <div className="userForm__form-container">
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Цена</h2>
            <input
              className="userForm__input"
              type="number"
              name="price"
              minLength="1"
              maxLength="30"
              onChange={handlePriceChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.price ? "input-error" : ""
              }`}
            >
              {validationErrors.price}
            </div>
          </label>
          <label className="userForm__label">
            <h2 className="userForm__subtitle">Описание</h2>
            <input
              className="userForm__input"
              name="description"
              type="text"
              minLength="8"
              maxLength="30"
              onChange={handleDescriptionChange}
            />
            <div
              className={`input-hidden ${
                validationErrors.description ? "input-error" : ""
              }`}
            >
              {validationErrors.description}
            </div>
          </label>
        </div>
      </UserForm>
      {isLoading ? <Preloader /> : ""}
      </>
  );
}

export default AddCard;
