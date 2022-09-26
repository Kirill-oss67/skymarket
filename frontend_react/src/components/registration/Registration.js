import React, { useState, useContext } from "react";
import Form from "../form/Form";
import AuthContext from "../../context/AuthContext";
import useFormValidation from "../../utils/hooks/useFormValidation";

function Registration() {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  let { register } = useContext(AuthContext);

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  return (
    <Form
      header="Добро пожаловать!"
      onSubmit={register}
      path="/sign-in"
      btn="Зарегистрироваться"
      text="Уже зарегистрированы?&nbsp;"
      link="/sign-in"
      linkTitle="Войти"
      errors={!isValid}
    >
      <>
        <label className="form__label">
          <h2 className="form__description">Имя</h2>
          <input
            required
            value={values.first_name || ""}
            title="Имя"
            name="first_name"
            type="text"
            minLength="3"
            className="form__input"
            maxLength="30"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${
              errors.first_name ? "input-error" : ""
            }`}
          >
            {errors.first_name}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Фамилия</h2>
          <input
            required
            value={values.last_name || ""}
            title="Фамилия"
            name="last_name"
            type="text"
            minLength="3"
            className="form__input"
            maxLength="30"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${
              errors.last_name ? "input-error" : ""
            }`}
          >
            {errors.last_name}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">E-mail</h2>
          <input
            required
            value={values.email || ""}
            name="email"
            type="email"
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            className="form__email form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${
              errors.email ? "input-error" : ""
            }`}
          >
            {errors.email}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Пароль</h2>
          <input
            required
            value={values.password || ""}
            name="password"
            type="password"
            minLength="8"
            placeholder="пароль должен состоять из букв и цифр"
            className="form__password form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${
              errors.password ? "input-error" : ""
            }`}
          >
            {errors.password}
          </div>
        </label>
        <label className="form__label">
          <h2 className="form__description">Телефон</h2>
          <input
            required
            value={values.phone || ""}
            title="Телефон"
            type="tel"
            name="phone"
            pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
            placeholder="+7(___)___-__-__"
            className="form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`input-hidden ${
              errors.phone ? "input-error" : ""
            }`}
          >
            {errors.phone}
          </div>
        </label>
      </>
    </Form>
  );
}

export default Registration;
