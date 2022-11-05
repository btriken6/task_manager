import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css'
import { useNavigate, useLocation } from 'react-router-dom'
const EditUser = (props) => {
    const { state } = useLocation()
    const [userName, setUserName] = useState(state.name)
    const [userEmail, setUserEmail] = useState(state.email)




    const navigate = useNavigate()

    const submitHandler = (e) => {
        axios.put(`${props.userUrl}/api/users/${state._id}`, {
            name: userName,
            email: userEmail
        })
            .then(function (response) {
                console.log(response.data)
                alert(response.data.message)
                navigate(-1)
            }).catch((err)=>{
                alert(err.response.data.message)
            })
    }
    return (
        <>
            <div className='head'>
                <div className='boxview'>
                    <h2>Edit User Details</h2>
                    <div className='taskform'>
                        <label>User Name:</label>
                        <input
                            type="text"
                            required
                            name="new-create-input"
                            className="new-create-input"
                            onChange={(event) => { setUserName(event.target.value) }}
                            placeholder="User Name"
                            value={userName} /><br />
                        <label>User Email:</label>
                        <input
                            type="text"
                            required
                            name="new-create-input"
                            className="new-create-input"
                            onChange={(event) => { setUserEmail(event.target.value) }}
                            placeholder="User Email"
                            value={userEmail} /><br /><br/>

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

export default EditUser