import React from 'react';
import { NavLink } from 'react-router-dom';


const Card = (props) => {
    let cart;
    const addToCart = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        cart[JSON.parse(props.barcode)] = 1;
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
                        <a style={{ marginLeft: '120px' }}>
                            <button type="button" className="btn btn-outline-success btn-lg" onClick={() => addToCart()}>Add to Cart</button>
                        </a>
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default Card;
