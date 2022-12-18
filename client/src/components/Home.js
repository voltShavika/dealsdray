import React, { useContext } from 'react'
import DealsdrayContext from '../context/MyContext';

import Container from './Container';

export default function Home() {
  const {login} = useContext(DealsdrayContext);

  const handleLogin = () => {

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
              <input type="text" className='form-control' placeholder="Enter your username" />
              <br/>
              <input type="password" className='form-control' />
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
