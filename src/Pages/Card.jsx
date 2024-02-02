import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PData from '../data/products';

const Card = (props) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        if (parseInt(cart[props.barcode]) >= 1) setQuantity(parseInt(cart[props.barcode]));
        else setQuantity(0);
    }, [props.barcode]);

    let cart;

    const addToCart = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        cart[props.barcode] = 1;
        localStorage.setItem('cart', JSON.stringify(cart));

        if (parseInt(cart[props.barcode]) >= 1) setQuantity(parseInt(cart[props.barcode]));
        else setQuantity(0);
    }
    const incNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        setQuantity(quantity + 1);
        cart[props.barcode] = quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    const decNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        setQuantity(quantity - 1);
        cart[props.barcode] = quantity - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (

        <div className='col-md-3 col-10 col-sm-6 mx-auto'>
            <div className='card m-2 border-0  h-100 card-hover'>
                <NavLink to={`/product?barcode=${props.barcode}`}>
                    <img src={props.searchImage} className="card-img-top" alt={props.searchImage} />
                </NavLink>
                <div className="card-body shadow p-3 mb-5 bg-body rounded">
                    <h5 className="card-title fw-light fs-3">{props.brand}</h5>
                    <h5 className="card-title fw-normal fs-3">{props.name}</h5>
                    <div className='fs-4 fw-lighter'>
                        <span class="badge bg-success h-20 w-1">{props.rating} <i className="bi bi-star-fill"></i></span> <span className='fw-light'> ({props.reviews})</span>
                    </div>
                    <h5 className="card-title fw-bolder pt-3">
                        ₹{props.price}
                        <span className="text-decoration-line-through fw-light">
                            ₹{props.mrp}
                        </span>
                        {
                            quantity ? (
                                <div className='align-self-end'>
                                    <span className='border border-success p-2 m-5 rounded align-middle align-content-end'>
                                        <a onClick={() => decNum()}><i className="bi bi-dash-lg m-2 py-3 align-middle"></i></a>
                                        <span className='fs-3 fw-medium text-success py-3 px-2 my-3 align-middle'>{quantity}</span>
                                        <a onClick={() => incNum()}><i class="bi bi-plus-lg m-2 py-3 align-middle"></i></a>
                                    </span>
                                </div>
                            ) : (
                                <button type="button" className="btn btn-outline-success btn-lg " onClick={() => addToCart()}>Add to Cart</button>
                            )
                        }
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default Card;
