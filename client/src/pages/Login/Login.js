import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Login = ({handleInputChange, handleClick}) => {
    return (
        <div className="container">
            <form>
                <Input action="username" name="username" id="loginUsername" handleInputChange={handleInputChange}>username</Input>
                <Input action="password" name="password" id="loginPassword" handleInputChange={handleInputChange}>password</Input>
                <Button action="submit" id="login" handleClick={handleClick}>Login!</Button>
            </form>
            <Link to="/signup">New User?</Link>
            <Link to="/reset">Forgot username or password?</Link>
        </div>
    );
}

export default Login;