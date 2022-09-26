import React from "react";
import { useLocation } from "react-router-dom";

function UserForm(props) {
  let location = useLocation().pathname;

  return (
    <div
      className={
        props.className || location === `/ads/${props.id}`
          ? "userForm-editPopup"
          : location === "/profile"
          ? "userForm-profile userProfile-area"
          : "userForm-profile padding"
      }
    >
      <h1 className="userForm__title">
        {props.title}
        <span className="userForm__margin"> {props.userName}</span>
      </h1>
      <form
        name="form-data"
        className="userForm__form"
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button
          type="submit"
          className={`userForm__button userForm__button-text ${ location === "/profile" ? "userForm__button-margin" :
            props.errors ? "userForm__button_disabled" : ""
          }`}
          disabled={props.disabled}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
