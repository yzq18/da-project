import React from "react";

import axios from "axios"

import Header from "../components/Header";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Users = () => {
  return (
    <div>
      <Header loginState={false} />

    <Box>
        <h1>Users</h1>

        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    {rows.map((row) => (
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
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */}
    </Box>
    </div>
  );
};

export default Users;
