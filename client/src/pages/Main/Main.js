import React from 'react';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {}
        }
    }
    componentDidMount() {
        console.log(this.props.match.params);
        if (this.props.match.params) {
            let {key} = this.props.match.params;
            fetch("/email/coach-approval/" + key)
            .then(message => {
                this.setState({
                    message: message
                });
            })
        }
    }
    render() {
        let {message} = this.state;
        return (
            <div className="container">
                {message.messageType ? (
                    <div class={`alert alert-${message.messageType === "error" ? "danger" : "success"}`} role="alert">
                        {message.message}
                    </div>
                ) : (
                    null
                ) }
                <Link to="/login">
                    <Button action="button">Log In!</Button>
                </Link>
                <Link to="/signup">
                    <Button action="button">Sign Up!</Button>
                </Link>
            </div>
        );
    }
    
}

export default Main;