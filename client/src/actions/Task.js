import axios from 'axios'

export const taskCreated = () => {
  return {
    type: 'TASK_CREATED'
  }
}

export const createTaskError = (createError) => {
  return {
    type: 'CREATE_TASK_ERROR',
    createError
  }
}

export const createTask = (text, list_id) => {
  return {
    type: 'CREATE_TASK',
    text,
    list_id
  }
}

// ------------ FETCH ------------
export const fetchingTasks = () => {
  return {
    type: 'FETCHING_TASKS'
  }
}

export const tasksFetched = (tasks) => {
  return {
    type: 'TASKS_FETCHED',
    tasks: tasks
  }
}

export const fetchTasksError = (fetchError) => {
  return {
    type: 'FETCH_TASKS_ERROR',
    fetchError
  }
}