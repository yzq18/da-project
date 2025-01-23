import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider, { dividerClasses } from '@mui/material/Divider';

const Header = (props) => {

  const [loggedIn, setLoggedIn] = useState(props.loginState)

  const navigate = useNavigate();

  const logout = () => {
    console.log(loggedIn + "testtt")
    setLoggedIn(false)
    console.log(loggedIn + "blofuu")
    navigate(`/login`)
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
        // justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      <h2 style={{margin: 0, padding: 25}}>
        Task Management System
      </h2>

      <Divider component="div" orientation="vertical" flexItem />
      <Button>Task Management</Button>
      <Divider orientation="vertical" flexItem />

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
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
      </Stack>
    </Box>
  );
};
export default Header;