import React, { useState, useEffect } from 'react';
import Image from '../imgs/bg_100_202329.jpg'
import { makeStyles } from '@material-ui/styles'
import Typist from 'react-typist';
import { useHistory, useParams } from 'react-router-dom'
import { useMediaQuery, useTheme , Typography, Box, Grid, Avatar, Button, Hidden, Collapse, Container } from '@material-ui/core';
import { ReactComponent as Loading } from '../../imgs/loading.svg'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh',
    marginBottom: theme.spacing(8),
  },
  bgImg: {
    //width: '80vw',
    height: '50vh'
  },
  TypistWrap: {
    //paddingTop: 50,
    minHeight: '105px',
    //border: '1px solid #121212'
  },
  enroll: {
    color: '#f6734a'
  },
  GetStartBtn: {
    backgroundColor: theme.palette.background.paper,
  },
  HDivider: {
    width: '2px', backgroundColor: theme.palette.primary.main,
    display: 'inline-block',
    marginLeft: theme.spacing(5),
  },
  stepHeading: {
    display: 'flex',
    minWidth: '100wh',
    backgroundColor: theme.palette.main,
    padding: theme.spacing(2),
  },
  stepNo : {
    borderRadius: '50%',
    width: '3rem', height: '3rem',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  stepTitle: {
    paddingLeft: theme.spacing(2),
    display: 'inline',
  },
  stepImage: {
    margin: 'auto',
  },
  stepBody: {
    margin: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  stepContent: {
    backgroundColor: theme.palette.background.paper,
    display: 'inline-block',
    padding: theme.spacing(2),
    borderRadius: 5,
    boxShadow: 3,
  },
  stepAction: {
    marginTop: theme.spacing(2),
    textAlign: 'right'
  },
}));

//unit for one coin (PaymentActions, Landing.js)
const unit = 5;

const Landing = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { gti } = useParams();
  const history = useHistory();
  const mDevice = useMediaQuery(theme.breakpoints.up('sm'));
  const [typist, settypist] = useState(1);
  const [activeStep, setActiveStep] = useState(gti || parseInt(0));
  const [getStart, setgetStart] = useState(localStorage.getItem('getting_Started') || {gt: false});
  const steps = getSteps();

  useEffect(() => {
    localStorage.setItem('getting_Started', localStorage.getItem('getting_Started') ? JSON.stringify({gt: false}) : JSON.stringify(getStart))
    console.log(JSON.parse((localStorage.getItem('getting_Started'))));
  }, [getStart])

  const handleClicks = (opt) => {
    switch(opt){
      case 'handleNext': setActiveStep((prevActiveStep) => prevActiveStep + 1); break;
      case 'handleBack': setActiveStep((prevActiveStep) => prevActiveStep - 1); break;
      case 'handleReset': setActiveStep(0); break;
      default: console.log("handleClick: Case Mismatch!"); break;
    }
  }

  function getSteps() {
    return ['Register on Playnloot', 'Buy a Coin', 'Enroll in a Match'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Box className={classes.stepContent}>
                  First, you`ve to register on our app using your correct credentials!<br/>
                  <Button m="auto" color="primary" variant="outlined" style={{marginTop: '5px'}} onClick={() => history.push('/signup')}>REGISTER</Button>
                </Box>;
      case 1:
        return <Box className={classes.stepContent}>
                  Now, for earning money, we always have to invest some first!<br/>
                  We count money in terms of "Coins", you buy coins by paying us.<br/>
                  So, now you need to buy COINS (atleast one) worth ₹{unit}.<br/>
                  <Button m="auto" color="primary" variant="outlined" style={{marginTop: '5px'}} onClick={() => history.push('/wallet/view/coins')}>Buy</Button>
                </Box>;
      case 2:
        return <Box className={classes.stepContent}>
                  Wow, You`re almost close; we`ve created a Dashboard for you XP, go check it!<br/>
                  There, you`ll get a list of new matches and Enroll in a Match!<br/>
                  <Button m="auto" color="primary" variant="outlined" style={{marginTop: '5px'}} onClick={() => history.push('/dashboard')}>Check & Enroll</Button>
                </Box>;
      
      default:
        return 'Kaand! Contact Admin';
    }
  }

  return (

    <div className={classes.root}>
      <Grid container direction="column">
        <Grid container direction="row">
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" style={{height: '95vh'}}>
            <Typist avgTypingDelay={40} className={classes.TypistWrap} cursor={{show: false, hideWhenDone: false}} onTypingDone={() => settypist(2)}>
              <Box fontSize="h4.fontSize" letterSpacing={6} fontFamily="Monospace" style={{color: '#f6734a'}}>PLAY N LOOT</Box><br />
              {/* <Typist.Backspace count={22} delay={200} /> */}
              <Box fontSize="h6.fontSize" fontWeight="fontWeightLight"> Want to loot real money? <br /> 
              Earn money on your every kill!</Box>
            </Typist>
            <img src={Image} className={classes.bgImg} alt="Get Enrolled"/>
            <Box className={classes.TypistWrap}>
              <Typography className={classes.enroll} variant="h6" >ENROLL IN A MATCH NOW!</Typography>
              <br/>
              <Button className={classes.GetStartBtn} variant="outlined" size="large" onClick={() => history.push('/signup')}>Get Started</Button>
              <Box fontSize={13} fontWeight="fontWeightLight" style={{marginTop: 2, textDecoration: 'underline', cursor: 'help'}} id="gt" onClick={() => {setgetStart({...getStart, gt: true}); document.querySelector('#getstarted').scrollIntoView({ behavior: 'smooth', block: 'center'})}}>Know More</Box>
            </Box>
          </Box>
        </Grid>
        </Grid>
        <Container>
        <Grid container direction="row" justify="center" alignItems="center" id="getstarted" style={{minHeight: '100vh'}}>
          {steps.map((label, index) => (
            <React.Fragment key={label}>
              <Grid item xs={12} id={index}>
                <Box className={classes.stepHeading} alignItems="center"><Box><Avatar edge="start" className={classes.stepNo}>{index + 1}</Avatar></Box>&nbsp;<Typography variant="h6" className={classes.stepTitle} onClick={() => handleClicks('handleReset')}>{label}</Typography></Box>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={index === activeStep} {...(activeStep ? { timeout: 1000 } : {})}>
                  <Box display="flex">
                    <Hidden xsUp={index === steps.length -1  ? true : false}><Box className={classes.HDivider} /></Hidden>
                    <Box className={classes.stepBody}  display="flex" flexDirection="column" justifyContent="center">
                      {getStepContent(index)}
                      <Box className={classes.stepAction}><Button color="primary" disabled={index === 0} onClick={() => handleClicks('handleBack')}>Back</Button><Button color="primary" variant="contained" onClick={() => handleClicks('handleNext')}>{index>=2 ? "Finish" : "Next"}</Button></Box>
                    </Box>
                  </Box>
                </Collapse>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        </Container>
        <Grid item xs={12} sm={6}>
          
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Landing;