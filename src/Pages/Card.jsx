import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = (props) => {
    const [quantity, setQuantity] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    let cart;
    let currUser;

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const notifyA = () => toast.success(`${props.name} added to cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        containerId: props.barcode
        });

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cart'));
        currUser=parseInt(localStorage.getItem('user')) || 0;
        if(currUser==0) localStorage.setItem('user',0);
        if (!cart) cart = {};
        if(!cart[currUser]) cart[currUser]={};
        if (parseInt(cart[currUser][props.barcode]) >= 1) setQuantity(parseInt(cart[currUser][props.barcode]));
        else setQuantity(0);
    }, [props.barcode]);

    const addToCart = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        currUser=parseInt(localStorage.getItem('user')) || 0;
        if(currUser==0) localStorage.setItem('user',0);
        if (!cart) cart = {};
        if(!cart[currUser]) cart[currUser]={};
        cart[currUser][props.barcode] = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        if (parseInt(cart[currUser][props.barcode]) >= 1) setQuantity(parseInt(cart[currUser][props.barcode]));
        else setQuantity(0);
        window.dispatchEvent(new Event("storage"));
        notifyA();
    }

    const incNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        currUser=parseInt(localStorage.getItem('user')) || 0;
        if(currUser==0) localStorage.setItem('user',0);
        if (!cart) cart = {};
        if(!cart[currUser]) cart[currUser]={};
        setQuantity(quantity + 1);
        cart[currUser][props.barcode] = quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
    }

    const decNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        currUser=parseInt(localStorage.getItem('user')) || 0;
        if(currUser==0) localStorage.setItem('user',0);
        if (!cart) cart = {};
        if(!cart[currUser]) cart[currUser]={};
        setQuantity(quantity - 1);
        cart[currUser][props.barcode] = quantity - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
    }

    return (
        <div className='col-10 col-sm-6 col-md-4 col-lg-3 '>
            <div className='card m-2 border-0 h-100' onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}>
                <NavLink to={`/product?barcode=${props.barcode}`}>
                    {
                        <img src={props.searchImage} className="card-img-top" alt={props.searchImage} />
                    }
                </NavLink>
                <div className="card-body shadow mb-5 bg-body rounded">
                    <h5 className="card-title fw-light fs-3">{props.brand}</h5>
                    <h5 className="card-title fw-normal fs-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {props.name}
                    </h5>
                    <div className='fs-4 fw-lighter'>
                        <span className="badge bg-success h-20 w-1">{props.rating} <i className="bi bi-star-fill"></i></span> <span className='fw-light'> ({props.reviews})</span>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <h5 className="card-title fw-bolder pt-3">
                                ₹{props.price}
                                <span className=" ms-2 text-decoration-line-through fw-light">
                                    ₹{props.mrp}
                                </span>
                            </h5>
                        </div>
                        <div className='col text-end'>
                            {
                                quantity ? (
                                    <div className='align-self-end py-1'>
                                        <span className='border border-success py-2 my-5 rounded  align-content-end'>
                                            <a onClick={() => decNum()}><i className="bi bi-dash-lg m-3 py-4 px-1 align-middle"></i></a>
                                            <span className='fs-3 fw-medium text-success py-5 my-3 align-middle'>{quantity}</span>
                                            <a onClick={() => incNum()}><i className="bi bi-plus-lg py-4 px-4 align-middle"></i></a>
                                        </span>
                                    </div>
                                ) : (
                                    isHovering && (
                                        <button type='button' className='btn btn-outline-success btn-lg on-hover' onClick={() => addToCart()}>
                                            Add to Cart
                                        </button>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer containerId={props.barcode} position="top-right" />
        </div>
    );
}

export default Card;
