import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography, Button, Tab } from '@mui/material'
import '../App.css'
import Loading from './Loading'
import SaveData from './SaveData'
import DeleteID from './DeleteID'
import '../App.css'

const UserList = (props) => {
    const url = props.userUrl
    const [loading, setIsLoading] = useState(true)
    const [resultLength, setResultLength] = useState()
    const [result, setResult] = useState([])
    const [pagenum, setPagenum] = useState(1)
    const [skip, setSkip] = useState(0)
    const [userId, setUserId] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")

    // const childFunc = React.useRef(null)
    const getNextData = (() => {
        if (skip >= 0 && skip < resultLength - 10) {
            setSkip(skip + 10)
            setPagenum(pagenum + 1)
        }
        else {
            alert("End of the User List")
        }
    })
    const getPrevData = (() => {
        if (skip > 0) {
            setSkip(skip - 10)
            setPagenum(pagenum - 1)
        }
        else {
            // setSkip(0)
            alert("First Page")
        }
    })
    async function getData() {
        axios.get(`${url}/api/users?sort={'dateCreated':-1}&limit=10&skip=${skip}`)
            .then((res) => {
                const data = res.data.data
                setResult(data)
                setIsLoading(false)
                // console.clear()
            })
    }

    const saveResult = (length) => {
        setResultLength(length)
    }

    useEffect(() => {
        axios.get(`${url}/api/users`)
            .then((res) => {
                setResultLength(res.data.count)
            })
        getData()
        console.clear()
    }, [resultLength])


    useEffect(() => {
        setIsLoading(true);
        console.log(url)
        getData();
        console.clear()
    }, [skip])
    const childFunc = React.useRef(null)
    const childFunc2 = React.useRef(null)
    const childFunc3 = React.useRef(null)
    // const deleteTask = () => {
    //     alert("hello")
    // }
    const deleteUser = (id, name) => {


        setUserId(id)
        setUserName(name)

        console.log(id)
        console.log(name)
    }
    const editUser = (id, name,email) => {


        setUserId(id)
        setUserName(name)
        setUserEmail(email)
        console.log(id,"id")
        console.log(name,"name")
        console.log(email,"email")
    }

    if (loading === true) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <main>
                <section className='user-list'>
                    <h2>USER LIST</h2><br/>
                    <div className='users'>
                    <div className='create'>
                    <button onClick={() => childFunc.current()}>Create User</button></div><br></br>
                    <SaveData length={resultLength} saveResult={saveResult} childFunc={childFunc} field1="User Name" type1="text" postURL={`${url}/api/users/`} field2="User Email" type2="text" button1="CREATE AN USER"/>
                        <div className='pagi'>
                            
                            <button className='prev' onClick={getPrevData}>PREV</button>{skip + 10} of {resultLength}
                            <button className='next' onClick={getNextData}>NEXT</button></div>

                        {
                            result.map((item) => {
                                const { _id, name,email } = item
                                return (
                                    <>
                                        <div
                                            className='user'
                                        >


                                            <div className='content' key={_id}>
                                                <Link to={`${_id}`} className="list">

                                                    User Name: {name}

                                                </Link><br></br>
                                                <Link to={`${_id}`} className="list">

                                                    User Email: {email}

                                                </Link>
                                            </div>
                                            <div className="actions">
                                            <button className="edit"><Link state={item} to={`/editUser/${_id}`} className="list">Edit</Link></button>
                                                <button onClick={()=>{childFunc2.current(); deleteUser(_id,name)}} className="delete">Delete</button>
                                                <DeleteID id={userId} name={userName} childFunc2={childFunc2} length={resultLength} saveResult={saveResult} type="user" deleteurl={`${url}/api/users/`}/>
                                            </div>
                                        </div>
                                    </>
                                )
                                
                            })
                        }


                    </div>
                </section>
            </main>


        </>
    )

}

export default UserList