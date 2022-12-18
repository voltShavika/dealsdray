import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import Container from './Container'
import {useParams, useNavigate, Navigate} from 'react-router-dom'
import DealsdrayContext from '../context/MyContext';
import { API_EDIT } from '../api';

export default function Edit() {
  const {index} = useParams();
  const {employees, updateEmployee} = useContext(DealsdrayContext);
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();
  const roleRef = useRef();
  const numberRef = useRef();
  const [maleRef, femaleRef] = [useRef(), useRef()]
  const [mcaRef, bcaRef, bscRef] = [useRef(), useRef(), useRef()];

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append('name', nameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('number', numberRef.current.value);
    formData.append('designation', roleRef.current.value)

    const gender = maleRef.current.checked?"M":"F"
    formData.append('gender', gender);

    let course;
    if(mcaRef.current.checked){
      course = "MCA"
    }
    else if(bcaRef.current.checked){
      course = "BCA"
    }
    else {
      course = "BSC"
    }
    formData.append('course', course)

    axios.post(API_EDIT + employees[index]._id, formData, {}).then(res => {
      if(res.status == 200){
        updateEmployee(index, res.data);
      }
    }).catch(e => {
      console.log(e);
    })
    
  }
  
  return (
    <>
      {
        employees.length < 1 || index > employees.length || index < 0? <Navigate to="/employees" />:
        <Container>
          <div className='container-fluid'>
            <div className='row pt-5'>
              <div className='col-md-3'></div>
              <div className='col-md-6'>
                <div className='card p-3'>
                  <div className='text-center'>
                    <img src={employees[index].image} height="200" width="200" />
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label>Profile Image</label>
                      <input type="file" className="form-control" accept='image/*' ref={imageRef}/>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="First name" defaultValue={employees[index].name} ref={nameRef}/>
                    </div>
                    <div className="col">
                      <label>Email</label>
                      <input type="email" className="form-control" placeholder="Last name" defaultValue={employees[index].email} ref={emailRef}/>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className='col'>
                      <label>Number</label>
                      <input type="text" className='form-control' defaultValue={employees[index].number} ref={numberRef}/>
                    </div>
                    <div className="col">
                      <label>Designation</label>
                      <select className='form-select' ref={roleRef} defaultValue={employees[index].designation}>
                        {
                          ["Sales", "Manager", "HR"].map((role, i) => <option value={role} key={i}>{role}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col'>
                      <label>Gender</label>
                      <br/>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='gender' value="M" defaultChecked={employees[index].gender === 'M'} ref={maleRef}/>
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='gender' value="F" defaultChecked={employees[index].gender === 'F'} ref={femaleRef}/>
                        <label className="form-check-label">Female</label>
                      </div>
                    </div>
                    <div className="col">
                      <label>Course</label>
                      <br/>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="BSC" defaultChecked={employees[index].course === 'BSC'} ref={bscRef} />
                        <label className="form-check-label" >BSC</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="BCA" defaultChecked={employees[index].course === 'BCA'} ref={bcaRef} />
                        <label className="form-check-label" >BCA</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="MCA" defaultChecked={employees[index].course === 'MCA'} ref={mcaRef} />
                        <label className="form-check-label" >MCA</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className='text-center'>
                    <button className='btn btn-info' onClick={handleUpdate}>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      }
      
    </>
  )
}
