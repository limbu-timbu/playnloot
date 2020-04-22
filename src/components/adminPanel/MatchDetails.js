import React from 'react';
import EnrPlayersDetails from './EnrPlayersDetails'
import {findinMatches,getPlayerfromMatch, findinUsers} from '../../Functions'
import {useSelector} from 'react-redux'
import MatchSummary from '../matches/adminMatchSummary'
import Nav from './AdminNav'
import {useFirestoreConnect} from 'react-redux-firebase'

const MatchDetails = (props)=>{
  const mid = props.match.params.mid;
  useFirestoreConnect([{collection:"Matches",doc:mid},{collection:"Users",where:['matches','array-contains',mid]}])
  const {Matches} = useSelector(state =>state.firestore.ordered)
  const {Users} = useSelector(state =>state.firestore.ordered)
    const match = Matches && Matches[0]
    const cols = ['srno','pubgid','mno','ukills','rank']
    let tableMetadata = {pages:0,psi:0,page:0,count:0 //psi - Player Starting Index, pei - Player Ending Index
      ,ppp:5} //ppp means Player Per Page 
    tableMetadata['pei']=tableMetadata['ppp']
    tableMetadata.pages = Users && (Users.length/tableMetadata.ppp)
    let ind = 1
    let mplayers = match && match.players
    let pljson = {}
    let uinm = []
    console.log(mplayers)
    for(let x in mplayers){
      let mpkarr = Object.keys(mplayers[x])
      let ldr = Users && findinUsers(Users,x)
      var ux = {};
        // eslint-disable-next-line no-loop-func
      ldr && Users && cols.map(cl=>{
          return  cl==='srno' ? (match.mode==="Solo" ?ux[cl]=ind++ : ux[cl]=ind ) : (cl==='pubgid' && match.mode!=="Solo" ? ux[cl]=ldr[cl]+"'s Team" : ux[cl]=ldr[cl])
      })
      if(match.mode!=="Solo"){
        let alp = ['a','b','c','d']
        let mates = 
        Users && mpkarr.map(mpk=>Users && findinUsers(Users,mpk))
        let matex = []
          // eslint-disable-next-line no-loop-func
          mates && Users && mates.forEach((mate,sinx)=>{
            let sindx = 1
            if(mates && mate && mate.pubgid===x) {sindx++;return;}
            let mx = {}
            mates && mate && cols.map(cl=>{
              return  cl==='srno' ? mx[cl]=(ind)+(match.mode==="Duo"?alp[sindx++]:alp[sinx]) : mx[cl]=mate[cl]
            })
            mx['ukills'] = Users && x===mpkarr[1] ? mplayers[x][mpkarr[0]] : mplayers[x][mpkarr[1]]
            mx['ldr']=x
            matex.push(mx)
          })
          ind++
        uinm.push(...matex)
      }
      let ldruk = match.mode==="Solo" ? mplayers[x] : mplayers[x][x]
      uinm.push({...ux,ukills:ldruk})
      pljson = {...pljson,[x]:mplayers[x][mpkarr[0]]+mplayers[x][mpkarr[1]]}
    }
    /**
    let uinm = Users && Users.map(user=>{
        var px = match && getPlayerfromMatch(pljson,user.pubgid,match.mode)
        console.log(px)
        var ux = {};
        cols.map(cl=>{
          return  cl==='srno' ? ux[cl]=ind++ : ux[cl]=user[cl]
        })
        return {...ux,ukills:parseInt(px)}
    }) */
    tableMetadata['count'] = uinm && uinm.length
    let players = uinm && uinm.slice(tableMetadata.psi,tableMetadata.pei)
    if(players && players.length>0 && players[0].rank===undefined){
      for(let x in players){
        players[x].rank = 0
      }
    }

    const handlePageChange = (nPage)=>{
      return new Promise((resolve,reject)=>{
        if(nPage>tableMetadata.page){
          let pdiff = nPage - tableMetadata['page']
          tableMetadata['psi'] = tableMetadata['psi'] + pdiff * tableMetadata['ppp']
          tableMetadata['pei'] = tableMetadata['pei'] + pdiff * tableMetadata['ppp']
          tableMetadata['page'] += pdiff
          players = uinm.slice(tableMetadata.psi,tableMetadata.pei)
          resolve({players,tableMetadata})
        }else{
          let pdiff = tableMetadata['page'] - nPage
          tableMetadata['psi'] = tableMetadata['psi'] - pdiff * tableMetadata['ppp']
          tableMetadata['pei'] = tableMetadata['pei'] - pdiff * tableMetadata['ppp']
          tableMetadata['page'] -= pdiff
          players = uinm.slice(tableMetadata.psi,tableMetadata.pei)
          resolve({players,tableMetadata})
        }
      })
    }
    
    const handleChangeRowsPerPage = (nrpp)=>{
      return new Promise((resolve,reject)=>{
        tableMetadata['ppp']=nrpp;
        tableMetadata['pei']=tableMetadata['psi']+nrpp;
        players = uinm.slice(tableMetadata.psi,tableMetadata.pei)
        resolve({players,tableMetadata})
      })
    }

    const loadCircle = <div className="center"><p>Loading Match Details...</p><div className="preloader-wrapper small active center">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div></div>;

    const handleMClick = ()=>{
      props.history.push("/admin/updatematchfacts/"+mid)
    }

    const msum = match ? <MatchSummary match={Matches && match} handleClick={handleMClick} maxp={101} bttnname="Update Facts"/> 
    : loadCircle
  const stl = {
    paddingBottom : 120
  };
    return(
      <React.Fragment>
          <Nav/>
          <div className="container white-text">
              {msum}
          </div>
          <div className="container"  style={stl}>
          {Users && players ? <EnrPlayersDetails mode={match && match.mode} handleChangeRowsPerPage={handleChangeRowsPerPage} handlePageChange={handlePageChange} columns={cols} tableMetadata={tableMetadata} isEditing={false} players={Users && players}/> : loadCircle}
          </div>
      </React.Fragment>
    ) 
}


export default MatchDetails

/**
const mapStatetoProps = (state)=>{
    return{
        matches:state.firestore.ordered.Matches,
        users:state.firestore.ordered.Users
    }
}
export default compose(
    connect(mapStatetoProps),
    firestoreConnect(props => [
        {collection:'Matches',doc:props.match.params.mid},
        {collection:'Users',where:['matches','array-contains',props.match.params.mid]}
    ])
)(MatchDetails) */