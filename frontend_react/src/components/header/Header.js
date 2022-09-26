import React, { useContext } from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../button/Button";
import asd from "../../images/tear-off-ads.png";
import sandwich from "../../images/sandwich__icon.png";

function Header({ onOpen, logOut }) {
  let location = useLocation().pathname;
  let { user } = useContext(AuthContext);
  return (
    <header className="header">
      {location === "/sign-up" ? (
        <Link className="link" to="/">
          <img className="header__img" src={asd} alt="asd icon" />
        </Link>
      ) : location === "/sign-in" ? (
        <Link className="link" to="/">
          <img className="header__img" src={asd} alt="asd icon" />
        </Link>
      ) : location === "/sign-in/email" ? (
        <Link className="link" to="/">
          <img className="header__img" src={asd} alt="asd icon" />
        </Link>
      ) : location === "/sign-in/email/newpassword" ? (
        <img className="header__img" src={asd} alt="asd icon" />
      ) : user ? (
        <>
          <img className="header__img" src={asd} alt="asd icon" />
          <MediaQuery minWidth={1000}>
            <Button
              logOut={logOut}
              text="Выйти"
              className="button-link button-link__text"
              user={user}
            />
          </MediaQuery>
          <MediaQuery maxWidth={999}>
            <img
              className="header__sandwich"
              src={sandwich}
              alt="sandwich icon"
              onClick={onOpen}
            />
          </MediaQuery>
        </>
      ) : (
        <>
          <Link className="link" to="/" user={user}>
            <img className="header__img" src={asd} alt="asd icon" />
          </Link>
          <Link className="link" to="/sign-in">
            <Button
              user={user}
              text="Войти"
              className="button-link button-link__text"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
