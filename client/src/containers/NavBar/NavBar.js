import React from 'react';
import Nav from '../../components/Nav/Nav';
import './Navbar.sass'

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
    render() {
        let name = `${this.props.user.firstName} ${this.props.user.lastName}`;
        return (
            <Nav type={this.props.user.type} pathName={this.props.match.url} name={name} isLoggedIn={this.props.isLoggedIn} handleSignOut={this.props.signOut}/>
        );
    }
}

export default NavBar;