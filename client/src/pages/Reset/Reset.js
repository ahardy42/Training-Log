import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Reset = ({handleClick, handleInputChange}) => {
    return (
        <div className="container">
            <form>
                <Input action="email" name="" id="resetEmail" handleInputChange={handleInputChange}>Enter your email address</Input>
                <Button action="submit" id="reset" handleClick={handleClick}>Reset Password</Button>
            </form>
        </div>
    );
}

export default Reset;