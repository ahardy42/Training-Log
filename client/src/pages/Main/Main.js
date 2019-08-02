import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';


const Main = (props) => {
    return (
        <div className="container">
            <Link to="/login">
                <Button action="button">Log In!</Button>
            </Link>
            <Link to="/signup">
                <Button action="button">Sign Up!</Button>
            </Link>
        </div>
    );
}

export default Main;