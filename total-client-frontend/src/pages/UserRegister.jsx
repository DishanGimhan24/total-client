import React, {useState} from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
import BgImg from "../assets/images/login-bg.jpg";
import axios from "axios";
import {useSelector} from "react-redux";
import Alert from "../components/Alert";


const UserRegister = () => {

    const [alert, setAlert] = useState({type: "", message: ""});

    //get the user from the redux store
    const user = useSelector(state => state.user);

    //if admin not logged in, redirect to login page
    if(!user.currentUser){
        window.location.href = "/login";
    }
    
    const handleRegister = async (e) => {
        e.preventDefault();
            try{
                //get the form data
                const name = e.target[0].value;
                const email = e.target[1].value;
                const password = e.target[2].value;

                //send the form data to the server
                const res = await axios.post("/user/new", {
                    name: name,
                    email: email,
                    password: password,
                });

                if(res.data.success === true){
                    //clear the form
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";

                    //show the success message
                    setAlert({type: "success", message: res.data.message});
                }else{
                    //show the error message
                    setAlert({type: "danger", message: res.data.message});
                }
            }catch(err){
                console.log(err);
            }
    };

  return (
    <div>
      <section className="h-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-4 text-black login-container d-flex flex-column justify-content-center">
              <div className="px-5 ms-xl-4">
                <img src={Logo} alt="Logo" className="img-fluid" />
              </div>
              <div className="align-items-center d-flex h-custom-2 ms-xl-4 mt-0 mt-xl-n5 pt-5 pt-xl-0 px-5">
                <form onSubmit={handleRegister}>
                <center><h3 className="fw-normal mb-3 pb-3 custom-heading">Register</h3></center>
                 
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email"  placeholder="john@example.com">Name</label>
                    <input type="text" id="name" className="form-control form-control-lg" required />
                    </div>

                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email" placeholder="John Doe">Email address</label>
                    <input type="email" id="email" className="form-control form-control-lg" required />
                    
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password" placeholder="********">Password</label>
                  <input type="password" id="password" className="form-control form-control-lg" required />
                    
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block btn-custom" type="submit">Registe</button>

                  </div>
                  <p className="custom-text mb-5 mt-5 pb-lg-2 position-absolute small">&copy; 2024 Total Client. All Rights Reserved</p>
                
                    {alert.message && <Alert type={alert.type} message={alert.message} />}

                    
                   
                 
                </form>
                
              </div>
            </div>
            
            <div className="col-md-8 px-0 d-none d-md-block bg-with-overlay" style={{ backgroundImage: `url(${BgImg})`}}>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserRegister;