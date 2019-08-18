import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Signup = ({handleClick, handleInputChange, allowSubmit, invalidEmail, invalidPassword, ...props}) => {
    return (
        <div className="container">
            <form>
                <Input action="text" name="firstName" id="firstName" handleInputChange={handleInputChange}>First Name</Input>
                <Input action="text" name="lastName" id="lastName" handleInputChange={handleInputChange}>Last Name</Input>
                <Input action="email" name="email" id="signupEmail" handleInputChange={handleInputChange}>Email address</Input>
                <Input action="username" name="username" id="signupUsername" handleInputChange={handleInputChange}>enter username</Input>
                <Input action="password" name="password" id="signupPassword" handleInputChange={handleInputChange}>enter your password</Input>
                <Input action="password" name="passwordRepeat" id="confirmPassword" handleInputChange={handleInputChange}>re-enter your password</Input>
                <Input action="select" name="team" id="signupTeam" handleInputChange={handleInputChange}>What team are you on?</Input>
                <Input action="checkbox" name="isCoach" id="isCoach" handleCheck={props.handleCheck}>Are you a coach?</Input>
                {invalidEmail ? <p>Enter correct email.</p> : null}
                {invalidPassword ? <p>Enter a password with than more 4 characters.</p> : null}
                {allowSubmit ? (<Button action="button" id="signup" handleClick={handleClick}>Sign Up!</Button>) : (<Button action="button" isDisabled="disabled" id="signup" handleClick={handleClick}>Sign Up!</Button>)}

            </form>
            <Link to="/login">Already a User?</Link>
            <Link to="/reset">Forgot username or password?</Link>
        </div>
    );
}

export default Signup;