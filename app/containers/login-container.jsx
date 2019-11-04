import React, { Component } from 'react';
import LoginComponent from 'components/login-component';
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import AuthContext from 'services/context-handler';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.validAndSend = false;
    this.state = {
      validAndSend: false,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  loginHandler(e, user, pass) {
    e.preventDefault();
    const sessionStatus = this.context;
    console.log(sessionStatus);
    // eslint-disable-next-line react/destructuring-assignment
    if (user && pass) {
      this.setState({
        validAndSend: true,
      });
      sessionStatus.save('user', user);
    }
  }

  render() {
    const { validAndSend } = this.state;
    if (validAndSend) {
      return <Redirect to="/map" />;
    }
    return (<LoginComponent loginHandler={this.loginHandler} />);
  }
}
LoginContainer.contextType = AuthContext;

export default LoginContainer;
