import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const Register = () => {
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  // Dispatch
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.userRegister );
  
  const { loading, error, userInfo } = registerUser;

  useEffect(() => {
    if(userInfo) {
      setInpVal({ ...inpVal, name: "", email: "", password: "", cpassword: "" });
      Toast.success("User logged in scuccessfully");
      history('/');
    }
  }, [history, userInfo]);

  const setVal = (e) => {
    const {name, value} = e.target;
    setInpVal(() => { return { ...inpVal, [name]: value } });
  }

  const addUserData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = inpVal;

    if(name === "") {
      Toast.error("Please Enter Name");
    } else if (email === "") {
      Toast.error("Please Enter Email");
    } else if (!email.includes("@")) {
      Toast.error("Please Enter Valid Email");
    } else if (password === "") {
      Toast.error("Please Enter Password");
    } else if (password.length < 6) {
      Toast.error("Password must be 6 char");
    } else if (password !== cpassword) {
      Toast.error("Password and Confirm Password must be same");
    } else {
      dispatch(register(name, email, password, cpassword));
    }
  }

  return (
    <div className="row">
      <div className='col-md-4'></div>
      <div className='login col-md-4 mt-5'>
        <section>
          <div className="form-data">
            <div className="form_heading text-center">
              <h1>Welcome Back, <br />Register here</h1>
              <p>Hi, we are you glad you are back. Please Login.</p>
            </div>

            <form>
              <div className="mb-3 form-input">
                <label htmlFor="name" className="form-label">Enter Name</label>
                <input type="name" className="form-control" value={inpVal.name} onChange={setVal} id="name" name="name" placeholder="Enter Name" />
              </div>
              <div className="mb-3 form-input">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" value={inpVal.email} onChange={setVal} id="email" name="email" placeholder="Enter Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="two">
                  <input type={!passShow ? "password" : "text" } value={inpVal.password} onChange={setVal} className="form-control" id="password" name="password" placeholder="Enter Password" />
                  <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ?  "Show" : "Hide" }</div>
                  <PasswordStrengthBar password={inpVal.password} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <div className="two">
                  <input type={!cpassShow ? "password" : "text" } value={inpVal.cpassword} onChange={setVal} className="form-control" id="cpassword" name="cpassword" placeholder="Enter Confirm Password" />
                  <div className="showcpass" onClick={() => setcPassShow(!cpassShow)}>{!cpassShow ?  "Show" : "Hide" }</div>
                  <PasswordStrengthBar password={inpVal.cpassword} />
                </div>
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary" onClick={addUserData}>Register</button>
                <p>Already have an account? <NavLink to={"/login"}>Login here</NavLink></p>
              </div>
              </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Register