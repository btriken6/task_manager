import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
const CreateNewTask = (props) => {
    const [result, setResult] = useState([])
    const [userId, setUserId] = useState('')
    const [taskName, setTaskName] = useState('')
    const [taskDesc, setTaskDesc] = useState('')
    const [taskDeadline, setTaskDeadline] = useState('')
    const [message, setMessage] = useState(0)

    const navigate = useNavigate()

    const userHandler = () => {
        console.log(userId)
        axios.get(`${props.userUrl}/api/users?sort={'dateCreated':-1}`)
            .then((res) => {
                const data = res.data.data
                console.log(res.data.data)
                setResult(data)
                console.clear()
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const submitHandler = (e) => {

        axios.post(`${props.userUrl}/api/tasks`, {
            name: taskName,
            description: taskDesc,
            deadline: taskDeadline,
            assignedUser: userId
        })
            .then(function (response) {
                // setSuccess(false)
                // console.log(response.data)
                
                alert("Successfully Created the Task")
                
                navigate(-1)

            })
    }



    return (
        <>
            <div className='head'>
                <div className='boxview'>
                    <h2>Create New Task</h2>
                    <form className='taskform' onSubmit={handleSubmit}>
                        <label>Task Name:</label>
                        <input
                            type="text"
                            required
                            name="new-create-input"
                            className="new-create-input"
                            onChange={(event) => { setTaskName(event.target.value) }}
                            placeholder="Task Name"
                            value={taskName} /><br />
                        <label>Task Description:</label>
                        <input
                            type="text"
                            name="new-create-input"
                            className="new-create-input"
                            onChange={(event) => { setTaskDesc(event.target.value) }}
                            placeholder="Task Description"
                            value={taskDesc} /><br />
                        <label>Task Deadline:</label>
                        <input
                            type="date"
                            required
                            value={taskDeadline}
                            name="new-create-input"
                            className="new-create-input"
                            onChange={(event) => { setTaskDeadline(event.target.value) }}
                        /><br />
                        <label>Assign An User:</label>
                        <select name="userList" value={userId} className='userList' onClick={() => { userHandler() }} onChange={(event) => { setUserId(event.target.value) }}>
                            <option value="">Select an User</option>
                            {
                                result.map((item) => {
                                    const { name } = item
                                    return (
                                        <option value={item._id} key={item._id}>{item.name}</option>
                                    )
                                })
                            }
                        </select><br />

                        <div className='create'>
                            <button
                                type='submit'
                                onClick={submitHandler} >Submit</button></div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default CreateNewTask