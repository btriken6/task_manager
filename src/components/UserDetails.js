import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'
const UserDetails = (props) => {
  const { _id } = useParams()
  const [userDetails, setUserDetails] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [pendingDisplay, setPendingDisplay] = useState("none")
  const [availDisplay, setAvailDisplay] = useState("none")
  const [pendingTasks, setPendingTasks] = useState([])
  const [newPenTask, setNewPenTask] = useState([])
  const [availableTask, setAvailableTask] = useState([])
  const [loadPending, setLoadPending] = useState(true)
  const [width,setWidth]=useState("80%")
  const [message, setMessage] = useState("")
  const showPendingTask = () => {
    setAvailDisplay("none")
    { (pendingDisplay === "block") ? setPendingDisplay("none") : setPendingDisplay("block") }
    if(availDisplay === "block"){
      setWidth("50%")
    }
    else{
      { (width === "50%") ? setWidth("80%") : setWidth("50%") }
    }
  }
  const showAvailableTask = () => {
    setPendingDisplay("none")
    { (availDisplay === "block") ? setAvailDisplay("none") : setAvailDisplay("block") }
    if(pendingDisplay === "block"){
      setWidth("50%")
    }
    else{
      { (width === "50%") ? setWidth("80%") : setWidth("50%") }
    }
    axios.get(`${props.userUrl}/api/tasks?where={'completed':true}`)
    .then((res)=>{
      setAvailableTask(res.data.data)
    })
    
  }

  const markComplete = (id) => {
    axios.put(`${props.userUrl}/api/tasks/${id}`, {
      completed: true
    })
    .then((res)=>{
      setMessage(Math.random())
      setPendingDisplay("none")
      setWidth("80%")
      alert("Marked as completed")
    })
  }

  const assignTask=(id)=>{
    axios.put(`${props.userUrl}/api/users/${_id}`, {
      pendingTasks: id
    })
    .then((res)=>{
      setMessage(Math.random())
      setAvailDisplay("none")
      setWidth("80%")
      alert("Successfully assigned the task.")
    })

  }


  let array = []
  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    axios.get(`${props.userUrl}/api/users/${_id}`)
      .then((res) => {
        setIsLoading(false)
        setUserDetails(res.data.data)
        setPendingTasks(res.data.data.pendingTasks)
      })
      axios.get(`${props.userUrl}/api/tasks?where={'completed':true}`)
      .then((res)=>{
        setAvailableTask(res.data.data)
      })
    
    setLoadPending(true)
    if (pendingTasks != "") {
      if (userDetails != "") {
        setLoadPending(true)
        pendingTasks.map((item) => {

          return array.push(`"${item}"`)
        })
        console.log(array, "array")
        axios.get(`${props.userUrl}/api/tasks?where={'_id': {'$in':[${array}]}}`)
          .then((res) => {
            setNewPenTask(res.data.data)
          })
      }
    }
    else {
      setLoadPending(false)
      setNewPenTask([])
    }

  }, [pendingDisplay,message])


  console.log(newPenTask, "pending tasks")

  if (loading === true) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className='head'  style={{
          width:`${width}`
        }}>
        <div className='taskDetails'>
          <h2 style={{ display: "flex", justifyContent: "center", color: "#6B7280" }}>
            User Details
          </h2><br />
          <div className='taskContent' style={{ justifyContent: "left", width: "30vw" }}>
            <h3>User Name: <span className='taskcontent'>{userDetails.name}</span></h3><br />
            <h3>User Email: <span className='taskcontent'>{userDetails.email}</span></h3><br />
            <h3 className='taskButton' style={{ display: "block" }}>Pending Tasks: <span className='taskcontent'></span> <span className='taskcontent'><button onClick={showPendingTask} className='edit' style={{ margin: "0", fontSize: "1rem" }}>Click here</button></span></h3><br />
            <h3 className='taskButton' style={{ display: "block" }}>Show available Tasks: <span className='taskcontent'></span> <span className='taskcontent'><button onClick={showAvailableTask} className='edit' style={{ margin: "0", fontSize: "1rem" }}>Click here</button></span></h3><br/>
            <div className='taskButton' style={{ justifyContent: "left" }}>
            <button className="edit" style={{margin:"0",fontSize:"1rem"}}><Link className="list" to={`/editUser/${_id}`} state={userDetails}> Edit User Details</Link> </button></div>
          </div>
        </div>
      </div>

      <div style={{
        display: `${pendingDisplay}`,
        position: "fixed",
        top: "0",
        right: "0",
        height: "100%",
        width: "30%",
        backgroundColor: "#111827",
        borderLeft: "1.5px solid white",
        overflowY:"auto",
        padding: "2rem"
        // transition: "10s",
        // scrollBehavior:"smooth"
      }}>
        <div className='pendingtask'>
          <h2 style={{ display: "flex", justifyContent: "center", color: "#6B7280" }}>
            Pending Task List
          </h2><br />
          {
            (newPenTask != "") ?
              (newPenTask.map((item) => {
                return (
                  <>

                    <div className='taskContent' style={{ justifyContent: "left", width: "100%" }}>
                      <h3>Task Name: <Link to={`/tasks/${_id}`} state={item} className="list"> <span style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        transition: "0.4s"
                      }} className='taskcontent'>{item.name}</span></Link></h3>
                      <h3 className='taskButton' style={{ display: "block" }}>To mark this task as completed: <span className='taskcontent'></span> <span className='taskcontent'><button onClick={() => { markComplete(item._id) }} className='edit' style={{ margin: "0", fontSize: "0.9rem" }}>Click here</button></span></h3><br /><br />
                    </div>
                    
                  </>
                )
              })) : (!loadPending ? (<h2>No pending Task</h2>) : "")

          }
        </div>
        
      </div>
      <div style={{
        display: `${availDisplay}`,
        position: "fixed",
        top: "0",
        right: "0",
        height: "100%",
        width: "30%",
        backgroundColor: "#111827",
        borderLeft: "1.5px solid white",
        overflowY:"auto",
        padding: "2rem"
        // transition: "10s",
        // scrollBehavior:"smooth"
      }}>
        <div className='pendingtask'>
          <h2 style={{ display: "flex", justifyContent: "center", color: "#6B7280" }}>
            Available Task List
          </h2><br />
          {
            (availableTask != "") ?
              (availableTask.map((item) => {
                return (
                  <>

                    <div className='taskContent' style={{ justifyContent: "left", width: "100%" }}>
                      <h3>Task Name: <Link to={`/tasks/${_id}`} state={item} className="list"> <span style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        transition: "0.4s"
                      }} className='taskcontent'>{item.name}</span></Link></h3>
                      <h3 className='taskButton' style={{ display: "block" }}>To assign this task: <span className='taskcontent'></span> <span className='taskcontent'><button onClick={() => { assignTask(item._id) }} className='edit' style={{ margin: "0", fontSize: "0.9rem" }}>Click here</button></span></h3><br /><br />
                    </div>
                  </>
                )
              })) : (!loadPending ? (<h2>All tasks are assigned to other users.</h2>) : "")

          }
        </div>
        
      </div>
    </>
  )
}

export default UserDetails