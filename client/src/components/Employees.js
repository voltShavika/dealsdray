import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom'
import DealsdrayContext from '../context/MyContext';

import Container from './Container';
import {API_DELETE, API_EMPLOYEES} from '../api';

export default function Employees() {
  const {loginStatus, employees, setEmployees, removeEmployee} = useContext(DealsdrayContext);
  useEffect(()=> {
    console.log(API_EMPLOYEES);
    axios.get(API_EMPLOYEES).then(res => {
      setEmployees([...res.data])
    }).catch(e => {
      console.log(e);
    })
  }, [])

  const handleDelete = (i) => {
    axios.get(API_DELETE + employees[i]._id).then(res => {
      removeEmployee(i);
    }).catch(e => {
      console.log(e.response);
    })
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
