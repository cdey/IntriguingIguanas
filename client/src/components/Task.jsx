import React from 'react'

export const Task = (props) => {
  return (
    <div>
      . { props.text } – assigned to 
    </div>
  )
}

export default Task

// { props.assigned }