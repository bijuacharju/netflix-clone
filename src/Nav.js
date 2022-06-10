import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "./assets/logo.png";
import profile_logo from "./assets/profile__logo.png";

function Nav() {
    const [show, handleShow] = useState(false);
    const transtionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", transtionNavBar);
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src={logo} alt="Netflix Logo" />
            <img
                className="nav__avatar"
                src={profile_logo}
                alt="Netflix Logo"
            />
        </div>
    );
}

export default Nav;
