import React, { useState } from 'react';
import userData from '../data/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let cart;

  const handleLogin = (e) => {
    const user = userData.find((user) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', user.id);
      cart=JSON.parse(localStorage.getItem('cart')) || {};
      cart[user.id]={...cart[user.id], ...cart[0]};
      cart[0]={};
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/');
    } else {
      alert('User does not exist');
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className='card m-5' style={{ width: "42rem" }}>
        <div className="card-header p-3 fs-3 fw-bold">
          Login
        </div>
        <div className='card-body align-content--start'>
          <form className="row g-3" onSubmit={handleLogin}>
            <div className="col-md-12 p-5">
              <label htmlFor="inputEmail4" className="form-label fs-3 my-2 form-group required">
                Email<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control p-3 fs-4"
                id="inputEmail4"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="inputPassword4" className="form-label fs-3 my-2 form-group required">
                Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control p-3 fs-4"
                id="inputPassword4"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 mx-4 my-1">
              <button type="submit" className="btn btn-success fs-3 m-3">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
