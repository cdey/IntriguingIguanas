import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import BoardList from './BoardList.jsx'
import Home from './Home.jsx'
import Board from './Board.jsx'
import SignUp from './SignUp.jsx'
import LogIn from './LogIn.jsx'
import UserProfile from './UserProfile.jsx'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

  render () {
	  return (
      <div>
        <Router history={ hashHistory }>
          <Route path="/" component={ Home }/>
          <Route path="/lobby" component={ BoardList }/>
          <Route path="/lobby/:taskBoardId" component={ Board }/>
          <Route path="/signup" component={ SignUp }/>
          <Route path="/login" component={ LogIn }/>
          <Route path="/lobby/user/:id" component= { UserProfile }/> 
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}


export default connect(mapStateToProps)(App);