import React from 'react';
import './App.css';
import NavBar from './containers/NavBar/NavBar';
import Main from './pages/Main/Main';
import Athlete from './pages/Athlete/Athlete';
import Coach from './pages/Coach/Coach';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }
  login = (user) => {
    fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(user => {
      this.setState({
        isLoggedIn: true,
        user: user
      });
    }, () => {
      window.location("/");
    });
  }
  signup = (newUser) => {
    fetch("/auth/signup", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      return response.json();
    })
    .then(user => {
      this.setState({
        user: user
      });
    });
  }
  renderLandingPage = (props) => {
    let {isLoggedIn, user} = this.state;
    if (isLoggedIn && user.type === "Athlete") {
      return <Athlete {...props} athlete={user}/>
    } else if (isLoggedIn && user.type === "Coach") {
      return <Coach {...props} coach={user}/>
    } else {
      return <Main {...props} />
    }
  }
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" render={(props) => this.renderLandingPage(props)}/>
          <Route exact path="/login" render={(props) => <Auth {...props} submit={this.login} action="login"/>}/>
          <Route exact path="/signup" render={(props) => <Auth {...props} submit={this.signup} action="signup"/>}/>
          <Route exact path="/reset" render={(props) => <Auth {...props} action="reset"/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
