import React from 'react';
import './App.css';
import NavBar from './containers/NavBar/NavBar';
// import Main from './pages/Main/Main';
import Auth from './containers/Auth/Auth';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route exact path="/" component={Main}/> */}
        <Route exact path="/login" render={(props) => <Auth {...props} action="login"/>}/>
        <Route exact path="/signup" render={(props) => <Auth {...props} action="signup"/>}/>
        <Route exact path="/reset" render={(props) => <Auth {...props} action="reset"/>}/>
      </Switch>
    </Router>
  );
}

export default App;
