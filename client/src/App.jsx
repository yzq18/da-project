import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from 'react-router-dom';
import Applications from './pages/Applications';
import About from './pages/About';
import Users from './pages/Users';
import Login from './pages/Login';
import TaskManagement from './pages/TaskManagement';



function App() {

  return (
      <Routes>
        <Route path="/" element={<Applications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task_management" element={<TaskManagement />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
      </Routes>
  );
}

export default App;
