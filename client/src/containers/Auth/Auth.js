import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    rendertype = () => {
        
    }
    render() {
        if (this.props.action === "login") {
            return (
                <div className="container">
                    <form>
                        <Input action="username" usedFor="username"/>
                        <Input action="password" usedFor="password"/>
                        <Button action="submit" route="login"/>
                    </form>
                    <Link to="/signup">New User?</Link>
                    <Link to="/reset">Forgot username or password?</Link>
                </div>
            );
        } else if (this.props.action === "signup") {
            return (
                <div className="container">
                    <form>
                        <Input action="text" usedFor="firstName"/>
                        <Input action="text" usedFor="lastName"/>
                        <Input action="email" usedFor="email"/>
                        <Input action="username" usedFor="username"/>
                        <Input action="password" usedFor="password"/>
                        <Input action="password" usedFor="confirm password"/>
                        <Input action="select" usedFor="team"/>
                        <Input action="check" usedFor="coach"/>
                        <Button action="submit" route="signup"/>
                    </form>
                    <Link to="/login">Already a User?</Link>
                    <Link to="/reset">Forgot username or password?</Link>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <form>
                        <Input action="email" usedFor="email"/>
                        <Button action="submit" route="reset"/>
                    </form>
                </div>
            );
        }
    }
}

export default Auth;