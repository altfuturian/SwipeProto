import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/Login/index';
import Home from './containers/Home/index';

import firebase from './config/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.funcAuthListener();
  }

  
  funcAuthListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
      }
      else {
        this.setState({user:null});
      }
    })
  }
  render() {
    return (
      <div>
        {this.state.user ? (<Home/>) : (<Login/>) }
      </div>
    );
  }
}

export default App;
