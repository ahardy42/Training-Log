import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';


const Nav = ({name, handleSignOut, isLoggedIn}) => {
    return (
        <nav className="navbar">
            <span className="navbar-brand mb-0"><h1>Training Log</h1></span>
            <span className="navbar-text">{isLoggedIn ? `Hi ${name}` : null}</span>
            {isLoggedIn ? <Button handleClick={handleSignOut}>Sign Out</Button> : (
                <ul className="nav flex-column">
                    <li className="nav-item"><Link to="/signup">New User?</Link></li>
                    <li className="nav-item"><Link to="/reset">Forgot username or password?</Link></li>
                </ul>
            )}
        </nav>
    )
}

export default Nav;