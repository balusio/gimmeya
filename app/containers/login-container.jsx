import React, { Component } from 'react';
import LoginComponent from 'components/login-component';
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import AuthContext from 'services/context-handler';
import axios from 'axios';

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
    // eslint-disable-next-line react/destructuring-assignment
    const optionsReq = {
      method: 'post',
      url: 'http://localhost:3000/login',
      // eslint-disable-next-line no-unneeded-ternary
      data: {
        username: user,
        password: pass,
      },
    };
    if (sessionStatus.get('session_hash')) {
      console.log(' INSIDE HASH');
      optionsReq.headers = {
        Authorization: sessionStatus.get('session_hash'),
      };
    }
    axios(optionsReq).then((response) => {
      if (response.status === 200) {
        sessionStatus.save('session_hash', response.data.user_hash);
        console.log(sessionStatus.get('session_hash'));
        this.setState({
          validAndSend: true,
        });
      }
    });
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
