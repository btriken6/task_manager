import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate, useLocation } from 'react-router-dom'
const EditTask = (props) => {
    const { state } = useLocation()
    const [result, setResult] = useState([])
    const [userId, setUserId] = useState(state.assignedUser)
    const [taskName, setTaskName] = useState(state.name)
    const [taskDesc, setTaskDesc] = useState(state.description)
    const [taskDeadline, setTaskDeadline] = useState('')
    const [defaultUser, setDefaultUser] = useState('Select an User')

    console.log(state)
    console.log(state.assignedUser)
    useEffect(() => {

        console.log(taskDeadline)
        console.log({ value: taskDeadline })
        const dateString = state.deadline;
        const D = new Date(dateString);
        const result1 = D.getFullYear() + "-" + (D.getMonth() + 1) + "-" + D.getDate();
        setTaskDeadline(result1)
        if (!state.assignedUser == "") {
            axios.get(`${props.userUrl}/api/users/${state.assignedUser}`)
                .then((res) => {
                    const data = res.data.data.name
                    console.log(res.data.data.name)
                    setDefaultUser(data)
                    console.clear()
                })
        }
        console.clear()
    }, [])

    console.log(props.userUrl)
    console.log(userId)


    console.log(taskDeadline)
    console.log({ value: taskDeadline })




    const navigate = useNavigate()

    const userHandler = () => {

        axios.get(`${props.userUrl}/api/users?sort={'dateCreated':-1}`)
            .then((res) => {
                const data = res.data.data
                console.log(res.data.data)
                setResult(data)
                console.clear()
            })
    }
    // console.log(userId)

    const submitHandler = (e) => {

        console.log(taskDeadline)
        axios.put(`${props.userUrl}/api/tasks/${state._id}`, {
            name: taskName,
            description: taskDesc,
            deadline: taskDeadline,
            assignedUser: userId
        })
            .then(function (response) {
                console.log(response.data)
                alert(response.data.message)
                console.clear()
                navigate(-1)
            }).catch((err)=>{
                alert(err.response.data.message)
            })
    }
    return (
        <>
            <div className='head'>
                <div className='boxview'>
                    <h2>Edit Task Details</h2>
                    <div className='taskform'>
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
                            onChange={(event) => { console.log({ value: event.target.value }); setTaskDeadline(event.target.value) }}
                        /><br />
                        <label>Change Assigned User:</label>
                        <select name="userList" value={userId} className='userList' onClick={() => { userHandler() }} onChange={(event) => { setUserId(event.target.value) }}>
                            <option value="">{defaultUser}</option>
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
                                onClick={submitHandler} >Update</button></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditTask