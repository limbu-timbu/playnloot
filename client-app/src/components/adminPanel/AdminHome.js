import React from "react";
import {connect} from 'react-redux';
import MatchSummary from "../matches/adminMatchSummary";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import Nav from './AdminNav'

/*
  This Component is Admin Home
*/

const AdminHome = (props)=>{
  const {matches} = props;
  const handleClick = (mid)=>{
    props.history.push("/admin/matchdetails/"+mid)
  }
  const matchdiv = matches ? matches && matches.map(match =>{//Used to Generate MatchList using ternary operator
     return(
         <MatchSummary maxp='101' isCan={!match.isActive} match={match} handleClick={handleClick} isEnr={false}  bttnname={"View Details  "} key={match.id}/>
     )
  }) : <div className="center"><p>Loading Matches...</p><div className="preloader-wrapper big active center">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>;
  return(
  <React.Fragment>
    <Nav/>
    <div className="container white-text">
      <h3>Welcome Back, Admin</h3>
      {matchdiv}
    </div>
  </React.Fragment>
  )
}

const mapStatetoProps = (state)=>{
    return{
        matches:state.firestore.ordered.Matches
    }
}

export default compose(
    connect(mapStatetoProps),
    firestoreConnect([
        {collection:'Matches'}
    ])
)(AdminHome);