import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useFormValidation from "../../utils/hooks/useFormValidation";
import LinkForm from "../linkForm/LinkForm";

function ChangePassword() {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  const { changePassword } = useContext(AuthContext);
  const match = useParams();
  const history = useHistory();
  const uid = match.Ng;
  const token = match.id;

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  function heandlerSubmit() {
    changePassword({
      uid: uid,
      token: token,
      new_password: values.new_password,
    })
      .then(() => history.push("/sign-in"))
      .catch((error) => console.log("error", error));
  }

  return (
    <LinkForm
      onClick={heandlerSubmit}
      error={!isValid}
      disabled={!isValid}
      buttonName="Сохранить"
    >
      <label className="linkForm__label">
        <h2 className="linkForm__subtitlte">Новый пороль</h2>
        <input
          className="linkForm__input"
          required
          value={values.new_password || ""}
          name="new_password"
          type="password"
          minLength="8"
          placeholder="пароль дожен сотсоять из букв и цифр"
          onChange={handleChangeInput}
        />
        <div
          className={`linkForm__inputHidden ${
            errors.new_password ? "linkForm__inputError" : ""
          }`}
        >
          {errors.new_password}
        </div>
      </label>
      <label className="linkForm__label">
        <h2 className="linkForm__subtitlte">Повторить новый пороль</h2>
        <input
          className="linkForm__input"
          required
          value={values.current_password || ""}
          name="current_password"
          placeholder="повторите пожалуйста пароль"
          type="password"
          minLength="8"
          onChange={handleChangeInput}
        />
        <div
          className={`linkForm__inputHidden ${
            errors.current_password ? "linkForm__inputError" : ""
          }`}
        >
          {errors.current_password}
        </div>
      </label>
    </LinkForm>
  );
}

export default ChangePassword;
