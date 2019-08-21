import React from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Signup.sass';

const Signup = ({handleClick, handleInputChange, allowSubmit, message, ...props}) => {
    return (
        <div className="container signup">
            {message.messageType ? (
                <div class={`alert alert-${message.messageType === "error" ? "danger" : "success"}`} role="alert">
                    {message.message}
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
                                <Input action="username" name="username" id="signupUsername" handleInputChange={handleInputChange}>enter username</Input>
                                <Input action="password" name="password" id="signupPassword" handleInputChange={handleInputChange}>enter your password</Input>
                                <Input action="password" name="passwordRepeat" id="confirmPassword" handleInputChange={handleInputChange}>re-enter your password</Input>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <Input action="text" name="firstName" id="firstName" handleInputChange={handleInputChange}>First Name</Input>
                                <Input action="text" name="lastName" id="lastName" handleInputChange={handleInputChange}>Last Name</Input>
                                <Input action="email" name="email" id="signupEmail" handleInputChange={handleInputChange}>Email address</Input>
                            </div>
                        </div>
                    </div>
                </div>   
                <div className="form-row mt-2">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body signup-bottom-form">
                                <Input action="select" name="team" id="signupTeam" handleInputChange={handleInputChange}>What team are you on?</Input>
                                <Input action="checkbox" name="isCoach" id="isCoach" handleCheck={props.handleCheck}>Are you a coach?</Input>
                                {allowSubmit ?
                                    (<Button action="button" extraClasses="signup-button" id="signup" handleClick={handleClick}>Sign Up!</Button>)
                                    :
                                    (<Button action="button" extraClasses="signup-button disabled" id="signup" handleClick={handleClick}>Sign Up!</Button>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;