import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordRepeat: "",
            firstName: "",
            lastName: "",
            email: "",
            team: "",
            isCoach: false,
            isSamePassword: false,
            allowSubmit: false,
        }
    }
    handleInputChange = (event) => {
        event.preventDefault();
        const {name, value, id} = event.target;
        this.setState({
            [name]: value
        }, () => {
            if (id === "confirmPassword") {
                this.checkPassword();
            }
            this.allowSubmit();
        });
    }
    checkPassword = () => {
        const {passwordRepeat, password} = this.state;
        console.log("password repeat is", passwordRepeat, "\n password is",password);
        this.setState({            
            isSamePassword: password === passwordRepeat ? true : false
        },() => {
            this.allowSubmit();
        });
    }
    allowSubmit = () => {
        const {username, password, firstName, lastName, email, isSamePassword} = this.state;
        if (username.length 
            && password.length 
            && firstName.length 
            && lastName.length 
            && isSamePassword
            && email.includes("@")) {
            this.setState({
                allowSubmit: true}
            );
        }
    }
    handleClick = (event) => {
        event.preventDefault();
        let {id} = event.target;
        console.log(id);
        const {username, password, email, firstName, lastName, team, isCoach} = this.state;
        if (id === "login") {
            let userInfo = {
                username: username,
                password: password
            }
            this.props.submit(userInfo);
        } else if (id === "signup") {
            let userInfo = {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                team: team,
                type: isCoach ? "Coach" : "Athlete"
            }
            this.props.submit(userInfo);
        } else {

        }
    }
    render() {
        if (this.props.action === "login") {
            return (
                <div className="container">
                    <form>
                        <Input action="username" name="username" id="loginUsername" handleInputChange={this.handleInputChange}>username</Input>
                        <Input action="password" name="password" id="loginPassword" handleInputChange={this.handleInputChange}>password</Input>
                        <Button action="submit" id="login" handleClick={this.handleClick}>Login!</Button>
                    </form>
                    <Link to="/signup">New User?</Link>
                    <Link to="/reset">Forgot username or password?</Link>
                </div>
            );
        } else if (this.props.action === "signup") {
            return (
                <div className="container">
                    <form>
                        <Input action="text" name="firstName" id="firstName" handleInputChange={this.handleInputChange}>First Name</Input>
                        <Input action="text" name="lastName" id="lastName" handleInputChange={this.handleInputChange}>Last Name</Input> 
                        <Input action="email" name="email" id="signupEmail" handleInputChange={this.handleInputChange}>Email address</Input>
                        <Input action="username" name="username" id="signupUsername" handleInputChange={this.handleInputChange}>enter username</Input>
                        <Input action="password" name="password" id="signupPassword" handleInputChange={this.handleInputChange}>enter your password</Input>
                        <Input action="password" name="passwordRepeat" id="confirmPassword" handleInputChange={this.handleInputChange}>re-enter your password</Input>
                        <Input action="select" name="team" id="signupTeam">What team are you on?</Input>
                        <Input action="checkbox" name="isCoach" id="isCoach">Are you a coach?</Input>
                        {this.state.allowSubmit ? (<Button action="button" id="signup" handleClick={this.handleClick}>Sign Up!</Button>) : (<Button action="button" isDisabled="disabled" id="signup" handleClick={this.handleClick}>Sign Up!</Button>)}
                        
                    </form>
                    <Link to="/login">Already a User?</Link>
                    <Link to="/reset">Forgot username or password?</Link>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <form>
                        <Input action="email" name="" id="resetEmail" handleInputChange={this.handleInputChange}>Enter your email address</Input>
                        <Button action="submit" id="reset" handleClick={this.handleClick}>Reset Password</Button>
                    </form>
                </div>
            );
        }
    }
}

export default Auth;