import React from 'react';
import {Redirect} from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import Reset from '../../pages/Reset/Reset';
import API from '../../utils/API';

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
            resetUser: {},
            userArray: [],
            message: {},
            teamArray: [],
            invalidEmail: false,
            invalidPassword: false
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
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !email.match(regex) ) {
            this.setState({ invalidEmail: true })
        }
        else if ( password.length < 4 ) {
            this.setState({ invalidPassword: true, invalidEmail: false })
        }
        else {
            this.props.submit(userInfo);
        }

    }
    getResetKey = event => {
        // hits the route to request a reset key by clicking on one of the users... 
        // also resets state for the users
        event.preventDefault();
        let {id} = event.target;
        console.log(id);
        API.getKeyForReset({id: id})
        .then(message => {
            this.setState({
                userArray: [],
                message: message
            })
        });
    }
    getUsers = event => {
        // populates a list below with possible users
        event.preventDefault();
        let {email} = this.state;
        console.log(email);
        API.getUsersForReset({email: email})
        .then(userArray => this.setState({userArray: userArray}));
    }
    submitResetPassword = event => {
        event.preventDefault();
        let {isSamePassword, password} = this.state;
        let {key} = this.props.match.params;
        if (isSamePassword) {
            API.submitResetPassword({password: password}, key)
            .then(message => {
                this.setState({
                    password: "",
                    passwordRepeat: "",
                    isSamePassword: false,
                    userArray: [],
                    resetUser: {},
                    message: message
                });
            });
        }
    }
    getTeamsForSelect = () => {
        fetch("/api/team/select-menu")
        .then(response => {
            return response.json();
        })
        .then(teamArray => {
            this.setState({
                team: teamArray[0].name,
                teamArray: teamArray
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    componentDidMount = () => {
        this.getTeamsForSelect();
        let {params, path} = this.props.match;
        this.props.renderLink(path);
        if (params.key) {
            API.showUserForReset(params.key)
            .then(user => {
                this.setState({
                    resetUser: user
                });
            });
        }
    }
    render() {
        if (this.props.isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        } else if (this.state.message.messageType === "success") {
            return <Redirect to="/" />
        } else {
            if (this.props.action === "login") {
                return (
                    <Login message={this.props.message} handleClick={this.login} handleInputChange={this.handleInputChange} values={this.state}/>
                );
            } else if (this.props.action === "signup") {
                return (
                    <Signup
                      handleCheck={this.handleCheck}
                      handleClick={this.signup}
                      handleInputChange={this.handleInputChange}
                      allowSubmit={this.state.allowSubmit}
                      message={this.state.message}
                      invalidEmail={this.state.invalidEmail}
                      invalidPassword={this.state.invalidPassword}
                      teams={this.state.teamArray}
                    />
                );
            } else {
                return (
                    <Reset
                        message={this.props.message} 
                        resetUser={this.state.resetUser}
                        userArray={this.state.userArray}
                        getUsers={this.getUsers}
                        getResetKey={this.getResetKey}
                        submitResetPassword={this.submitResetPassword}
                        handleInputChange={this.handleInputChange}
                    />
                );
            }
        }
        }
}

export default Auth;