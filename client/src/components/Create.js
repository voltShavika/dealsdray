import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Container from './Container'
import {useParams, useNavigate, Navigate} from 'react-router-dom'
import DealsdrayContext from '../context/MyContext';
import { API_CREATE } from '../api';

export default function Create() {
  const {loginStatus, addEmployee}  = useContext(DealsdrayContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();
  const roleRef = useRef();
  const numberRef = useRef();
  const [maleRef, femaleRef] = [useRef(), useRef()]
  const [mcaRef, bcaRef, bscRef] = [useRef(), useRef(), useRef()];

  const handleCreate = () => {
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append('name', nameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('number', numberRef.current.value);
    formData.append('designation', roleRef.current.value)

    let gender;
    if(maleRef.current.checked){
      gender = "M"
    }
    if(femaleRef.current.checked){
      gender = "F"
    }
    formData.append('gender', gender);

    let course;
    if(mcaRef.current.checked){
      course = "MCA"
    }
    if(bcaRef.current.checked){
      course = "BCA"
    }
    if(bscRef.current.checked) {
      course = "BSC"
    }
    formData.append('course', course)
    setLoading(true);
    console.log(formData);
    axios.post(API_CREATE, formData, {}).then(res => {
      setLoading(false);
      setErrors([]);
      addEmployee(res.data);
      navigate("/employees")
    }).catch(e => {
      setLoading(false);
      setErrors([...e.response.data.errors]);
    })
    
  }
  
  return (
    <>
      {
        !loginStatus? <Navigate to="/employees" />:
        <Container>
          <div className='container-fluid'>
            <div className='row pt-5'>
              <div className='col-md-3'></div>
              <div className='col-md-6'>
                <div className='card p-3'>
                  <div className='text-center'>
                    <h3>Add Employee</h3>
                  </div>
                  {
                    errors.length > 0 && 
                    <div className='alert alert-danger'>
                      <ul>
                        {
                          errors.map((e, i) => <li key={i}>{e}</li>)
                        }
                      </ul>
                    </div>
                  }
                  <div className="row mb-2">
                    <div className="col">
                      <label>Profile Image</label>
                      <input type="file" className="form-control" accept='image/*' ref={imageRef}/>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label>Name</label>
                      <input type="text" className="form-control"  ref={nameRef}/>
                    </div>
                    <div className="col">
                      <label>Email</label>
                      <input type="email" className="form-control"  ref={emailRef}/>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className='col'>
                      <label>Number</label>
                      <input type="text" className='form-control' ref={numberRef}/>
                    </div>
                    <div className="col">
                      <label>Designation</label>
                      <select className='form-select' ref={roleRef}>
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
                        <input className="form-check-input" type="radio" name='gender' value="M" ref={maleRef}/>
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='gender' value="F" ref={femaleRef}/>
                        <label className="form-check-label">Female</label>
                      </div>
                    </div>
                    <div className="col">
                      <label>Course</label>
                      <br/>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="BSC" ref={bscRef} />
                        <label className="form-check-label" >BSC</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="BCA" ref={bcaRef} />
                        <label className="form-check-label" >BCA</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name='course' value="MCA" ref={mcaRef} />
                        <label className="form-check-label" >MCA</label>
                      </div>
                    </div>
                  </div>
                  {
                    loading ? 
                    <div className='text-center'>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <br/><br/>
                    </div>
                    :
                    <div className='text-center'>
                      <button className='btn btn-info' onClick={handleCreate}>Add Employee</button>
                    </div>
                    
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </Container>
      }
      
    </>
  )
}
