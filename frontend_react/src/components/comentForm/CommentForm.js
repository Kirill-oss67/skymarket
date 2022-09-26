import React, { useState } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";

function CommentForm({ addComment }) {
  const [text, setText] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (text.length > 0) {
      setText("");
    }
  }

  function handeleAddComment(e) {
    e.preventDefault();
    addComment({
      text: values.text,
    });
  }

  return (
    <form className="comment__form" onSubmit={handeleAddComment}>
      <label className="comment-label">
        <h2 className="comment__form-title">Оставьте отзыв</h2>
        <textarea
          value={values.text}
          type="text"
          name="text"
          className="comment__input"
          rows="3"
          minLength="8"
          maxLength="200"
          required="required"
          onChange={handleChangeInput}
        />
        <div className={`input-hidden ${errors.text ? "input-error" : ""}`}>
          {errors.text}
        </div>
      </label>
      <button
        className={`comment__button comment__button-text ${
          !isValid ? "comment__button_disabled" : ""
        }`}
        disabled={!isValid}
        type="submit"
      >
        Отправить
      </button>
      <div className="input-error input-hidden"></div>
    </form>
  );
}

export default CommentForm;
