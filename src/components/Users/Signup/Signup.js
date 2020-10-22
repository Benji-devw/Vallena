import React, {useState} from "react";
import CallUsers from "../../../apiCall/CallUsers.js";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';








function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));












const  SignUp = () => {
  const classes = useStyles();


  const [ username, setUserName] = useState()
  const [ email, setEmail] = useState()
  const [ password, setPassword] = useState()
  const [ cpassword, setCpassword] = useState()
  const [ alert, setAlert ] = useState([])



  const send = () => {

    if (!username || username.length <= 2) {
      setAlert("usererror");
      return;
    };
    if (!email || email.length <= 5) {
      setAlert("emailerror");
      return;
    };
    if (!password || password.length <= 5 || password !== cpassword) {
      setAlert("passworderror");
      return;
    };

      CallUsers.signup({username, email, password}).then(res => {
        // console.log(res);
        // window.location = "/login";
        // localStorage.setItem("token", data.token);
        // console.log('SIGNUP OK');
        alert('Inscription désactivé !')
      })

  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={alert === "usererror" ? true : false}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
                helperText={alert === "usererror" ? 'Champ incorrect' : ""}
                onChange={e => setUserName(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                error={alert === "emailerror" ? true : false}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={alert === "emailerror" ? 'Champ incorrect' : ""}

                onChange={e => setEmail(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={alert === "passworderror" ? true : false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={alert === "passworderror" ? 'Champ incorrect' : ""}

                onChange={e => setPassword(e.target.value)}

              />
            </Grid>           
             <Grid item xs={12}>
              <TextField
                error={alert === "passworderror" ? true : false}
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                helperText={alert === "passworderror" ? 'Champ incorrect' : ""}

                onChange={e => setCpassword(e.target.value)}

              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={send}
          >
            envoyer
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Déjà inscrit ? Connexion
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp