/* eslint-disable import/no-unresolved */
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import loginPage from 'pages/login';
import mapPage from 'pages/map';
import AuthContext from 'services/context-handler';
import AuthRoute from 'pages/auth';
import HandleSession from 'services/session-handler';


/**
 * This application is based on pages for handling routing and authentication
 * Containers who handle multiple components nested and general
 * state mangament based on react Component class
 * Components stateless (allowed hoooks) react elements that provide atoms state
 * of the elements inside containers
 */
const authHandler = new HandleSession('sessionStorage');

const theme = createMuiTheme({
  palette: {
    primary: { main: '#F52F41' },
  },
});

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={authHandler.handler}>
        <div className="container">
          <Switch>
            <AuthRoute exact path="/" component={mapPage} />
            <Route exact path="/login" component={loginPage} />
            <AuthRoute exact path="/map" component={mapPage} />
          </Switch>
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  </Router>
);
