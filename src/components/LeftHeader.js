import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import PeopleIcon from '@mui/icons-material/People';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
const LeftHeader = () => {

    return (
        <div className='leftcontent' >
            <div style={{
                display:'flex',
                justifyContent:'center'
            }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        my:3,
                        fontFamily: 'monospace',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Task Manager
                </Typography>
            </div>
            <div style={{
                display:'flex',
                justifyContent:'center',
            }}>
                <Box className='boxHeader' sx={{ display: { md: 'flex' },width:"50%",marginTop:10 }}>

                    <Button startIcon=<PeopleIcon />

                        sx={{ my: 2, color: 'white' }}
                    >
                        <NavLink to={'./users'} className="navlink">Users</NavLink>
                    </Button>

                    <Button startIcon=<TaskAltIcon />

                        sx={{ my: 2, color: 'white' }}
                    >
                        <NavLink to={'./tasks'} className="navlink">TaskList</NavLink>
                    </Button>

                    <Button startIcon=<SettingsIcon />

                        sx={{ my: 2, color: 'white' }}
                    >
                        <NavLink to={'./settings'} className="navlink">Settings</NavLink>
                    </Button>

                </Box>
            </div>
        </div>
    )
}

export default LeftHeader