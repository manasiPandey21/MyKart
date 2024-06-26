import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import PData from '../data/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = (props) => {
  const search = useLocation().search;
  const barcode = new URLSearchParams(search).get('barcode');
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  let cart;
  let currUser;

  useEffect(() => {
    currUser=parseInt(localStorage.getItem('user')) || 0;
    const pdata = PData.find((item) => item.barcode === barcode);
    setProduct(pdata);
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if(!cart[currUser]) cart[currUser]={};
    if (parseInt(cart[currUser][barcode]) >= 1) setQuantity(parseInt(cart[currUser][barcode]));
    else setQuantity(0);
  }, [barcode]);

  const addToCart = () => {
    currUser=parseInt(localStorage.getItem('user')) || 0;
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if(!cart[currUser]) cart[currUser]={};
    cart[currUser][barcode] = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    if (parseInt(cart[currUser][barcode]) >= 1) setQuantity(parseInt(cart[currUser][barcode]));
    else setQuantity(0);
    window.dispatchEvent(new Event("storage"));
    notifyA();
  }

  const incNum = () => {
    currUser=parseInt(localStorage.getItem('user')) || 0;
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if(!cart[currUser]) cart[currUser]={};
    setQuantity(quantity + 1);
    cart[currUser][barcode] = quantity + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  const decNum = () => {
    currUser=parseInt(localStorage.getItem('user')) || 0;
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if(!cart[currUser]) cart[currUser]={};
    setQuantity(quantity - 1);
    cart[currUser][barcode] = quantity - 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  const removeItem = () => {
    currUser=parseInt(localStorage.getItem('user')) || 0;
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) cart = {};
    if(!cart[currUser]) cart[currUser]={};
    setQuantity(0);
    cart[currUser][barcode] = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    notifyB();
  }

  const notifyA = () => toast.success(`${product.name} added to cart`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    },
    );

    const notifyB = () => toast.error(`${product.name} removed from the cart`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      },
      );

  const removeItemFromCartModal = () => (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-1" id="exampleModalLabel">Confirm</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body fs-3">
            {product.name} will be removed from the cart. Are you sure?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary fs-4 px-3" data-bs-dismiss="modal">No</button>
            <button type="button" className="btn btn-outline-danger fs-4 px-3" data-bs-dismiss="modal" onClick={() => removeItem()}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='container py-5 center m-md-5 my-5 '>
      <div className="row py-4 justify-content-center my-5">
        <div className="col-12 col-md-3 my-auto">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
            <div className="carousel-indicators">
              {product.images && product.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.images && product.images.map((pic, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={pic.src} className="d-block w-100" alt={product.name} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
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

                  {removeItemFromCartModal()}
                  <button type="button" className="btn btn-outline-danger btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-trash"></i> Remove</button>
                </div>
              ) : (
                <button type="button" className="btn btn-outline-success btn-lg " onClick={() => addToCart()}>Add to Cart</button>
              )
            }
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default SingleProduct;
