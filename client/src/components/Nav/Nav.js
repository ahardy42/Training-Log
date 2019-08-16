import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';


const Nav = ({name, handleSignOut, isLoggedIn}) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Training Log</span>
            <span className="navbar-text">{!name.includes(undefined) ? `Hi ${name}` : "Welcome to Training Log"}!</span>
            {isLoggedIn ? <button className="btn btn-success" onClick={handleSignOut}>Sign Out</button> : (
                <ul className="nav flex-column">
                    <li className="nav-item"><Link to="/signup">New User?</Link></li>
                    <li className="nav-item"><Link to="/reset">Forgot username or password?</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Nav;