import React, { Component } from 'react';

import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

import { auth } from './config/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      auth: false
    }
  }

  componentDidMount() {
    this.funcAuthListener();
  }


  funcAuthListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, auth: true });
      }
      else {
        this.setState({ user: null, auth: true });
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        {this.state.auth ?
          <React.Fragment>
            {this.state.user ? (<Dashboard />) : (<Login />)}
          </React.Fragment>
          : null
        }

      </div>
    );
  }
}

export default App;
