/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import AuthContext from 'services/context-handler';
/**
 * Auth Router component
 * @listen AuthContext provider check if the logged handler is setted up in local,session or cookie
 */
export default ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {
      (context) => (
        // eslint-disable-next-line
        <Route { ...rest }
          render={(props) => {
            console.log(context.get('session_hash'));
            return (
              context.get('session_hash')
              // eslint-disable-next-line react/jsx-props-no-spreading
                ? <Component {...props} />
                : <Redirect to="/login" />
            );
          }}
        />
      )
    }
  </AuthContext.Consumer>
);
