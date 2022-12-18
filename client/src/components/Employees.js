import React from 'react'
import DealsdrayContext from '../context/MyContext';

import Container from './Container';

export default function Employees() {
  const {login} = useContext(DealsdrayContext);
  return (
    <Container>
      <div className='container'>
        <div className='row p-5'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <div className='card p-3'>
              <input type="text" className='form-control' placeholder="Enter your username" />
              <br/>
              <input type="password" className='form-control' />
              <br/>
              <button className='btn btn-primary'>
                Login
              </button>
            </div>
          </div>
        </div>

      </div>
    </Container>
  )
}
