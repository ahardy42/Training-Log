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
    componentWillReceiveProps(newProps) {
        if (newProps.pathName !== this.props.pathName) {
            this.setState({
                pathName: newProps.pathName
            })
        }
    }
    render() {
        let name = `${this.props.user.firstName} ${this.props.user.lastName}`;
        return (
            <Nav type={this.props.user.type} getLink={this.props.getLink} pathName={this.props.pathName} name={name} isLoggedIn={this.props.isLoggedIn} handleSignOut={this.props.signOut}/>
        );
    }
}

export default NavBar;