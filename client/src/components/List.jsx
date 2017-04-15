import React from 'react'
import Task from './Task.jsx'
import { connect } from 'react-redux'
import { tasksFetched } from '../actions/Task.js'
import { createTask } from '../actions/Task.js'

export class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      tasks: []
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)

    this.props.socket.on('update-list', () => {
      this.props.socket.emit('fetch-tasks', { list_id: this.props.list_id })
    })

    this.props.socket.on('tasks-fetched', (tasks) => {
      console.log('---> TASKS', tasks)
      this.setState({
        tasks: tasks
      })
    })
  }

  componentWillMount() {
    this.props.socket.emit('fetch-tasks', { list_id: this.props.list_id })
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  onCreateTask() {
    // this.props.createTask(this.state.text, this.props.list_id)
    this.props.socket.emit('create-task', { listId: this.props.list_id, text: this.state.text })
  }

  render() {
    var tasks = this.state.tasks || this.props.tasks
    return (
      <div>
        <h4>{ this.props.listname }</h4>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateTask }>CREATE TASK</button>

        { tasks.map((task, index) =>
          <Task
            key={ index }
            text={ task.text }
            // assigned={ this.state.assigned }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // createTask: (taskname, list_id) => { dispatch(createTask(taskname, list_id)) },
    tasksFetched: (tasks) => { dispatch(tasksFetched(tasks)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
