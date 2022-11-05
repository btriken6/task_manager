import Settings from './components/Settings'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Header from './components/Header'
import TaskList from './components/TaskList'
import UserList from './components/UserList'
import { useState } from 'react'
import LeftHeader from './components/LeftHeader'
import UserDetails from './components/UserDetails'
import TaskDetails from './components/TaskDetails'
import CreateNewTask from './components/CreateNewTask'
import EditTask from './components/EditTask'
import EditUser from './components/EditUser'
const App = () => {
  const [userUrl,setUserUrl] = useState("https://taskmanageapi.herokuapp.com")

  const getUrl=(user)=>{
     setUserUrl(user)
  }

  return (
    <>
      <LeftHeader/>
      <Routes>
        <Route path="/" element={<UserList userUrl={userUrl}/>}/>
        
        <Route path="/:_id" element={<UserDetails userUrl={userUrl}/>}/>
        <Route path="/users/" element={<UserList userUrl={userUrl}/>}/>
        <Route path="/users/:_id" element={<UserDetails userUrl={userUrl}/>}/>
        <Route path="/tasks/" element={<TaskList userUrl={userUrl}/>}/>
        <Route path="/tasks/:_id" element={<TaskDetails userUrl={userUrl}/>}/>
        <Route path="/createnewtask" element={<CreateNewTask userUrl={userUrl}/>}/>
        {/* <Route path="/tasks/editTask/" element={<EditTask userUrl={userUrl}/>}/> */}
        <Route path="/editUser/:_id" element={<EditUser userUrl={userUrl}/>}/>
        <Route path="/editTask/:_id" element={<EditTask userUrl={userUrl}/>}/>
        <Route path="/Settings/" element={<Settings getUrl={getUrl}/>}/>
      </Routes>
    </>
  )
}

export default App