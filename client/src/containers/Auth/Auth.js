import React from 'react';
import {Redirect} from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Reset from '../../pages/Reset/Reset';

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
            team: "unattached",
            isCoach: false,
            isSamePassword: false,
            allowSubmit: false
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
    handleCheck = (event) => {
        const {checked, name} = event.target;
        this.setState({
            [name]: checked
        });
    }
    checkPassword = () => {
        const {passwordRepeat, password} = this.state;
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
    login = event => {
        event.preventDefault();
        const {username, password} = this.state;
        let userInfo = {
            username: username,
            password: password
        }
        this.props.submit(userInfo);
    }
    signup = event => {
        event.preventDefault();
        const { username, password, email, firstName, lastName, team, isCoach } = this.state;
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
    }
    reset = event => {
        // need to setup mailer route
    }
    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        } else {
            if (this.props.action === "login") {
                return (
                    <Login handleClick={this.login} handleInputChange={this.handleInputChange} values={this.state}/>
                );
            } else if (this.props.action === "signup") {
                return (
                    <Signup handleCheck={this.handleCheck} handleClick={this.signup} handleInputChange={this.handleInputChange} allowSubmit={this.state.allowSubmit}/>
                );
            } else {
                return (
                    <Reset handleClick={this.reset} handleInputChange={this.handleInputChange}/>
                );
            }
        }
        }
}

export default Auth;