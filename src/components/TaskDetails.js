import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import '../App.css'
import Loading from './Loading'
const TaskDetails = (props) => {
  const { _id } = useParams()
  const { state } = useLocation()
  const [result, setResult] = useState(state)
  const [disabled, setDisabled] = useState('')
  const [loading, setIsLoading] = useState('')
  const changeStatus = () => {
    if (!result.completed) {
      axios.put(`${props.userUrl}/api/tasks/${result._id}`, {
        completed: true
      })
        .then((res) => {
          setDisabled(true)
          alert("Task status changed to completed")
        })
    }

  }
  useEffect(() => {
    if (state != "") {
      axios.get(`${props.userUrl}/api/tasks/${state._id}`)
        .then((res) => {
          setResult(res.data.data)
          setDisabled(result.completed)
        })
    }
    else {
      setIsLoading(true)
      axios.get(`${props.userUrl}/api/tasks/${_id}`)
        .then((res) => {
          setIsLoading(false)
          setResult(res.data.data)
          setDisabled(result.completed)
        })
    }
  }, [disabled])

  if (loading === true) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className='head'>
        <div className='taskDetails'>
          <h1 style={{ display: "flex", justifyContent: "center", color: "#6B7280" }}>
            Task Details
          </h1><br /><br />
          <div className='taskContent'>
            <h3>Task Name: <span className='taskcontent'>{result.name}</span></h3><br />
            <h3>Description: <span className='taskcontent'>{result.description}</span></h3><br />
            <h3>Deadline: <span className='taskcontent'>{result.deadline}</span></h3><br />
            <h3 className='taskButton' style={{ display: "block" }}>Task Status: <span className='taskcontent'>{result.completed ? "completed" : "Pending"}&nbsp;&nbsp;</span> {disabled ? "" : (<span className='taskcontent'><button className='edit' style={{ margin: "0", fontSize: "1rem" }} onClick={changeStatus}>Click here</button> to change the status</span>)}</h3><br />
            <h3>User Assigned: <Link to={(result.assignedUserName === "unassigned") ? ("") : (`/users/${result.assignedUser}`)} className="list"><span className='taskcontent'>{result.assignedUserName}</span></Link></h3><br /><br />
          </div>
          <div className='taskButton'>
            <button className="edit"><Link className="list" to={`/editTask/${state._id}`} state={state}> Edit Task Details</Link> </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default TaskDetails