import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';


const Nav = ({name, handleSignOut, isLoggedIn}) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Training Log</span>
            <span className="navbar-text">Hi {!name.includes(undefined) ? name : "there"}!</span>
            {isLoggedIn ? <button className="btn btn-success" onClick={handleSignOut}>Sign Out</button> : null}
        </nav>
    )
}

export default Nav;