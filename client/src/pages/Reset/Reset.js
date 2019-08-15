import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Reset = ({getUsers, handleInputChange, resetUser, handleSubmit}) => {
    if (resetUser.id) {
        // if there is a reset user id prop this means 
        return(
            <div className="container">
                <h3>Hi {resetUser.firstName} {resetUser.lastName}</h3>
                <form>
                    <Input action="password" name="password" id="signupPassword" handleInputChange={handleInputChange}>Enter your new password</Input>
                    <Input action="password" name="passwordRepeat" id="confirmPassword" handleInputChange={handleInputChange}>Re-enter your new password</Input>
                    <Button action="submit" id="reset" handleClick={handleSubmit}>Submit New Password</Button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="container">
                <form>
                    <Input action="email" name="" id="resetEmail" handleInputChange={handleInputChange}>Enter your email address</Input>
                    <Button action="submit" id="reset" handleClick={getUsers}>Reset Password</Button>
                </form>
            </div>
        );
    }
}

export default Reset;