import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.list}>
          <li className={style.item}>
            <NavLink className={style.link} to="/">
              Todo
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink className={style.link} to="/signin">
              Sign In
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink  className={style.link} to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;