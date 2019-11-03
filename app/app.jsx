import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from 'react-router-dom';
import mapPage from './container/map/map-container';
import loginPage from './pages/login';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#F52F41' },
  },
});
export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <div className="container">
        {/* <nav className="row aligner aligner--contentStart p-medium border-bottom">
          <Link to="/map?lat=-3456&lng=14556">
            <h1>Gimme now</h1>
          </Link>
        </nav> */}
        <Switch>
          <Route exact path="/" component={loginPage} />
          <Route exact path="/map" component={mapPage} />
        </Switch>
      </div>
    </ThemeProvider>
  </Router>
);
