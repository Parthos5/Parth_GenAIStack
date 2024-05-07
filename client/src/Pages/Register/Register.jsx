import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import "react-dropdown/style.css";
// import ForgotPasswordPopup from "./ForgotPasswordPopup";
// import { FaEye } from "react-icons/fa";
// import url from "../../../url";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
const options = ["University", "SPOC", "Faculty", "Student", "Guest-User"];
const defaultOption = options[0];

// const eye = <FaEye />;

const Register = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("University");

  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const handleClosePopup = () => {
    setShowForgotPasswordPopup(false);
  };
  const handleFocus = (e) => {
    e.target.parentNode.classList.add("focus");
  };

  const handleBlur = (e) => {
    const parent = e.target.parentNode;
    if (e.target.value === "") {
      parent.classList.remove("focus");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = async () => {
      let endpoint = "/api/auth/userRegister";
      try {
        console.log(selectedOption);
        // console.log(selectedOption);
        // console.log(selectedOption)
        console.log(endpoint);
        // console.log("Sending request to:", `${url}${endpoint}`);
        console.log("Sending data:", {
          email: email,
          username: username,
          password: password,
        });

        // const response = await axios.post(`${url}${endpoint}`, {
        //   email: email,
        //   username: username,
        //   password: password,
        // });
        // // /api/v1/university/login
        // // /api/v1/college/college_faculty/login
        // // /api/v1/college/student/login
        // console.log(response);

        localStorage.setItem("email", response.data.email);

        Navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    sendData();
  };

  console.log(selectedOption);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <div className="LoginPageCont">
        <section className="Logincontainer">
          <div className="image-section">
            <div className="image-wrapper">
              <img
                src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8662.jpg"
                alt=""
              />
            </div>

            <div className="content-container">
              <h1 className="section-heading">
              Start living better <br></br> with GenAI Stack
              </h1>
              <p className="section-paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam fuga quam placeat corrupti architecto impedit.
              </p>
            </div>
          </div>

          <form className="form-section" onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <h2>WELCOME BACK! 👋🏻</h2>
              <p>Enter your credentials to access your account.</p>

              <div className="input-container">
                {/* <div className="dropDownDiv">
                  <Dropdown
                    options={options}
                    value={defaultOption}
                    placeholder="Select an option"
                    onChange={(e) => setSelectedOption(e.value)}
                  />
                </div> */}
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    autocomplete="off"
                    placeholder="Enter your email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Username</label>
                  <input
                    type="name"
                    id="name"
                    autocomplete="off"
                    placeholder="Enter your username"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <i onClick={togglePasswordVisiblity}>{eye}</i>{" "} */}
                </div>
              </div>

              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" value="remember-me" id="remember-me" />
                  <label for="remember-me">Remember me</label>
                </div>

                {/* <a href="#" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </a> */}
              </div>

              {/* <button className="login-btn">Log In</button> */}
              <div className="inputSubmitDiv">
                <input type="submit" className="login-btn" value="Sign Up" />
              </div>

              <div className="registerBtnLink">
                <p>
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* {showForgotPasswordPopup && (
        <ForgotPasswordPopup onClose={handleClosePopup} />
      )} */}
    </>
  );
};

export default Register;