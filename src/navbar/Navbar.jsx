import React, { useState } from 'react';
import "../navbar/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css"
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    return (
        <nav className='navbar navbar-expand navbar-light bg-light fixed-top shadow-sm '>
             <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src="m.png" alt="" width="30" height="24" class="d-inline-block align-text-bottom"/>
           <span className='fw-500 fs-2 align-items-lg-baseline p-2'>  ManasiWorld</span>
    </a>
  </div>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav ms-auto'>
                    <li className="nav-item mx-3">
                    <a href="./cart"><i className="bi bi-cart h3"></i></a>
                       
                    </li>
                    <li className="nav-item mx-3">
                        <i class="bi bi-upload  h3"></i>
                    </li>
                    <li className="nav-item ms-3 me-4">
                    <a href="./login"><i class="bi bi-box-arrow-in-right h3"></i></a>
                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
