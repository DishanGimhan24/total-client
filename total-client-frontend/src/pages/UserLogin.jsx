import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice.js";
import Alert from "../components/Alert";
import Logo from "../assets/images/logo.png";
import BgImg from "../assets/images/login-bg.jpg";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ type: "", message: "" });

  //handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    //send data to server
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const response = await axios.post("/auth/user/login", data);

      dispatch(loginStart());
      if (response.data.success) {
        dispatch(loginSuccess(response.data.data));
        setAlert({ type: "success", message: response.data.message });
        window.location.href = "/dashboard";
      } else {
        dispatch(loginFailure(response.data.message));
        setAlert({ type: "danger", message: response.data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="h-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-4 text-black login-container d-flex flex-column justify-content-center">
              <div className="px-5 ms-xl-4">
                <img src={Logo} alt="Logo" className="img-fluid mb-4" />
              </div>
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={handleLogin}>
                <center><h3 className="fw-normal mb-3 pb-3 custom-heading">Login</h3></center>


                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">Email address</label>
                    <input type="email" id="email" className="form-control form-control-lg" required />
                    
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" id="password" className="form-control form-control-lg" required />
                    
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block btn-custom" type="submit">Login</button>

                  </div>
                  <p className="custom-text mb-5 mt-5 pb-lg-2 position-absolute small">&copy; 2024 Total Client. All Rights Reserved</p>
                
                    {alert.message && <Alert type={alert.type} message={alert.message} />}
                    
                   
                 
                </form>
                
              </div>
            </div>
            
            <div className="col-md-8 px-0 d-none d-md-block bg-with-overlay" >
            </div>
          </div>
        </div>
      </section>
      

    </div>
  );
};

export default AdminLogin;
