import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import Login from './containers/Login/index';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
