import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Navigation({ onClose, user }) {
  let location = useLocation().pathname;
  return (
    <ul className="navigation" onClick={onClose}>
      <NavLink
        to="/"
        user={user}
        className={`navigation__link ${location === "/" ? "activeLink" : null}`}
      >
        <li>
          <h2 className="navigation__text">Главная</h2>
        </li>
      </NavLink>
      <NavLink
        to="/profile"
        className={`navigation__link ${
          location === "/profile" ? "activeLink" : null
        }`}
        onClick={onClose}
      >
        <li>
          <h2 className="navigation__text">Профиль</h2>
        </li>
      </NavLink>
    </ul>
  );
}

export default Navigation;
