import React from 'react'
import { Box } from '@mui/system'
import '../App.css'
import { RotatingLines } from 'react-loader-spinner'
const Loading = () => {
  return (
    <>
        <Box
            sx={{
                position:'absolute',
                width: '80%',
                left:'20%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                minHeight:"100vh"
                // border:'2px solid red',
            }}>

            <RotatingLines 
                strokeColor="#1F2937"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
                />
            </Box>
    </>
  )
}

export default Loading