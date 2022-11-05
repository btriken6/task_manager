import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1F2937',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };
const DeleteID = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () =>{
        setHide(true) 
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [hide,setHide]=React.useState(false)
    useEffect(() => {
        props.childFunc2.current = handleOpen  
        console.clear() 
      }, [])
      const saveResult=(length,rndm)=>{
        props.saveResult(length,rndm)
        console.log(length,rndm)
      }

      const deleteId=()=>{
        axios.delete(`${props.deleteurl}${props.id}`)
        .then((res)=>{
            setHide(false)
            console.log(res)
            // handleClose()
            // alert(res.data.message)
            saveResult(props.length-1,Math.random())
            console.clear()
        })
      }


    return (
        hide?(
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure, you want to delete the {props.type}: {props.name} ?
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="div"
            sx={{
                // bgcolor:'red',
                display:'flex',
                justifyContent:'flex-end'
            }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteId}>Delete</Button></Typography>
          </Box>
        </Modal>
      </div>):""
    );
}

export default DeleteID

