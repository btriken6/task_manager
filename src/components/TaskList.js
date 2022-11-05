import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { Typography, Button, Tab } from '@mui/material'
import '../App.css'
import Loading from './Loading'
import SaveData from './SaveData'
import DeleteID from './DeleteID'
import '../App.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import { NavLink } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

const TaskList = (props) => {
    const url = props.userUrl
    const [loading, setIsLoading] = useState(true)
    const [resultLength, setResultLength] = useState()
    const [randomValue, setRandomValue] = useState(0)
    const [result, setResult] = useState([])
    const [pagenum, setPagenum] = useState(1)
    const [skip, setSkip] = useState(0)
    const [deleteId, setDeletedId] = useState("")
    const [deleteName, setDeletedName] = useState("")
    const [value, setValue] = useState('pendingTasks');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [sortBy, setSortBy] = useState('');

    const sortHandleChange = (event) => {
        setSortBy(event.target.value);
    };
    console.log(sortBy)
    const [sortByInDec, setSortByInDec] = useState('');

    const handleChangeSort = (event) => {
        if (sortBy === "") {
            alert("Please select a sort by method first...")
        }
        else {
            setSortByInDec(event.target.value);
        }
    }
    console.log((sortByInDec))
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

    
    async function getData(sortUrl) {
        axios.get(`${url}/api/tasks?where={'completed':false}&limit=10&skip=${skip}${sortUrl}`)
            .then((res) => {
                const data = res.data.data
                setResult(data)
                setIsLoading(false)
                console.clear()
            })
    }

    const saveResult = (length, data) => {
        setResultLength(length)
        setRandomValue(data)
    }



    useEffect(() => {
        if (value === "allTask") {
            axios.get(`${url}/api/tasks`)
                .then((res) => {
                    console.log(res.data.count)
                    setResultLength(res.data.count)
                    console.clear()
                })
        }
        else if (value === "pendingTasks") {
            axios.get(`${url}/api/tasks?where={'completed':false}`)
                .then((res) => {
                    setResultLength(res.data.count)
                })
        }
        console.clear()
    }, [resultLength, value])

    const sortByResult = (sortUrl) => {
        axios.get(`${url}/api/tasks?limit=10&skip=${skip}&${sortUrl}`)
            .then((res) => {
                console.log(res.data.data)
                const data = res.data.data
                setResult(data)
                setIsLoading(false)
                console.clear()
            })
    }
    const sortByResultDefault = (sortUrl) => {
        axios.get(`${url}/api/tasks?where={'completed':false}&limit=10&skip=${skip}${sortUrl}`)
            .then((res) => {
                const data = res.data.data
                setResult(data)
                setIsLoading(false)
                console.clear()
            })
    }

    useEffect(() => {
        setIsLoading(true)
        if (sortBy == 10) {
            console.log(sortBy, value, sortByInDec)
            if (value === "allTask") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'name':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'name':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'name':0}")
                }
            }
            else if (value === "pendingTasks") {
                console.log(sortBy, value, sortByInDec)
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'name':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'name':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'name':0}")
                }
            }
        }
        else if (sortBy == 20) {
            if (value === "allTask") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'assignedUserName':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'assignedUserName':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'assignedUserName':0}")
                }
            }
            else if (value === "pendingTasks") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'assignedUserName':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'assignedUserName':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'assignedUserName':0}")
                }
            }
        }
        else if (sortBy == 30) {
            if (value === "allTask") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'dateCreated':1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'dateCreated':-1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'dateCreated':-1}")
                }
            }
            else if (value === "pendingTasks") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'dateCreated':1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'dateCreated':-1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("&sort={'dateCreated':-1}")
                }
            }
        }
        else if (sortBy == 40) {
            if (value === "allTask") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'deadline':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'deadline':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResult("sort={'deadline':1}")
                }
            }
            else if (value === "pendingTasks") {
                if (sortByInDec === "desc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("sort={'deadline':-1}")
                }
                else if (sortByInDec === "asc") {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("sort={'deadline':1}")
                }
                else {
                    console.log(sortBy, value, sortByInDec)
                    sortByResultDefault("sort={'deadline':1}")
                }
            }
        }
        else {
            if (value === "allTask") {
                if (sortByInDec === "desc") {
                    axios.get(`${url}/api/tasks?limit=10&skip=${skip}&sort={'name':-1}`)
                        .then((res) => {
                            console.log(res.data.data)
                            const data = res.data.data
                            setResult(data)
                            setIsLoading(false)
                            console.clear()
                        })
                }
                else if (sortByInDec === "asc") {
                    axios.get(`${url}/api/tasks?limit=10&skip=${skip}&sort={'name':1}`)
                        .then((res) => {
                            console.log(res.data.data)
                            const data = res.data.data
                            setResult(data)
                            setIsLoading(false)
                            console.clear()
                        })
                }
                else {
                    axios.get(`${url}/api/tasks?limit=10&skip=${skip}`)
                        .then((res) => {
                            console.log(res.data.data)
                            const data = res.data.data
                            setResult(data)
                            setIsLoading(false)
                            console.clear()
                        })
                }
            }

            else if (value === "pendingTasks") {
                if (sortByInDec === "desc") {
                    getData("&sort={'name':-1}")
                }
                else if (sortByInDec === "asc") {
                    getData("&sort={'name':1}")
                }
                else {
                    getData("")
                }

            }
        }
        console.clear()
    }, [sortBy, value, sortByInDec, skip, randomValue])

    // console.log(resultLength)
    const childFunc = React.useRef(null)

    const childFunc2 = React.useRef(null)
    // const deleteTask = () => {
    //     alert("hello")
    // }
    const deleteUser = (id, name) => {


        setDeletedId(id)
        setDeletedName(name)

        console.log(id)
        console.log(name)
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
                    <h2>TASK LIST</h2><br/>
                    <div className='users'>
                        <div className='create'>
                            <button ><NavLink to={'/createnewtask'} className="navlink">CREATE A TASK</NavLink></button></div><br></br>
                        {/* <SaveData length={resultLength} saveResult={saveResult} childFunc={childFunc} field1="Task Name" type1="text" postURL={`${url}/api/tasks/`} field2="Task Deadline" type2="date" button1="CREATE A TASK" /> */}
                        <div className='pagi'>

                            <button className='prev' onClick={getPrevData}>PREV</button>{skip + 10} of {resultLength}
                            <button className='next' onClick={getNextData}>NEXT</button>
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={handleChange}
                                    value={value}
                                >
                                    <FormControlLabel value="allTask" control={<Radio />} label="All Task" />
                                    <FormControlLabel value="pendingTasks" control={<Radio />} label="Pending Task" />
                                </RadioGroup>

                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel sx={{ color: "white" }} id="demo-select-small">Sort By</InputLabel>
                                <Select sx={{
                                    color: 'white',
                                }}
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={sortBy}
                                    label="Sort By"
                                    InputLabelProps={{
                                        style: { color: 'white' }
                                    }}
                                    onChange={sortHandleChange}
                                >
                                    <MenuItem value={10}>Name</MenuItem>
                                    <MenuItem value={20}>User Name</MenuItem>
                                    <MenuItem value={30}>Date Created</MenuItem>
                                    <MenuItem value={40}>Deadline</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={handleChangeSort}
                                    value={sortByInDec}
                                >
                                    <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                                    <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                                </RadioGroup>

                            </FormControl>
                        </div>
                        {
                            result.map((item) => {
                                const { _id, name, assignedUserName, assignedUser, description, deadline } = item
                                return (
                                    <>
                                        <div
                                            className='user'
                                        >


                                            <div className='content' key={_id}>
                                                <Link to={`${_id}`} state={item} className="list">

                                                    Task Name: {name}

                                                </Link><br />

                                                <Link to={(assignedUserName === "unassigned") ? ("") : (`/users/${assignedUser}`)} className="list">

                                                    Assigned User Name: {assignedUserName}

                                                </Link>
                                            </div>
                                            <div className="actions">
                                                <button className="edit"><Link state={item} to={`/editTask/${_id}`} className="list">Edit</Link></button>
                                                <button onClick={() => { childFunc2.current(); deleteUser(_id, name) }} className="delete">Delete</button>
                                                <DeleteID id={deleteId} name={deleteName} childFunc2={childFunc2} length={resultLength} saveResult={saveResult} type="task" deleteurl={`${url}/api/tasks/`} />
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

export default TaskList