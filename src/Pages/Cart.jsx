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

  useEffect(() => {
    orderSummary();
  })

  const orderSummary = () => {
    let orderValueTemp = 0;
    let totalamountTemp = 0;
    let discountTemp = 0;
    list = JSON.parse(localStorage.getItem('cart')) || {};
    cartItems = Object.keys(list);
    cartItems.forEach((barcode) => {
      let pdata = PData.find((item) => item.barcode === barcode);
      let quantity = list[barcode];

      orderValueTemp += pdata.mrp * quantity;
      totalamountTemp += pdata.price * quantity;
      discountTemp = Math.abs(totalamount - orderValue);
    });

    setOrderValue(orderValueTemp);
    setTotalAmount(totalamountTemp);
    setDiscount(discountTemp);
  }

  const removeAll = () => {
    localStorage.removeItem('cart');
    list = {};
    cartItems = [];
    setOrderValue(0);
    setTotalAmount(0);
    setDiscount(0);
    window.dispatchEvent(new Event("storage"));
  }
  const removeAllModal = () => (
    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-1" id="exampleModalLabel1">Confirm</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body fs-3">
            All products will be removed from the cart. Are you sure?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary fs-4 px-3" data-bs-dismiss="modal">No</button>
            <button type="button" className="btn btn-outline-danger fs-4 px-3" data-bs-dismiss="modal" onClick={() => removeAll()}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    cartItems.length ? (
      <div className="container mt-5">
        <div className="row mt-5  pt-5">
          <div className="col-md-8">
            <div className="card ">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fs-1">Your Cart</span>
                {removeAllModal()}
                <button type="button" className="btn btn-outline-danger btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i className="bi bi-trash"></i>Clear Cart</button>
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
                  <p className="card-text fs-3 mt-4 d-flex justify-content-between align-items-center">Order value <span>₹{orderValue}</span></p>
                  <p className="card-text fs-3 d-flex justify-content-between align-items-center text-success">Discount <span></span>-₹{discount}</p>

                  {
                    orderValue >= '5000' ? (
                      <p className="card-text fs-3 d-flex justify-content-between align-items-center">Shipping Price <span>
                        <span className='product-mrp text-muted ml-2 fw-light fs-3'><s>₹199</s></span>
                        <span className='text-success'>FREE</span>
                      </span></p>
                    ) : (
                      <div>
                        <p className="card-text fs-3 d-flex justify-content-between align-items-center">Shipping Price <span className='product-mrp ml-2 fw-light fs-3'>₹199</span></p>
                        <div className='text-success fs-3'>Add items worth ₹{5000 - orderValue} more to get free delivery on this order.</div>
                      </div>
                    )
                  }
                </div>
                <br />
                <hr />
                <br />
                <p className="card-text fw-bold fs-3 p-3 d-flex justify-content-between align-items-center">Total Amount <span>₹{totalamount}</span></p>
                <a href="#" className="btn btn-success w-100 p-3 fs-4">Login to place Order</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <EmptyPage />
    )
  );
}

export default Cart;
