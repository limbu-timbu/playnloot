import React from 'react';
import { Typography, makeStyles, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import moment from 'moment'
/*
  This Component is used to Display the Details of a Match.
  It is like a template which can be used for any list of matches with details
*/

const useStyles = makeStyles({
    root:{
        minWidth:"90%",
        marginBottom:"15px"
    }
})

const MatchSummary = (props)=>{
    const classes = useStyles();
    const {match,bttnname,bttnname2,isCan,handleClick,handleClick2} = props;//Passed By Calling Component
   //const canEnroll = match.plno<parseInt(maxp) ? true : false;//Checks if match is full?
    const link = !isCan && handleClick ? handleClick : ()=>{} ;// Sets the button link to be the match if cannot enroll sets to current path
    const link2 = !isCan && handleClick2 ? handleClick2 : ()=>{} ;// Sets the button link to be the match if cannot enroll sets to current path
    //const canEnrollmsg = canEnroll ? null : <div><Typography color="red"><b>Match is Full</b></Typography></div> ; //Displays a message if Match is Full
    //const isEnrolledmsg = isEnr ? <div><Typography color={red[500]}><b>Already Enrolled</b></Typography></div> : null ;  // Displays a Message if Already Enrolled
    //const fmsg = isEnr ? isEnrolledmsg : canEnrollmsg; //Final message depending upon enrollment status
    const canmsg = match.isActive ? "" : <Typography color={red[500]}>Match has been canceled</Typography>
    const bttn2 = bttnname2 && handleClick2 ? <Button color="primary" variant="contained" hidden id={match.id} onClick={()=>{link2(match.id)}} disabled={!match.isActive}>{bttnname2}</Button> : ""
    const cardActions = bttnname || bttnname2 ? (
        <CardActions>
            <Button color="primary" variant="contained" id={match.id} onClick={()=>{link(match.id)}} disabled={!match.isActive}>{bttnname?bttnname:""}</Button>
            {bttn2}
        </CardActions>
    ) : null;
    const {team, map, view, survival} = match
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5">Match Name : {match.name}</Typography><br/>
                <Typography>Match ID : {match.id}</Typography>
                <Typography>Entry Fee : {match.fee}</Typography>
                <Typography>Match Date : {moment(match.date.toDate()).calendar()}</Typography>
                <Typography>L.Reg Date : {moment(match.lrdate.toDate()).calendar()}</Typography>
                <Typography>Match Time : {moment(match.date.toDate()).format("LT")}</Typography>{/* Converts Time */}
                <Typography>Match Mode Details : {team+"-"+view+"-"+map}</Typography>
                <Typography>Players Enrolled : {match.plno}</Typography>
                <Typography hidden={!match.bKills}>Coin Per Kill : {match.bKills}</Typography>
                <Typography hidden={!survival}>Prize Pool : {survival ? "1st : "+survival['1']+", 2nd : "+survival['2']+", 3rd : "+survival['3'] : null}</Typography>
                <Typography>Room ID : {match && match.roomid ? match.roomid : "Not Set" }</Typography>
                <Typography>Room Password : {match && match.roompass ? match.roompass : "Not Set" }</Typography>
                {canmsg}
            </CardContent>
            {cardActions}
        </Card>
    )
}

export default MatchSummary;