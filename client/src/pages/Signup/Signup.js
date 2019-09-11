import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Signup.sass';


const Signup = ({coachMessage, message, handleClick, handleInputChange, allowSubmit, invalidEmail, invalidPassword, invalidUsername, repeatUsername, ...props}) => {

    return (
        <div className="container signup">
            {coachMessage.messageType ? (
                <div class={`alert alert-${coachMessage.messageType === "error" ? "danger" : "success"}`} role="alert">
                    {coachMessage.message}
                </div>
            ) : (
                null
            ) }
            <div className="row">
                <div className="col">
                    <h2>Sign Up for Training Log</h2>
                </div>
            </div>
            <form className="signup-form">
                <div className="form-row">
                    <div className="col-md-6 col-sm-12 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <Input
                                    action="username"
                                    name="username"
                                    id="signupUsername"
                                    handleInputChange={handleInputChange}
                                    validationFunction={props.checkUsername}
                                >
                                    enter username
                                </Input>
                                {invalidUsername ? <p className="signup-error">Enter a username with no spaces!</p> : null}
                                {repeatUsername ? <p className="signup-error">Username taken! Choose a different one</p> : null}
                                <Input
                                    action="password"
                                    name="password"
                                    id="signupPassword"
                                    handleInputChange={handleInputChange}
                                    validationFunction={props.checkPassword}
                                >
                                    enter your password
                                </Input>
                                {invalidPassword ? <p className="signup-error">Enter a password with at least 4 characters.</p> : null}
                                <Input
                                    action="password"
                                    name="passwordRepeat"
                                    id="confirmPassword"
                                    handleInputChange={handleInputChange}
                                    validationFunction={props.checkRepeatPassword}
                                >
                                    re-enter your password
                                </Input>
                                {!props.isSamePassword ? <p className="signup-error">Passwords must be the same!</p> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <Input action="text" name="firstName" id="firstName" handleInputChange={handleInputChange} validationFunction={props.checkFirstName}>First Name</Input>
                                {props.invalidFirstName ? <p className="signup-error">You must enter a first name!</p> : null}
                                <Input action="text" name="lastName" id="lastName" handleInputChange={handleInputChange}>Last Name</Input>
                                <Input action="email" name="email" id="signupEmail" handleInputChange={handleInputChange} validationFunction={props.checkEmail}>Email address</Input>
                                {invalidEmail ? <p className="signup-error">Enter valid email.</p> : null}
                            </div>
                        </div>
                    </div>
                </div>   
                <div className="form-row mt-2">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body signup-bottom-form">
                                <Input teams={props.teams} action="select" name="team" id="signupTeam" handleInputChange={handleInputChange}>What team are you on?</Input>
                                <Input action="checkbox" name="isCoach" id="isCoach" handleCheck={props.handleCheck}>Are you a coach?</Input>
                                <Button action="button" extraClasses="signup-button" id="signup" handleClick={handleClick}>Sign Up!</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;