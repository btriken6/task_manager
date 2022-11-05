import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  bgcolor: '#1F2937',
  p: 4,
};

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = useState(true)
  const [field1, setField1] = useState("")
  const [field2, setField2] = useState("")
  const [message, setMessage] = useState("")
  const handleOpen = () => {
    setOpen(true)
    setSuccess(true)
  };

  const postURL = props.postURL
  const handleSubmit = (event) => {
    event.preventDefault()
    setField1("")
    setField2("")
  }
  const saveResult = (length, data) => {
    props.saveResult(length, data)
    console.log(length)
  }

  const saveInsertedData = async (e) => {
    axios.post(postURL, {
      name: field1,
      email: field2
    })
      .then((response) => {
        console.log(response.data.message)
        setSuccess(false)
        console.log(success)
        setMessage(response.data.message)
        saveResult(props.length + 1, Math.random())
        setSuccess(false)
        console.clear()
      })
      .catch((error) => {
        setSuccess(false)
        console.log(success)
        setMessage(error.response.data.message)
        console.clear()
      })
  }


  useEffect(() => {
    setSuccess(true)
    // console.log(success)
    props.childFunc.current = handleOpen
    console.clear()

  }, [])
  return (
    success ? (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} style={{ color: "white" }}>
              <form onSubmit={handleSubmit}>
                <label>{props.field1}<span style={{color:"red",fontSize:"1.5rem"}}>*</span></label>
                <TextField size='small' sx={{ width: "100%", backgroundColor: "white" }} margin="dense" InputLabelProps={{
                  style: { color: 'white' }, shrink: true, required: true
                }}
                
                  id="outlined-required"
                  onChange={(e) => { setField1(e.target.value) }}


                  defaultValue=""
                  type={props.type1}
                /><br></br><br></br>
                <label>{props.field2}<span style={{color:"red",fontSize:"1.5rem"}}>*</span></label>
                <TextField size='small' sx={{ width: "100%", backgroundColor: "white" }} margin="normal" InputLabelProps={{
                  style: { color: 'white' }, shrink: true, required: true
                }}
                
                  id="outlined-required"


                  defaultValue=""
                  type={props.type2}
                  onChange={(e) => { setField2(e.target.value) }}
                />
                <br /><br />
                <Button type="submit" onClick={saveInsertedData} variant='contained' color='primary'>{props.button1}</Button></form>
            </Box>
          </Fade>
        </Modal>
      </div>) : (<div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ color: "white", bgcolor: '#1F2937' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message}!
            </Typography>

          </Box>
        </Modal>
      </div>)

  )
}
