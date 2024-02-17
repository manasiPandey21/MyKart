import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import PData from '../data/products';

const SingleProduct = (props) => {
  const search = useLocation().search;
  const barcode = new URLSearchParams(search).get('barcode');
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  let cart;

  useEffect(() => {
    const pdata = PData.find((item) => item.barcode === barcode);
    setProduct(pdata);
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if (parseInt(cart[barcode]) >= 1) setQuantity(parseInt(cart[barcode]));
    else setQuantity(0);
  }, [barcode]);

  const addToCart = () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    cart[barcode] = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    if (parseInt(cart[barcode]) >= 1) setQuantity(parseInt(cart[barcode]));
    else setQuantity(0);
    window.dispatchEvent(new Event("storage"));
  }

  const incNum = () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    setQuantity(quantity + 1);
    cart[barcode] = quantity + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  const decNum = () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    setQuantity(quantity - 1);
    cart[barcode] = quantity - 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  const removeItem = () => {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    setQuantity(0);
    cart[barcode] = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className='container py-5 center m-md-5 my-5 '>
      <div className="row py-4 justify-content-center my-5">
        <div className="col-12 col-md-3  my-auto ">
          <img src={product.searchImage} className="img-fluid rounded img-thumbnail border-0 mx-auto" alt={props.name} />
        </div>
        <div className="col-12 col-md-7 px-4 my-auto ">
          <h5 className="card-title fw-300 fs-1">{product.name}</h5>
          <p className="card-text fs-2 fw-light">{product.additionalInfo}</p>
          <div className="rating">
            <i className="rating__star far fa-star"></i>
            <i className="rating__star far fa-star"></i>
            <i className="rating__star far fa-star"></i>
            <i className="rating__star far fa-star"></i>
            <i className="rating__star far fa-star"></i>
          </div>
          <hr />
          <div className="row my-2 ml-1 align-items-lg-baseline">
            <h4 className='fw-300  fs-1'>₹{product.price} <span className='product-mrp text-muted ml-2 fw-light fs-3 '><s>₹{product.mrp}</s></span><span className=' fw-bold text-success fs-3 '> {product.discountDisplayLabel} </span></h4>
          </div>
          <div className="row my-2 ml-1 align-items-lg-baseline">
            <h4 className=" fw-100">Color : {product.color}</h4>
            {product && product.sizes && (
              <h4 className="fw-light fs-4">Size: {product.sizes.split(",")[0]}</h4>
            )}
          </div>
          <ul className="mt-3 pl-4 fs-3">

            <li><span className='fw-bold'>•</span> 100% Original Products</li>
            <li><span className='fw-bold'>•</span> Pay on delivery might be available</li>
            <li><span className='fw-bold'>•</span> Easy 14 days returns and exchanges</li>
          </ul>
          <br />
          <hr />
          <br />
          <div>
            {
              quantity ? (
                <div>
                  <span className='btnx border border-success py-2 rounded align-middle me-4'>
                    <a onClick={() => decNum()}><i className="bi bi-dash-lg m-2 py-3 align-middle"></i></a>
                    <span className='fs-3 text-success py-3 px-2 my-3 align-middle'>{quantity}</span>
                    <a onClick={() => incNum()}><i className="bi bi-plus-lg m-2 py-3 align-middle"></i></a>
                  </span>

                  <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => removeItem()}><i className="bi bi-trash"></i> Remove</button>
                </div>
              ) : (
                <button type="button" className="btn btn-outline-success btn-lg " onClick={() => addToCart()}>Add to Cart</button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
