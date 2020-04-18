/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { Component } from 'react';

import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

import { auth } from './config/Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      anonymous: false,
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

  funcOnSkip = () => {
    this.setState({ anonymous: true, auth: true });
  }

  funcOnBack = () => {
    this.setState({user: null, anonymous: false, auth: true })
  }

  render() {
    return (
      <div className="App">
        {this.state.auth ?
          <React.Fragment>
            {this.state.user || this.state.anonymous ? 
            <Dashboard {...this.state} funcOnBack={this.funcOnBack.bind()}/> 
            : <Login funcOnSkip={this.funcOnSkip.bind(this)}/>
            }
          </React.Fragment>
          : null
        }

      </div>
    );
  }
}

export default App;
