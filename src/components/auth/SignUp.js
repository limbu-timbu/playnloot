import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import useForm from "react-hook-form";
//UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as MUILink} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(8),
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Warning: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 3,
    borderBottom: 0,
    padding: theme.spacing(1, 2, 0.5),
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" href="https://material-ui.com/">
        Your Website
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignUp = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const { authError, auth } = props;

  const [showWarning, setWarning] = React.useState(0);
  const handleFocus = (event, index) => {
    setWarning(index);
  }
  
  
  if (auth.uid) return <Redirect to='/dashboard' />
  /*
  const [inputs, setInputs] = useState({});
  const OldhandleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    props.signUp(inputs)
  }
  const OldhandleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  */

  const onSubmit = (data, e) => {
    e.preventDefault();
    props.signUp(data);
  };

  return (
    <Container pb={45} className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                onFocus={(event) =>{
                  handleFocus(event, 0);
                }}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={register({
                  required: true
                })}
                error={!!errors.firstName}
                helperText={(errors.firstName ? "Enter your First Name!" : "eg. Ajey")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                onFocus={(event) =>{
                  handleFocus(event, 0);
                }}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register({
                  required: true
                })}
                error={!!errors.lastName}
                helperText={(errors.lastName ? "Enter your Last Name!" : "eg. Nagar")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {
                showWarning === 1
                ?
                <div className={classes.Warning}>
                  <Typography color="primary" variant="subtitle1">{'Enter carefully!'}</Typography>
                  <Typography variant="caption"><b>{'Here`s why: '}</b>{'Your PUBG ID will be used to identify you during matches!'}</Typography>
                </div>
                :
                null
              }
              
              <TextField
                variant="outlined"
                required
                onFocus={(event) =>{
                  handleFocus(event, 1);
                }}
                fullWidth
                id="pubgid"
                label="PUBG ID"
                name="pubgid"
                autoComplete="pubgid"
                inputRef={register({
                  required: true
                })}
                error={!!errors.pubgid}
                helperText={(errors.pubgid ? "PUBG ID is must!" : "eg. mortal123")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {
                showWarning === 2
                ?
              <div className={classes.Warning}>
                <Typography variant="subtitle1" color="primary">Enter your WhatsApp Number!</Typography>
                <Typography variant="caption">
                  <b>{'Here`s why: '}</b>
                  {"\nYou will be added to our elite WhatsApp Group! All live updates and notifications will be forwarded to you through whatsapp"}
                </Typography>
              </div>
                :
                null
              }
              <TextField
                variant="outlined"
                required
                onFocus={ (event) => {
                  handleFocus(event, 2);
                }}
                fullWidth
                id="mno"
                label="Mobile No."
                name="mno"
                autoComplete="mno"
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 10
                  }
                })}
                error={!!errors.mno}
                helperText={(errors.mno ? (errors.mno.type === 'required' ? "Mobile No is must!" : "Missed a digit! Check again") : "eg. 9850000000")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onFocus={(event) =>{
                  handleFocus(event, 0);
                }}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                error={!!errors.email}
                helperText={(errors.email ? (errors.email.type === 'required' ? "Enter your email!" : "Invalid email address") : "eg. abc@xyz.com")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onFocus={(event) =>{
                  handleFocus(event, 0);
                }}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 6
                  }
                })}
                error={!!errors.password}
                helperText={(errors.password ? (errors.password.type === 'required' ? "Set a Password!" : "Use alteast 6 characters/Numbers!") : "Set a Level 3 Password! :P")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <MUILink component={Link} to={'/signin'} variant="body2">
                Already have an account? Sign in
              </MUILink>
            </Grid>
          </Grid>
        </form>
        { authError ? <p>{authError}</p> : null }

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)