// React modules
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

// Path
import Header from "../components/Header";

// Material UI modules
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Login = () => {

  // const useState = React.useState();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    var username = event.target.username.value;
    var password = event.target.password.value;
    console.log(username + '\n ' + password);
  
    // Pass data to backend
  
    // Route to Application upon successful authentication
    navigate(`/`)
  
  }
  
  
  return (
    <div>
      <Header loginState={!loggedIn} />

      <Box
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack 
            spacing={5} 
            direction="column" 
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <TextField
              required
              autoFocus
              name="username"
              id="outlined-required"
              placeholder="Username"
              sx={{
                width: 400
              }}
            />
            <TextField
              required
              autoFocus
              name="password"
              id="outlined-disabled"
              type="password"
              placeholder="Password"
              sx={{
                width: 400
              }}
            />

            <Button type="submit" variant="contained" sx={{
                width: 250,
                padding: 1
              }}>
                Login
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Login;
