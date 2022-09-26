import React from "react";

function LinkForm(props) {
  return (
    <main className="linkForm">
      <form className="linkForm__form">{props.children}</form>
      <button
        onClick={props.onClick}
        className={`linkForm__button ${
          props.error ? "linkForm__button-disabled" : ""
        }`}
        disabled={props.disabled}
        type="submit"
      >
        {props.buttonName}
      </button>
      <div className="linkForm__inputHidden linkForm__inputError"></div>
    </main>
  );
}

export default LinkForm;
