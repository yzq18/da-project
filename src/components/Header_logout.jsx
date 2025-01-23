import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Header = () => {

  const [loggedIn, setLoggedIn] = useState(true)

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
      alignItems="center"
      justifyContent="center"
      sx={{
        bgcolor: 'grey.A200',
        alignmentBaseline: 'center',
        padding: 2,
        marginBottom: 10
      }}
    >
      <h2 style={{margin: 0, paddingLeft:5}}>
        Task Management System
      </h2>

      {loggedIn ? <Button onClick=""  variant="contained" sx={{width: 250, padding: 1}}> Profile </Button> : null}
      <Button onClick={logout} variant="contained" sx={{
        width: 250,
        padding: 1
      }}>
        Logout
      </Button>
    </Box>
  );
};
export default Header;