import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

const Cart = () => {
  const list = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = Object.keys(list);
  console.log(cartItems);

  const removeAll=()=>{
    localStorage.removeItem('cart');
  }
  

  return (
    <div className="container">
      <div className="row mt-5  pt-5">
        <div className="col-md-8">
          <div className="card p-2">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fs-1">Your Cart</span>
              <button type="button" className="btn btn-outline-danger btn-lg" onClick={()=>removeAll()}><i className="bi bi-trash"></i> Clear Cart</button>
            </div>
            {cartItems.map((val, index) => (
              <CartItem key={index} barcode={val} />
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header fw-bold fs-2">
              Order Summary
            </div>
            <div className="card-body">
              <div className='p-3'>
                <p className="card-text fs-3 mt-4 d-flex justify-content-between align-items-center">Order value <span>₹13,196.00</span></p>
                <p className="card-text fs-3 d-flex justify-content-between align-items-center text-success">Discount <span></span>-₹6,949.00</p>
                <p className="card-text fs-3 d-flex justify-content-between align-items-center">Shipping Price <span><span className='product-mrp text-muted ml-2 fw-light fs-3'><s>₹199</s></span> <span className='text-success'>FREE</span></span></p>
              </div>
              <br />
              <hr />
              <br />
              <p className="card-text fw-bold fs-3 p-3 d-flex justify-content-between align-items-center">Total Amount <span>₹6,247.00</span></p>
              <a href="#" className="btn btn-success w-100 p-3 fs-4">Login to place Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
