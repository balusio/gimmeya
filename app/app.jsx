import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import mapPage from './container/map/map-container';
import loginPage from './pages/login';

export default () => (
  <Router>
    <div className="container">
      <nav className="row aligner aligner--contentStart p-medium border-bottom">
        <Link to="/map?lat=-3456&lng=14556">
          <h1>Gimme now</h1>
        </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={loginPage} />
        <Route exact path="/map" component={mapPage} />
      </Switch>
    </div>
  </Router>
);
