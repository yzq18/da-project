import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios"

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider, { dividerClasses } from '@mui/material/Divider';


const Header = (props) => {

  const [loggedIn, setLoggedIn] = useState(props.loginState)

  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn(false)
    navigate(`/login`)
  }

  const toPage = (pathname) => {
    console.log(pathname)
    navigate(`${pathname}`)
  }
  
  return (

    // <div>
    //   <h1>Task Management System</h1>
    //   {/* <nav>
    //     <NavLink to="/">Home</NavLink>
    //     <NavLink to="/about">About</NavLink>
    //     <NavLink to="/users">Users</NavLink>
    //     <NavLink to="/users">Users</NavLink>
    //   </nav> */}
    // </div>
    <Box
      sx={{
        bgcolor: 'grey.A200',
        padding: 2,
        marginBottom: 10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "100%"
      }}
    >
      <Stack 
        direction="row" 
        spacing={1}
      >

      {loggedIn 
        ? 
        <h2 style={{margin: 0, padding: 25}}>
          Task Management System
        </h2> 
        : 
        <h2 onClick={() => toPage("/")} style={{margin: 0, padding: 25}}>
          Task Management System
        </h2>
      }

        {loggedIn ? null : <Divider component="div" orientation="vertical" flexItem />}
        {loggedIn ? null : <Button onClick={() => toPage("/task_management")}>Task Management</Button>}
        {loggedIn ? null : <Divider component="div" orientation="vertical" flexItem />}
        {loggedIn ? null : <Button onClick={() => toPage("/users")}>User Management</Button>}
        {loggedIn ? null : <Divider orientation="vertical" flexItem />}
        
      </Stack>
      
      <Stack 
        direction="row" 
        spacing={2}
      >
        {loggedIn ? null : 
        <Button 
          onClick=""  
          variant="contained" 
          sx={{width: 100, padding: 1}}
        > 
          Profile 
        </Button>}

        {loggedIn ? null : 
        <Button onClick={logout} variant="contained" sx={{
          width: 100,
          padding: 1
        }}>
          Logout
        </Button>}
      </Stack>
    </Box>
  );
};
export default Header;