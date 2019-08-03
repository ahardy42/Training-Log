import React from 'react';
import Nav from '../../components/Nav/Nav';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn
        }
    }
    componentDidMount() {
       this.setState({
           isLoggedIn: this.props.isLoggedIn
       });
    }
    handleClick = () => {

    }
    render() {
        let name = `${this.props.user.firstName} ${this.props.user.lastName}`;
        return (
            <Nav name={name} isLoggedIn={this.props.isLoggedIn} handleSignOut={this.props.signOut}/>
        );
    }
}

export default NavBar;