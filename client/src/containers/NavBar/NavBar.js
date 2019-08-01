import React from 'react';
import Nav from '../../components/Nav/Nav';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }
    componentDidMount() {
       // eventually I will get the weather forecast and display it up here 
    }
    render() {
        return (
            <Nav name={this.state.name}/>
        );
    }
}

export default NavBar;