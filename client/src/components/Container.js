import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import DealsdrayContext from '../context/MyContext'

import logo from '../icon.jpg'

export default function Container({children}) {
    const {loginStatus, user, logout} = useContext(DealsdrayContext);
    const navigate = useNavigate();
  return (

    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} height="40"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    loginStatus && 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/employees" className="nav-link">Employees</Link>
                            </li>
                            <li className="nav-item">
                                <button className='btn' onClick={()=> logout(navigate)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
        <div>
            {children}
        </div>
    </>
  )
}
