import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Alert from '../../components/Alert/Alert';
import './Login.sass';

const Login = ({handleInputChange, handleClick, message}) => {
    return (
        <div className="container login">
            {message.messageType ? <Alert messageType={message.messageType}>{message.messageText}</Alert> : null}
           <div className="card">
                <div className="card-body">
                <h3 className="card-title text-center mb-5">Login to view your training</h3>
                    <form className="login-form">
                        <Input action="username" name="username" id="loginUsername" handleInputChange={handleInputChange}>username</Input>
                        <Input action="password" name="password" id="loginPassword" handleInputChange={handleInputChange}>password</Input>
                        <Button action="submit" id="login" extraClasses="login-button" handleClick={handleClick}>Login!</Button>
                    </form>
                </div>
           </div>
        </div>
    );
}

export default Login;