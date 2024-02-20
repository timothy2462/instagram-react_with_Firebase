import React, { useState } from "react";
import {
  signInWithRedirect,
  FacebookAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { authentication } from "../../../Firebase-config";
import { Divider } from "antd";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField, Button, CircularProgress, Backdrop } from "@mui/material";
import loginImage from "./Assets/Instagramloginimage.png";
import insta from "./Assets/insta.png";
import "./Login-Home.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select;


const LoginHome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const [open, setOpen] = React.useState(false);


  const signInWithFaceBook = () => {
    const provider = new FacebookAuthProvider();
    signInWithRedirect(authentication, provider)
      .then((result) => {
      })
      .catch((error) => {
      });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setOpen(!open);
    if(email && password){
    signInWithEmailAndPassword(authentication, email, password)
    .then(() => {
        setOpen(false); 
        alert('Login successful');
        window.location.reload();   // Signed in 
      // ...
    })
    .catch((error) => {
      alert(error);
      window.location.reload();
    });
    }
  };

  

  return (
    <div className="homeLogin">
      <div className="homeLoginBody">
        <div className="homeLoginImage">
          <img
            srcSet={loginImage}
            className="loginImage"
            alt="instagram login"
          />
        </div>
        <div>
        <div className="homeLoginAuth logstyle">
          <div className="homeEmailLogin">
            <div className="instagramLogo">
              <img srcSet={insta} className="instaLogo" alt="instalogo" />
            </div>
            <form onSubmit={onSignInSubmit}>
              <div className="loginAuth">
                <div className="loginEmail loginInput">
                  <TextField
                    label="Email"
                    className="inputStyle"
                    variant="filled"
                    size="small"
                    fullWidth
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword  loginInput">
                      <TextField
                      label="Password"
                      className="inputStyle"
                      variant="filled"
                      size="small"
                      fullWidth
                      type={'password'}
                      required
                      onChange={(e) => (setPassword(e.target.value))}
                    />
                    
                </div>
                <div className="loginButton">
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="info"
                    >
                      Log In
                    </Button>
                    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  <CircularProgress color="inherit" />
</Backdrop>
                </div>
              </div>
              <div id="sign-in-button"></div>
            </form>
            <Divider>OR</Divider>
          </div>
          <div className="homeFacebookLogin">
            <Button variant="text" onClick={signInWithFaceBook}>
              <FacebookIcon /> Log In with Facebook
            </Button>
          </div>
          <div className="forgotPassword">
            <p>Forgot password</p>
          </div>
        </div>
        <div className="noAccount logstyle">
          <p>Don't have an account? <Link className="account-btn" to='/accounts/emailsignup/'>Sign Up</Link></p>
        </div>
        </div>
      </div>

      <div className="homeLoginFooter">
        <ul className="loginFooterList">
          <li className="loginFooterLinks">Meta</li>
          <li className="loginFooterLinks">About</li>
          <li className="loginFooterLinks">Blog</li>
          <li className="loginFooterLinks">Jobs</li>
          <li className="loginFooterLinks">Help</li>
          <li className="loginFooterLinks">API</li>
          <li className="loginFooterLinks">Privacy</li>
          <li className="loginFooterLinks">Terms</li>
          <li className="loginFooterLinks">Top Accounts</li>
          <li className="loginFooterLinks">Hashtags</li>
          <li className="loginFooterLinks">Locations</li>
          <li className="loginFooterLinks">Instagram Lite</li>
          <li className="loginFooterLinks">Contact Uploading & Non-Users</li>
          <li className="loginFooterLinks">Dance</li>
          <li className="loginFooterLinks">Food & Drink</li>
          <li className="loginFooterLinks">Home & Garden</li>
          <li className="loginFooterLinks">Music</li>
          <li className="loginFooterLinks">Visual Arts</li>
        </ul>
        <div className="loginFooterBottom">
          <Select
            defaultValue="English"
            style={{
              width: 95,
            }}
            bordered={false}
          >
            <Option value="French">French</Option>
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="Yoruba">Yoruba</Option>
            <Option value="Xhosa">isiXhosa</Option>
            <Option value="Afrikaana">Afrikaans</Option>
          </Select>
          © 2022 Instagram from Meta
        </div>
      </div>
    </div>
  );
};

export default LoginHome;
