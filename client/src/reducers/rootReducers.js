import { combineReducers } from 'redux';

const appReducer = combineReducers({
	//reducer files go here! - import the reducers!
  
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;