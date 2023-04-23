import React, { useState, useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import api from "../config/api";

import MySnackbar from '../components/MySnackbar';
import MyRedirect from '../components/MyRedirect';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  circularProgress: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(3, 0, 2)
  },
}));

const RenderButton = ({ submitLoading }) => {
  const classes = useStyles();

  if (submitLoading) {
    return (
      <div className={classes.circularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign Up
    </Button>
  );
};

export default function SignUpScreen(props) {
  const classes = useStyles();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showSnackbar, setSnowSnackbar] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangeName = e => {
    setUsername(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const payload = {
      email,
      username,
      password
    };
    try {
      setSubmitLoading(true);
      const response = await api.post("http://localhost:5002/signup", payload);
      // Save ke local storage
      // localStorage.setItem('token', response.data.token);

      // Push ke route `/`
      setRedirectPath('/login');
      setRedirect(true);
    } catch (error) {
      console.log(error);
      let errMsg;
      if (error.response) {
        errMsg = error.response.data.message;
      } else {
        errMsg = error.message
      }
      setSnackBarMessage(errMsg);
      setSnowSnackbar(true);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SignUp Form
        </Typography>
        <ValidatorForm
          ref={formRef}
          className={classes.form}
          onSubmit={onSubmit}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeEmail}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={username}
            onChange={onChangeName}
            // validators={["required", "isName"]}
            errorMessages={["this field is required", "name is not valid"]}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <RenderButton submitLoading={submitLoading} />
        </ValidatorForm>
      </div>
      <MySnackbar visible={showSnackbar} message={snackbarMessage} onClose={() => setSnowSnackbar(false)} />
      <MyRedirect redirect={redirect} routeName={redirectPath} />
    </Container>
  );
}
