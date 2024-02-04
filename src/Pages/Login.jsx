import React from 'react';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className='card m-5' style={{ width: "42rem" }}>
        <div className="card-header p-3 fs-3 fw-bold">
          Login
        </div>
        <div className='card-body align-content--start'>
          <form className="row g-3">
            <div className="col-md-12 p-5">
              <label htmlFor="inputEmail4" className="form-label fs-3 my-2 form-group required">
                Email<span className="text-danger">*</span>
              </label>
              <input type="email" className="form-control p-3 fs-4" id="inputEmail4" placeholder="Enter your email" required />
              <br/>
              <label htmlFor="inputPassword4" className="form-label fs-3 my-2 form-group required">
                Password<span className="text-danger">*</span>
              </label>
              <input type="password" className="form-control p-3 fs-4" id="inputPassword4" placeholder="Enter your password" required />
            </div>
            <div className="col-12 mx-4 my-1">
              <button type="submit" className="btn btn-success fs-3 m-3">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
