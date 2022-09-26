import React from "react";
import Navigation from "../navigation/Navigation";
import Button from "../button/Button";

function PopupNavigation(props) {
  return (
    <div
      className={`popupNavigation popup ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popupNavigation__container">
        <button
          onClick={props.onClose}
          className="popupNavigation__close-button close-button"
        ></button>
        <Navigation onClose={props.onClose}/>
        <Button onClose={props.onClose} logOut={props.logOut} className="button button__text" text="Выйти"/>
      </div>
    </div>
  );
}

export default PopupNavigation;
