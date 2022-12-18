import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { API_LOGIN } from '../api';
import DealsdrayContext from '../context/MyContext';

import Container from './Container';

export default function Home() {
  const {login} = useContext(DealsdrayContext);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const usernameRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    axios.post(API_LOGIN, {
      name: usernameRef.current.value,
      password: passRef.current.value
    }).then(res => {
      setLoading(false);
      setErrors([]);
      login(res.data, navigate)
      
    }).catch(e => {
      setLoading(false);
      setErrors(e.response.data.errors);
    })
  }
  return (
    <Container>
      <div className='container'>
        <div className='row p-5'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <div className='card p-3'>
              <div className='text-center'>
                <h3>Login</h3>
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
              <input type="text" className='form-control' placeholder="Enter your username" ref={usernameRef} />
              <br/>
              <input type="password" className='form-control' ref={passRef} />
              <br/>
              <button className='btn btn-primary' onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>

      </div>
    </Container>
  )
}
