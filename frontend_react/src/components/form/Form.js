import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Form(props) {
  let location = useLocation().pathname;
  return (
    <main className="form">
      <h1 className="form__title">{props.header}</h1>
      <div className="form__container">
        <form className="form__box" onSubmit={props.onSubmit}>
          {props.children}
          <button
            type="submit"
            className={`form__button form__button-text ${
              props.errors ? "form__button_disabled" : null
            }`}
          >
            {props.btn}
          </button>
        </form>
        <div className="form__route-container">
          <h2 className="form__question">
            {props.text}&nbsp;
            <Link
              to={props.link}
              className={
                location === "/sign-in" ? "form__link_purple" : "form__link"
              }
            >
              {props.linkTitle}
            </Link>
          </h2>
          {location === "/sign-in" ? (
            <Link to="/sign-in/email" className="form__link">
              <p className="form__question form__link form__margin">
                {props.newPassword}
              </p>
              <div className="input-error input-hidden"></div>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}

export default Form;
