import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import BoardListPage from './BoardListPage.jsx'
import HomePage from './HomePage.jsx'
import BoardPage from './BoardPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import LogInPage from './LogInPage.jsx'
import UserProfilePage from './UserProfilePage.jsx'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

  render () {
	  return (
      <div>
        <Router history={ hashHistory }>
          <Route path="/" component={ HomePage }/>
          <Route path="/lobby" component={ BoardListPage }/>
          <Route path="/lobby/:taskBoardId" component={ BoardPage }/>
          <Route path="/signup" component={ SignUpPage }/>
          <Route path="/login" component={ LogInPage }/>
          <Route path="/lobby/user/:id" component= { UserProfilePage }/> 
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