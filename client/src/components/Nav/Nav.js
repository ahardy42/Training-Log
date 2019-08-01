import React from 'react';

const Nav = props => {
    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Training Log</span>
            <span className="navbar-text">Hi {props.name || "there"}!</span>
        </nav>
    )
}

export default Nav;