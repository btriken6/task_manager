import React from 'react'
import '../App.css'
import { useState } from 'react'
const Settings = (props) => {
    const [userUrl,setUserUrl] = useState("")
    const sendUrl=()=>{
        if(userUrl!=""){
            props.getUrl(userUrl)
            alert("URL added to the APP")
        }
        else{
            props.getUrl("https://taskmanageapi.herokuapp.com")
        }
        
    }
    return (
        <>
            <header>
                <div className="new-url-form">
                    <input
                        type="text"
                        name="new-url-input"
                        className="new-url-input"
                        onChange={(e)=>{setUserUrl(e.target.value)}}
                        placeholder="Insert URL" /><br />
                    <input
                        type="submit"
                        className="new-url-submit"
                        onClick={sendUrl}
                        value="Add URL" />
                </div>
            </header>
        </>
    )
}

export default Settings