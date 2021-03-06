import React from 'react'
import firebase from '../../config/fbConfig'
import { connect, useDispatch } from 'react-redux'
import { signIn, resetPassword, changeWaitAuth } from '../../store/actions/authActions'
//eslint-disable-next-line
import { backDrop, showDialog } from '../../store/actions/uiActions'
import { Redirect, Link, useLocation } from 'react-router-dom'
import {signInWithPhone} from '../../store/actions/authActions'

import {useForm} from "react-hook-form";
//UI
//import PropTypes from "prop-types";
import { Link as MUILink, Icon } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Container, Typography, CssBaseline, Avatar, TextField, Button, Grid, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../layout/Copyright';
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { useQuery } from '../../Functions'
import SIgnInWithPhone from './SIgnInWithPhone'

const SignUpwithPhone = (props)=>{
  const dispatch = useDispatch();
  const [userData,setUserData] = React.useState('');
  const [acpg,setAcpg]= React.useState('name-pid')
  const hChange = (e)=>{
    setUserData({...userData,[e.target.id]:e.target.value})
  }
  const hClick = (opt)=>{
    switch(acpg){
      case 'name-pid':
        if(opt==='back') return;
        else{
          console.log(userData)
          setAcpg('ph-input')
        }
        break;
      case 'ph-input':
        if(opt==='back') setAcpg('name-pid')
        else{
          setAcpg('otp-input')
          const recaptchaVerifier  = new firebase.auth.RecaptchaVerifier('cdiv',{size:"invisible"})
          firebase.auth().settings.appVerificationDisabledForTesting = true;
          firebase.auth().signInWithPhoneNumber("+91"+userData.phNo,recaptchaVerifier).then((resp)=>{
            window.confirmOTP = resp;
            console.log(resp)
          })
        }
        break;
      case 'otp-input':
        if(opt==='back'){
          setAcpg('ph-input')
        }else{
          dispatch(signInWithPhone(window.confirmOTP,userData));
        }
        break;
      default:
        break;
        
    }
  }
  return(
    <React.Fragment>
      <Box display="flex" alignContent="center" justifyItems="center" textAlign="center">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button color="primary" id="back-bttn" variant="text" onClick={()=>hClick('back')}>
              <Icon><ArrowBack/></Icon>
              Back
            </Button>
          </Grid>
          <Grid item xs={5}>

          </Grid>
          <Grid item xs={3}>
            <Button color="primary" id="next-bttn" variant="text" onClick={()=>hClick('next')}>
              Next
              <Icon> <ArrowForward/> </Icon>
            </Button>
          </Grid>
          <React.Fragment>
            <Grid item hidden={acpg!=='name-pid'} xs={6}>
              <TextField
                required
                id="fname"
                name="fname"
                label="First Name"
                type="text"
                onChange={hChange}
              />
            </Grid>
            <Grid item hidden={acpg!=='name-pid'} xs={6}>
              <TextField
                required
                id="lname"
                name="lname"
                label="Last Name"
                type="text"
                onChange={hChange}
              />
            </Grid>
            <Grid item hidden={acpg!=='name-pid'} xs={12}>
              <TextField
                required
                id="pubgid"
                name="pubgid"
                label="PUBG ID"
                type="text"
                onChange={hChange}
              />
            </Grid>
            <Grid item hidden={acpg!=='name-pid'} xs={12}>
              <TextField
                id="email"
                name="email"
                label="E-Mail"
                type="email"
                onChange={hChange}
              />
            </Grid>
          </React.Fragment>
          <div >
            <Grid item hidden={acpg!=='ph-input'} xs={1}>
              <Typography style={{marginTop:'15px',marginRight:'1vh'}}>+91</Typography>
            </Grid>
          </div>
          <div>
            <Grid item hidden={acpg!=='ph-input'} xs={6}>
              <TextField
                autoFocus
                required
                id="phNo"
                name="phNo"
                label="Mobile No."
                type="phone"
                style={{marginLeft:'25px'}}
                disabled={acpg!=='ph-input'}
                onChange={hChange}
                fullWidth
              />
            </Grid>
          </div>
          <div>
            <Grid item xs={6} hidden={acpg!=='otp-input'}>
              <TextField
                autoFocus
                required
                id="otp"
                label="OTP"
                name="otp"
                disabled={acpg!=='otp-input'}
                type="number"
                style={{width:'40%'}}
                onChange={hChange}
                fullWidth
              />
            </Grid>
        </div>
        </Grid>
        <div id='cdiv'></div>
        
      </Box>
    </React.Fragment>)
}


