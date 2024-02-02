import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SingleProduct from './Pages/SingleProduct.jsx';
import Cart from './Pages/Cart';
import Error from './Pages/Error';
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from './Pages/Footer.jsx';
import Navbar from './navbar/Navbar.jsx';
import Login from './Pages/Login.jsx';
const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </>


  )
}

export default App

