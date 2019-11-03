import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import LoginComponent from 'components/login-component';
// import SessionHandler from 'services/session-handler';
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
    this.validAndSend = false;
  }

  loginHandler(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(' HANDLED BY DAD');
    this.validAndSend = true;
  }

  render() {
    return (
      <LoginComponent loginHandler={this.loginHandler} />
    );
  }
}
