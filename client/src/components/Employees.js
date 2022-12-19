import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom'
import DealsdrayContext from '../context/MyContext';

import Container from './Container';
import {API_DELETE, API_EMPLOYEES} from '../api';

export default function Employees() {
  const {loginStatus, employees, setEmployees, removeEmployee} = useContext(DealsdrayContext);

  const [sortBy, setSortBy] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(()=> {
    console.log(API_EMPLOYEES);
    axios.get(API_EMPLOYEES).then(res => {
      setEmployees([...res.data])
    }).catch(e => {
      console.log(e);
    })
  }, [])


  useEffect(()=> {
    let oldEmployees = [...employees];
    switch(sortBy){
      case "name": 
        oldEmployees.sort((a, b) => a.name.localeCompare(b.name))
        break;
      case "email": 
        oldEmployees.sort((a, b) => a.email.localeCompare(b.email))
        break;
      case "date": 
        oldEmployees.sort((a, b) => new Date(a.date) < new Date(b.date))
        break;
      case "id": 
        oldEmployees.sort((a, b) => a._id.localeCompare(b._id))
        break;
      default: 
        console.log("No Sorting");
        break;
    }
    if(keyword.length == 0){
      axios.get(API_EMPLOYEES).then(res => {
        setEmployees([...res.data])
      }).catch(e => {
        console.log(e);
      })
    }
    if(keyword.length > 0 && oldEmployees.length > 0){
      oldEmployees = oldEmployees.filter((emp) => {
        // console.log(emp);
        if(emp.name.indexOf(keyword) > -1){
          return true;
        }
        if(emp.email.indexOf(keyword) > -1){
          return true;
        }
        if(emp._id.indexOf(keyword) > -1){
          return true;
        }
        return false;
      })
      console.log(oldEmployees);
    }
    
    setEmployees(oldEmployees);

  }, [sortBy, keyword])

  const handleDelete = (i) => {
    axios.get(API_DELETE + employees[i]._id).then(res => {
      removeEmployee(i);
    }).catch(e => {
      console.log(e.response);
    })
  }
  
  const handleClear = () => {
    setSortBy("");
    setKeyword("");
  }

  return (
    <>
      {
        !loginStatus? <Navigate to="/" />
        :
        <Container>
          <div className='container-fluid'>
            <div className='row pt-5'>
              <h2>Employees</h2>
              <hr/>
              <div className='row'>
                <div className='col'>
                
                </div>
                <div className='col'>
                  <div className='row'>
                  <div className='col'>
                      <button className='btn btn-primary form-control' onClick={handleClear}>Clear</button>
                    </div>
                    <div className='col'>
                      <select className='form-select' value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
                        <option value=""></option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="date">Date</option>
                        <option value="id">Id</option>
                      </select>
                    </div>
                    <div className='col'>
                      <input type="text" placeholder='Search by keyword' className='form-control' value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Course</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees.map((emp, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{emp._id}</th>
                          <td>
                            <img src={emp.image} height="50" width="50"/>
                          </td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.number}</td>
                          <td>{emp.designation}</td>
                          <td>{emp.course}</td>
                          <td>{(new Date(emp.createdAt)).toLocaleString()}</td>
                          <td>
                            <div className='text-center'>
                              <Link to={`/edit/${i}`} className='btn btn-primary'>Edit</Link>
                              <button className='btn btn-danger' onClick={()=> handleDelete(i)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      }
    </>
  )
}
