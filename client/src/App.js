import React from 'react';
import './App.sass';
import NavBar from './containers/NavBar/NavBar';
import Main from './pages/Main/Main';
import Approval from './pages/Approval/Approval';
import Athlete from './pages/Athlete/Athlete';
import Coach from './pages/Coach/Coach';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from './utils/API';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
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
    console.log(response);
    if (response.ok) {
      let json = await response.json();
      this.setState({
        isLoggedIn: true,
        user: json,
        message: {}
      });
    } else {
      if (response.status >= 400 && response.status <= 499) {
        // create a message if login doesn't work
        this.setState({
          message: {
            messageType: "Error",
            messageText: "Incorrect Username or Password"
          }
        });
      } else if (response.status >= 500 && response.status <= 599) {
        // create a message if login doesn't work
        this.setState({
          message: {
            messageType: "Error",
            messageText: "Something is wrong with the server... We are working on a solution, try back later"
          }
        });
      }

    } 
    
  }
  signup = async newUser => {
    API.signupUser(newUser)
    .then(user => {
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
    })
    .catch(err => {
      console.log(err);
    })
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
      return <Main {...props} message={message} login={this.login}/>
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
  componentDidMount = () => {
    // check if user is logged in and update state
    fetch("/auth/profile")
      .then(response => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then(json => {
        if (json) {
          this.setState({
            isLoggedIn: true,
            user: json
          });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Router>
        <Route path="*" render={props => <NavBar {...props} getLink={this.getLink} pathName={this.state.pathName} user={this.state.user} isLoggedIn={this.state.isLoggedIn} signOut={this.signOut} />}/>
        <Switch>
          <Route exact path="/" render={(props) => this.renderLandingPage(props)} />
          <Route exact path="/login" render={(props) => <Auth {...props} message={this.state.message} isLoggedIn={this.state.isLoggedIn} submit={this.login} action="login" />} />
          <Route exact path="/signup" render={(props) => <Auth {...props} message={this.state.message} isLoggedIn={this.state.isLoggedIn} submit={this.signup} action="signup" />} />
          <Route path="/reset/:key?" render={(props) => <Auth {...props} message={this.state.message} action="reset" />} />
          <Route path="/coach/:response/:key" render={(props) => <Approval {...props} />} />
        </Switch>
      </Router>
    );
  }
}


export default App;
