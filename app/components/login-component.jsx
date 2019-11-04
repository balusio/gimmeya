/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logoRed from 'assets/images/logo-red.svg';

// materialDesign default definitions
const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '95%',
    margin: '0 auto',
    display: 'block',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
/**
 * Login component handles the inputs and pass them to the container who will fetch the result
 * @param {Object} props general props from parent
 * @param {function} props.loginHandler that will handle the values on the Container login
 * @param {disableForm} props.disableForm add a loader to prevent click
 * multiple times and set the loading state of the app
 */
export default (props) => {
  /**
   * @listen Input user onChange and set his value if his length is bigger than 3 characters
   */
  const [user, setUser] = useState(null);
  /**
   * @listen Input password onChange and set his value if his length is bigger than 3 characters
   */
  const [password, setPassword] = useState(null);
  /**
   * formDisabled listen all both inputs and enable the submit button
   * @listen user
   * @listen password
   */
  const [formDisabled, setFormValidity] = useState(true);
  const classes = useStyles();
  /**
   * @param {string} arg check his lengt and if is setted
   * @return {boolean} check if the argument is valid and is passed to the state handler
   */
  const argumentValid = (arg) => ((arg && arg.length > 3) ? arg : null);
  // eslint-disable-next-line react/prop-types
  const { loginHandler } = props;
  useEffect(() => {
    const checkedUser = argumentValid(user);
    const checkedPass = argumentValid(password);
    // eslint-disable-next-line no-unneeded-ternary
    setFormValidity(((checkedUser && checkedPass) ? false : true));
    setUser(checkedUser);
    setPassword(checkedPass);
  });
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.logo}>
            <img src={logoRed} alt="logo_pedidos_ya" />
          </div>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => loginHandler(e, user, password)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => { setUser(e.target.value); }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value); }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={formDisabled}
            >
              Iniciar Sesion
            </Button>

          </form>
        </div>
      </Container>
    </>
  );
};
