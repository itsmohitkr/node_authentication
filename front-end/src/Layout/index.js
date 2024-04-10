import React from "react";

import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Home from './Home';
import Signup from "./Signup";
import Login from "./Login";



function Layout() {
  
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </Router>
  );
}

export default Layout;