const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    minHeight: '100vh'
  },
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    marginTop: 'auto',
    marginBottom: theme.spacing(10)
  },
})

const PassReset = () => {
  const dispatch = useDispatch();
  const [email, setemail] = React.useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setemail(e.target.value)
  }
  return (
    <React.Fragment>
      <Box display="flex" alignContent="center" justifyItems="center" textAlign="center">
        <TextField autoFocus required variant="outlined" size="small" margin="dense" label="Enter Email Address" id="email" type="email"
          autoComplete="email" onChange={handleChange}/>
        <Button disabled={!email} onClick={() => dispatch(resetPassword(email))}>Reset</Button>
      </Box>
    </React.Fragment>
  )
}

const SignIn = (props) => {
  const query = useQuery(useLocation);
  const urlSrc = query.get('from');
  const { register, handleSubmit, errors } = useForm();
  const [isSignInDialogOpen,setisSignInDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const onSubmit = (data, e) => {
    e.preventDefault();
    props.signIn(data);
    props.backDrop();
  };
  const resetHandle = () => {
    dispatch(showDialog({title: "Password Reset", content: <PassReset />}))
  }
  const openSignInDia = (e) => {
    e.preventDefault();
    setisSignInDialogOpen(true);
  }
  const { auth, classes, authWait } = props;
  console.log(authWait)
  
  if (!authWait && auth.uid) {
    if(urlSrc === null) return <Redirect to='/dashboard'/>
    else return <Redirect to={`/${urlSrc}`} />
  }
  dispatch(changeWaitAuth(true));
  return (
    <div className={classes.root}>
    <Container className={classes.hero} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Continue
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            inputRef={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            helperText={(errors.email ? (errors.email.type === 'required' ? "Enter your email!" : "Invalid email address") : "eg. abc@xyz.com")}
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
            inputRef={register({
              required: true,
              minLength: {
                value: 6
              }
            })}
            error={!!errors.password}
            helperText={(errors.password ? (errors.password.type === 'required' ? "Enter your password!" : "Wrong Password!") : "yaad hai? Shayad crush ka nam tha XD")}
          /> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Button
            onClick={openSignInDia}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In With Phone
          </Button>
          <SIgnInWithPhone isOpen={isSignInDialogOpen} handleClose={(reason)=>{setisSignInDialogOpen(false)}} />
          <Grid container>
            <Grid item xs>
              <MUILink component="button" onClick={resetHandle} variant="body2">
                Forgot password?
              </MUILink>
              {/* <Button variant="text"  onClick={() => props.resetPassword()}>Forgot password?</Button> */}
            </Grid>
            <Grid item>
              <MUILink component={Link} to={'/signup'} variant="body2">
                Don't have an account? Sign Up
              </MUILink>
            </Grid>
          </Grid> 
        </form>
      </div>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="subtitle1" align="left" gutterBottom>
            Play N Loot
          </Typography>
          <Typography
            variant="body2"
            align="justify"
            color="textSecondary"
            component="p"
          >
            A user-friendly platform to participate in PUBG Mobile Tournaments and earn real loot! 
            Earn coins on per kills and convert them into real money in your PayTM account! Register in a tournament now!
          </Typography>
        </Container>
        <Copyright />
      </footer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    authSuccess: state.auth.authSuccess,
    authErrorMsg: state.auth.authErrorMsg,
    auth: state.firebase.auth,
    authWait : state.auth.authWait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => {
      dispatch(signIn(creds))
    },
    backDrop: () => {
      dispatch(backDrop());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn))