import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useState } from 'react';
import PData from '../data/products';
import EmptyPage from "./EmptyPage"

const Cart = () => {
  let [orderValue, setOrderValue] = useState(0);
  let [totalamount, setTotalAmount] = useState(0);
  let [discount, setDiscount] = useState(0);
  let list = JSON.parse(localStorage.getItem('cart')) || {};
  let cartItems = Object.keys(list);

  useEffect(()=>{
    orderSummary();
  })

  const orderSummary = () => {
    let orderValueTemp=0;
    let totalamountTemp=0;
    let discountTemp=0;
    list = JSON.parse(localStorage.getItem('cart')) || {};
    cartItems = Object.keys(list);
    cartItems.forEach((barcode) => {
      let pdata = PData.find((item) => item.barcode === barcode);
      let quantity=list[barcode];
     
      orderValueTemp += pdata.mrp*quantity;
      totalamountTemp += pdata.price*quantity;
      discountTemp= (totalamount - orderValue);
    });

    setOrderValue(orderValueTemp);
    setTotalAmount(totalamountTemp);
    setDiscount(discountTemp);
  }
  
  const removeAll = () => {
    localStorage.removeItem('cart');
    list={};
    cartItems=[];
    setOrderValue(0);
    setTotalAmount(0);
    setDiscount(0);
    window.dispatchEvent(new Event("storage"));
  }

  return (  
      cartItems.length ? (
        <div className="container mt-5">
          <div className="row mt-5  pt-5">
            <div className="col-md-8">
              <div className="card py-2">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="fs-1">Your Cart</span>
                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => removeAll()}><i className="bi bi-trash"></i> Clear Cart</button>
                </div>
                {cartItems.map((val, index) => (
                  <CartItem key={index} barcode={val} orderSummary={orderSummary} />
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="margin-fixed card sticky-top">
                <div className="card-header fw-bold fs-2 py-3">
                  Order Summary
                </div>
                <div className="card-body">
                  <div className='p-3'>
                    <p className="card-text fs-3 mt-4 d-flex justify-content-between align-items-center">Order value <span>{orderValue}</span></p>
                    <p className="card-text fs-3 d-flex justify-content-between align-items-center text-success">Discount <span></span>{discount}</p>
                    <p className="card-text fs-3 d-flex justify-content-between align-items-center">Shipping Price <span><span className='product-mrp text-muted ml-2 fw-light fs-3'><s>₹199</s></span> <span className='text-success'>FREE</span></span></p>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <p className="card-text fw-bold fs-3 p-3 d-flex justify-content-between align-items-center">Total Amount <span>{totalamount}</span></p>
                  <a href="#" className="btn btn-success w-100 p-3 fs-4">Login to place Order</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <EmptyPage/>
        ) 
  );
}

export default Cart;
