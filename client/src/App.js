import { useState } from "react";
import DealsdrayContext from "./context/MyContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Create from './components/Create'
import Employees from './components/Employees'
import Edit from './components/Edit'

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  const login = (loggedInUser, navigate) => {
    setUser({...loggedInUser});
    setLoginStatus(true);
    setEmployees([]);
    navigate("/employees");
  }

  const logout = (navigate) => {
    setUser(null);
    setLoginStatus(false);
    setEmployees([]);
    navigate("/");
  }

  const addEmployee = (data) => {
    const oldEmployees = [data, ...employees];
    setEmployees(oldEmployees);
  }

  const updateEmployee = (i, data) => {
    const oldEmployees = [...employees];
    oldEmployees[i] = {...data}
    setEmployees(oldEmployees);
  }

  const removeEmployee = (i) => {
    const oldEmployees = [...employees];
    oldEmployees.splice(i,1);
    setEmployees(oldEmployees);
  }

  return (
    <DealsdrayContext.Provider value={{
      loginStatus: loginStatus,
      user: user,
      setUser: setUser,
      employees: employees,
      setEmployees: setEmployees,
      updateEmployee, updateEmployee,
      addEmployee, addEmployee,
      removeEmployee: removeEmployee,
      login: login,
      logout: logout,
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/create" element={<Create/>}></Route>
          <Route exact path="/employees" element={<Employees/>}></Route>
          <Route exact path="/edit/:index" element={<Edit/>}></Route>
        </Routes>
      </Router>
    </DealsdrayContext.Provider>
    
  );
}

export default App;
