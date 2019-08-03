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
  login = async user => {
    let response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    });
    let json = await response.json();
    this.setState({
      isLoggedIn: true,
      user: json
    });
  }
  signup = async newUser => {
    let response = await fetch("/auth/signup", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      }
    });
    let user = await response.json();
    this.setState({
      isLoggedIn: true,
      user: user
    });
  }
  reset = (email) => {
    // need to set up email routes for this to work.
  }
  signOut = async () => {
    let response = await fetch("/auth/logout");
    if (response.ok) {
      this.setState({
        isLoggedIn: false,
        user: {}
      });
    } else {
      console.log(response.statusText);
    }
  }
  renderLandingPage = (props) => {
    let { isLoggedIn, user } = this.state;
    if (isLoggedIn && user.type === "Athlete") {
      return <Athlete {...props} athlete={user} />
    } else if (isLoggedIn && user.type === "Coach") {
      return <Coach {...props} coach={user} />
    } else {
      return <Main {...props} />
    }
  }
  loadTraining = () => {
    fetch("/api/training")
      .then(response => {
        return response.json();
      })
      .then(user => {
        this.setState({
          user: user
        });
      });
  }
  loadAthletes = () => {
    fetch("/api/athletes")
      .then(response => {
        return response.json();
      })
      .then(user => {
        this.setState({
          user: user
        });
      });
  }
  componentDidMount = () => {
    if (this.state.isLoggedIn && this.state.user.type === "Coach") {
      this.loadAthletes();
    } else if (this.state.isLoggedIn && this.state.user.type === "Athlete") {
      this.loadTraining();
    } 
  }
  render() {
    return (
      <Router>
        <NavBar user={this.state.user} isLoggedIn={this.state.isLoggedIn} signOut={this.signOut} />
        <Switch>
          <Route exact path="/" render={(props) => this.renderLandingPage(props)} />
          <Route exact path="/login" render={(props) => <Auth {...props} isLoggedIn={this.state.isLoggedIn} submit={this.login} action="login" />} />
          <Route exact path="/signup" render={(props) => <Auth {...props} isLoggedIn={this.state.isLoggedIn} submit={this.signup} action="signup" />} />
          <Route exact path="/reset" render={(props) => <Auth {...props} action="reset" />} />
        </Switch>
      </Router>
    );
  }
}


export default App;
