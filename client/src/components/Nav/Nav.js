import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';


const Nav = ({name, handleSignOut, isLoggedIn, pathName, type}) => {
    const renderLinks = () => {
        switch (pathName) {
            case "/login":
                return (
                    <>
                        <li className="nav-item"><Link to="/signup">Sign Up!</Link></li>
                        <li className="nav-item"><Link to="/reset">Forgot password?</Link></li>
                    </>
                )
            case "/signup":
                return (
                    <>
                        <li className="nav-item"><Link to="/login">Login!</Link></li>
                        <li className="nav-item"><Link to="/reset">Forgot password?</Link></li>
                    </>
                );
            default:
                return(
                    <>
                        <li className="nav-item"><Link to="/login">Login!</Link></li>
                        <li className="nav-item"><Link to="/signup">Sign Up!</Link></li>
                    </>
                );
        }
    }
    return (
        <nav className="navbar">
            <span className="navbar-brand mb-0"><h1>Stoked On Training!{type ? " |" : ""} <em style={{fontSize: "0.8em"}}>{type}</em></h1></span>
            <span className="navbar-text">{isLoggedIn ? `Hi ${name}` : null}</span>
            {isLoggedIn ? <Button handleClick={handleSignOut}>Sign Out</Button> : (
                <ul className="nav flex-column">
                    {renderLinks()}
                </ul>
            )}
        </nav>
    )
}

export default Nav;