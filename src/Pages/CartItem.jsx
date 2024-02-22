import React, { useState } from 'react';
import PData from '../data/products';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartItem = (props) => {
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(0);
    let pdata;
    let cart;

    useEffect(() => {
        pdata = PData.find((item) => item.barcode === props.barcode);
        setProduct(pdata);
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        if (parseInt(cart[props.barcode]) >= 1) setQuantity(parseInt(cart[props.barcode]));
        else setQuantity(0);
    }, [props.barcode]);

    const incNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        setQuantity(quantity + 1);
        cart[props.barcode] = quantity + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        props.orderSummary();
        window.dispatchEvent(new Event("storage"));
    }
    
    const decNum = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        setQuantity(quantity - 1);
        if (quantity <= 1) {
            delete cart[props.barcode];
        } else {
            cart[props.barcode] = quantity - 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        props.orderSummary();
        window.dispatchEvent(new Event("storage"));
    }

    const removeItem = () => {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) cart = {};
        setQuantity(0);
        delete cart[props.barcode];
        localStorage.setItem('cart', JSON.stringify(cart));
        props.orderSummary();
        window.dispatchEvent(new Event("storage"));
        notifyC();
    }

    const notifyC = () => toast.success(`${product.name} removed from the cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        containerId: product.barcode
        },
        );

    const removeItemModal = () => (
        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-1" id="exampleModalLabel2">Confirm</h5>
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
        quantity ? (
            <div className="card-body align-items-start">
                <div className="row p-3 align-items-center">
                    <div className="col-md-3 ">
                        <img src={product?.searchImage} alt="Product" className="img-fluid" />
                    </div>
                    <div className="col-md-8 p-4 ">
                        <h1 className='fw-light fs-2'>{product?.name}</h1>
                        <h2 className='fw-light fs-3'>{product.brand}</h2>
                        <div className="row my-2 align-items-lg-baseline">
                            <h4 className="fw-light fs-5">Color : {product.color}</h4>
                            {product && product.sizes && (
                                <h4 className="fw-light fs-4">Size: {product.sizes.split(",")[0]}</h4>
                            )}
                        </div>
                        <div className="row my-2 align-items-lg-baseline">
                            <h4 className="fw-mz fs-3">₹{product.price} <span className="product-mrp text-muted ml-2 fw-light fs-3"><s>₹{product.mrp}</s></span><span className="fw-300 text-success fs-3"> {product.discountDisplayLabel}</span></h4>
                        </div>
                        <div>
                            <span className='btnx border border-success py-2 my-3 me-3 rounded  align-content-end'>
                                <a onClick={() => decNum()}><i className="bi bi-dash-lg m-3 py-4  align-middle"></i></a>
                                <span className='fs-3 fw-medium text-success py-5 my-3 align-middle'>{quantity}</span>
                                <a onClick={() => incNum()}><i className="bi bi-plus-lg m-3 py-4 align-middle"></i></a>
                            </span>
                            {removeItemModal()}
                            <button type="button" className="btn btn-outline-danger btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i className="bi bi-trash"></i>Remove</button>
                        </div>
                    </div>
                </div>
                <ToastContainer containerId={product.barcode} position="top-right" />
            </div>
        ) : (
            <></>
        )
        
    );
};

export default CartItem;
