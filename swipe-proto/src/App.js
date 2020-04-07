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
      <React.Fragment>
        {this.state.user ?{Login} : {Home}}
      </React.Fragment>
    );
  }
}

export default App;
