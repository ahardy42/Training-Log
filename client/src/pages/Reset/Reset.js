import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Reset = ({getUsers, handleInputChange, resetUser, handleSubmit, userArray}) => {
    if (resetUser._id) {
        // if there is a reset user id then display the password reset form
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
                {userArray.length ? 
                 (
                        <ul className="list-group">
                            {userArray.map((user, index) => {
                                return <li className="list-group-item" key={index}>{user.name}<Button action="button" id={user._id}>Select</Button></li>
                            })}
                        </ul>
                 ) : 
                 (
                        <form>
                            <Input action="email" name="email" id="resetEmail" handleInputChange={handleInputChange}>Enter your email address</Input>
                            <Button action="submit" id="reset" handleClick={getUsers}>Find Users</Button>
                        </form>
                )
                }
            </div>
        );
    }
}

export default Reset;