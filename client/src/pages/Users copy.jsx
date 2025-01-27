import React, { useEffect, useState } from "react";

import axios from "axios"

import Header from "../components/Header";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Users = () => {

    const [users, setUsers] = useState([])
    const [userGrps, setUserGrps] = useState([])

    const createUserGroup = async (event) => {
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;
        console.log(username + '\n ' + password);
      
        // Pass data to backend
        var pathname = "http://localhost:3000"
        try {
          const res = await axios.post(`${pathname}/login`, { username, password });
          console.log(res.data);
          setLoggedIn(true)
          navigate(`/`)
        } catch (error) {
          console.error('Error: ', error);
        }
    }


    // useEffect() => {

    // }
    

    return (
        <div>
            <Header loginState={false} />

            <Box
                // justifyContent="space-between"
                // alignItems="center"
                // sx={{
                //     display:"flex",
                //     // flexDirection:"row",
                //     justifyContent:"space-between",
                //     alignItems:"center"
                    
                // }}
            >
                <Stack direction="row" sx={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"baseline"
                    
                }}>
                    <h1>Users</h1>

                    <Stack direction="row">
                        <h3>Group name:</h3>
                        <TextField
                            required
                            autoFocus
                            name="userGrpName"
                            id="outlined-required"
                            placeholder="_______"
                            sx={{
                            width: 50
                            }}
                        />
                        <Button onClick={{createUserGroup}}>Create</Button>
                    </Stack>
                </Stack>
            </Box>

                

                <TableContainer>
                    <Table sx={{ minWidth: 650, border: "1px solid black" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Group</TableCell>
                                <TableCell>Account Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className="newUser">
                                <TableCell component="th" scope="row">
                                    <TextField 
                                        required
                                        autoFocus
                                        name="username"
                                        id="outlined-required"
                                        placeholder="Enter username"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField 
                                        required
                                        autoFocus
                                        name="password"
                                        type="password"
                                        id="outlined-required"
                                        placeholder="Enter password"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField 
                                        required
                                        autoFocus
                                        name="email"
                                        id="outlined-required"
                                        placeholder="Enter email"
                                    />
                                </TableCell>
                                <TableCell>
                                <Select
                                    multiple
                                    value={selectedUserGrps}
                                    onChange={handleUserGrpSelectChange}
                                    renderValue={(selected) => selected.join(", ")}
                                    style={{ width: "150px" }}
                                >
                                    {groups.map((group) => (
                                    <MenuItem key={group} value={group}>
                                        <Checkbox checked={selectedGroups.includes(group)} />
                                        <ListItemText primary={group} />
                                    </MenuItem>
                                    ))}
                                </Select>
                                </TableCell>
                                <TableCell>{row.accountStatus}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary">
                                        Create
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {/* {rows.map((row) => (
                                <TableRow key={row.username}>
                                    <TableCell component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.group}</TableCell>
                                    <TableCell>{row.accountStatus}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary">
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
};

export default Users;
