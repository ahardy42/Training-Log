import React from 'react';
import './App.sass';
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
      user: {},
      pathName: "",
      message: {}
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
    if (user.messageType) {
      this.setState({
        message: user
      });
    } else {
      this.setState({
        isLoggedIn: true,
        user: user
      });
    }
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
    let { isLoggedIn, user, message } = this.state;
    if (isLoggedIn && user.type === "Athlete") {
      return <Athlete {...props} athlete={user} />
    } else if (isLoggedIn && user.type === "Coach") {
      return <Coach {...props} coach={user} />
    } else {
      return <Main {...props} message={message} />
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
  renderLink = path => {
    this.setState({
      pathName: path
    })
  }
  getLink = path => {
    this.renderLink(path);
  }
  componentDidMount = () => {
    // check if user is logged in and update state
    fetch("/auth/profile")
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json) {
          this.setState({
            isLoggedIn: true,
            user: json
          });
        }
      });
  }
  render() {
    return (
      <Router>
        <NavBar getLink={this.getLink} pathName={this.state.pathName} user={this.state.user} isLoggedIn={this.state.isLoggedIn} signOut={this.signOut} />
        <Switch>
          <Route exact path="/" render={(props) => this.renderLandingPage(props)} />
          <Route exact path="/login" render={(props) => <Auth {...props} renderLink={this.renderLink} isLoggedIn={this.state.isLoggedIn} submit={this.login} action="login" />} />
          <Route exact path="/signup" render={(props) => <Auth {...props} message={this.state.message} renderLink={this.renderLink} isLoggedIn={this.state.isLoggedIn} submit={this.signup} action="signup" />} />
          <Route path="/reset/:key?" render={(props) => <Auth {...props} renderLink={this.renderLink} action="reset" />} />
          <Route path="/coach/:key" render={(props) => <Main {...props}  message={this.state.message}/>} />
        </Switch>
      </Router>
    );
  }
}


export default App;
