import React, { useState } from 'react';
import "../navbar/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {
    let [totalQuantity, setTotalQuantity] = useState(0);
    let list = JSON.parse(localStorage.getItem('cart')) || {};
    let cartItems = Object.keys(list);
    let sum = 0;

    cartItems.forEach((barcode) => {
        sum += list[barcode];
    });
    totalQuantity = sum;

    window.addEventListener("storage", (e) => {
        list = JSON.parse(localStorage.getItem('cart')) || {};
        cartItems = Object.keys(list);
        sum = 0;
        cartItems.forEach((barcode) => {
            sum += list[barcode];
        })
        setTotalQuantity(sum);
    });

    return (
        <nav className='navbar navbar-expand navbar-light bg-light fixed-top shadow-sm py-3 '>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="m.png" alt="" width="30" height="24" className="d-inline-block align-text-bottom" />
                    <span className='fw-500 fs-2 align-items-lg-baseline p-2'>  MyKart</span>
                </a>
            </div>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav ms-auto'>
                    <li className="nav-item mx-3">
                        <a href='./cart' className="bi bi-cart h2 position-relative border-0">
                            <span className="position-absolute top-0 start-90 translate-middle badge badge-primary rounded-circle-small badge rounded-pill bg-success fs-5 fw-light">
                                {totalQuantity}
                            </span>
                        </a>
                    </li>
                    <li className="nav-item mx-3">
                        <i className="bi bi-upload  h3"></i>
                    </li>
                    <li className="nav-item ms-3 me-4">
                        <a href="./login"><i className="bi bi-box-arrow-in-right h2 text-body"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
