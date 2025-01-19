import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import TaskDashboard from './components/TaskDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  return (
    <Router>
      {isLoggedIn && <Navbar/>}
      <Switch>
        <Route path="/login">
          {!isLoggedIn ? <Login  /> : <Redirect to="/" />}
        </Route>
        <Route path="/register">
         <Register/>  
        </Route>
        <Route path="/task-dash">
          {isLoggedIn ? <TaskDashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
       
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
