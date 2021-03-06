import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Reset = ({resetMessage, message, getUsers, getResetKey, handleInputChange, resetUser, submitResetPassword, userArray, checkPassword, checkRepeatPassword}) => {
    if (resetUser._id) {
        // if there is a reset user id then display the password reset form
        return(
                <div className="container">
                    {message.messageType ? (
                    <div className={`alert alert-${message.messageType === "error" ? "danger" : "success"}`} role="alert">
                        {message.message}
                    </div>
                ) : (
                    null
                ) }
                <h3>Hi {resetUser.firstName} {resetUser.lastName}</h3>
                <form>
                    <Input action="password" name="password" id="signupPassword" handleInputChange={(event) => handleInputChange(event, checkPassword)}>Enter your new password</Input>
                    <Input action="password" name="passwordRepeat" id="confirmPassword" handleInputChange={(event) => handleInputChange(event, checkRepeatPassword)}>Re-enter your new password</Input>
                    <Button action="submit" id="reset" handleClick={submitResetPassword}>Submit New Password</Button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="container">
                {message.messageType ? (
                    <div className={`alert alert-${message.messageType === "error" ? "danger" : "success"}`} role="alert">
                        {message.message}
                    </div>
                ) : (
                    null
                ) }
                {resetMessage.messageType ? (
                    <div className={`alert alert-${resetMessage.messageType === "error" ? "danger" : "success"}`} role="alert">
                        {resetMessage.message}
                    </div>
                ) : (
                    null
                ) }
                {userArray.length ? 
                 (
                        <ul className="list-group">
                            {userArray.map((user, index) => {
                                return <li className="list-group-item" key={index}>{user.name}<Button action="button" id={user.id} handleClick={getResetKey}>Select</Button></li>
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