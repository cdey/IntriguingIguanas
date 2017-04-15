import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { createTask } from '../actions/Task.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
    
    var socket = this.props.route.socket

    socket.on('update-lists', () => {

    })
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  onCreateTask() {
    // this.props.createTask(this.state.text, this.props.list_id)
    var socket = this.props.route.socket
    socket.emit('create-task', { listId: this.props.list_id, text: this.state.text })
  }

  render() {
    return (
      <div>
        <h4>{ this.props.listname }</h4>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    // PROBLEM HERE!
    list_id: state.list.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (taskname, list_id) => { dispatch(createTask(taskname, list_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
