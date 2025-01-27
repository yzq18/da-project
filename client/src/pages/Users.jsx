import React, { useEffect, useState } from "react";

import axios from "axios"

import Header from "../components/Header";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';


const Users = () => {

    // State for storing users fetched from the backend
    const [users, setUsers] = useState([]);

    // State for controlling the form inputs for creating new user
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        email: '',
        group: [], // This will now store an array of selected groups
        accountStatus: false, // Toggle is false initially (Inactive)
    });

    // State for storing available user groups
    const [groups, setGroups] = useState([]);

    // State for creating a new user group
    const [userGrpName, setUserGrpName] = useState('');

    var pathname = "http://localhost:3000"

    // Fetch users data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${pathname}/getAllUsers`);
                // console.log(response.data)
                setUsers(response.data); // assuming response contains an array of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();

        // Fetch available groups from the backend (you can replace this with your own API)
        const fetchUserGroups = async () => {
            try {
                const response = await axios.get(`${pathname}/getUserGroups`); // assuming a groups endpoint
                console.log(response.data)
                setGroups(response.data); // List of available groups
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };
        fetchUserGroups();
    }, []);

    // Handle input change for new user form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    // Handle group selection
    const handleGroupSelectChange = (e) => {
        setNewUser({
            ...newUser,
            group: e.target.value, // Updates the selected groups
        });
    };

    // Handle account status toggle
    const handleAccountStatusChange = (e) => {
        setNewUser({
            ...newUser,
            accountStatus: e.target.checked, // true for active, false for inactive
        });
    };

    // Handle create user form submission
    const handleCreateUser = async () => {
        // Check if the required fields are empty
        if (!newUser.username || !newUser.password || newUser.group.length === 0) {
            alert('Username, Password, and Group are required fields.');
            return;
        }

        // Convert email to an empty string if left blank
        if (newUser.email === '') {
            newUser.email = ''; // Ensure email is empty if not filled
        }
        
        try {
            const response = await axios.post(`${pathname}/createUser`, newUser);
            setUsers([response.data, ...users]); // Add new user at the top of the table
            setNewUser({
                username: '',
                password: '',
                email: '',
                group: [],
                accountStatus: false, // Reset to inactive by default
            }); // Clear the form after submission
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Handle updating a user
    const handleUpdateUser = async (user_username, updatedUserData) => {
        try {
            const response = await axios.put(`${pathname}/updateUser`, updatedUserData);
            const updatedUsers = users.map((user) =>
                user.user_username === user_username ? response.data : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Function to create a new user group
    const createUserGroup = async () => {
        try {
            if (!userGrpName) {
                alert('Group name is required!');
                return;
            }
            const response = await axios.post(`${pathname}/createUserGroup`, { name: userGrpName });
            // After creating the group, you can update the group list
            setGroups([response.data, ...groups]);
            setUserGrpName(''); // Clear the input after creation
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };


    return (
        <div>
            <Header loginState={false} />

            <Box
            >
                <Stack direction="row" sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline"

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
                            value={userGrpName}
                            onChange={(e) => setUserGrpName(e.target.value)}
                            sx={{
                                width: 50
                            }}
                        />
                        <Button onClick={createUserGroup}>Create</Button>
                    </Stack>
                </Stack>
            </Box>



            <TableContainer>
        <Table>
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
            {/* Row for creating new user */}
            <TableRow>
              <TableCell>
                <TextField
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  label="Username"
                  variant="outlined"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Group</InputLabel>
                  <Select
                    multiple
                    value={newUser.group}
                    onChange={handleGroupSelectChange}
                    label="Group"
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {groups.map((group) => (
                      <MenuItem key={group} value={group}>
                        <Checkbox checked={newUser.group.includes(group)} />
                        <ListItemText primary={group} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newUser.accountStatus}
                      onChange={handleAccountStatusChange}
                      color="primary"
                    />
                  }
                  label={newUser.user_enabled ? 'Active' : 'Disabled'}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreateUser}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>

            {/* Rows for displaying existing users with editable fields */}
            {users.map((user, index) => (
              <TableRow key={user.user_username}>
                <TableCell>
                    <Typography variant="body1">{user.user_username}</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    placeholder="To reset password, enter new password here"
                    value={user.user_password}
                    onChange={(e) => {
                      const updatedUser = { ...user, password: e.target.value };
                      setUsers((prevUsers) =>
                        prevUsers.map((u) => (u.user_username === user.user_username ? updatedUser : u))
                      );
                    }}
                    type="password"
                  />
                </TableCell>
                <TableCell>
                    <Typography variant="body1">{user.user_email}</Typography>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Group</InputLabel>
                    <Select
                      multiple
                      value={Array.isArray(user.user_group_groupName) ? user.user_group_groupName : [user.user_group_groupName || '']}
                      onChange={(e) => {
                        const updatedUser = { ...user, group: e.target.value };
                        setUsers((prevUsers) =>
                          prevUsers.map((u) => (u.user_username === user.user_username ? updatedUser : u))
                        );
                      }}
                      label="Group"
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {groups.map((group) => (
                        <MenuItem key={group} value={group}>
                          <Checkbox checked={user.user_group_groupName.includes(group)} />
                          <ListItemText primary={group} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.user_enabled}
                        onChange={(e) => {
                          const updatedUser = {
                            ...user,
                            accountStatus: e.target.checked,
                          };
                          setUsers((prevUsers) =>
                            prevUsers.map((u) => (u.user_username === user.user_username ? updatedUser : u))
                          );
                        }}
                      />
                    }
                    label={user.user_enabled ? 'Active' : 'Disabled'}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateUser(user.user_username, user)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    );
};

export default Users;
