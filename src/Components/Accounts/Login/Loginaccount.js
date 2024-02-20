import React, { useState } from "react";
import {
  signInWithRedirect,
  FacebookAuthProvider,
  signInWithEmailAndPassword
} from "firebase/auth";
import { Divider } from "antd";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField, Button, CircularProgress, Backdrop } from "@mui/material";
import insta from "../Home/Assets/insta.png";
import "../Home/Login-Home.css";
import { Select } from "antd";
import { authentication } from "../../../Firebase-config";
import { Link } from "react-router-dom";
const { Option } = Select;

const Loginaccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = React.useState(false);


  const signInWithFaceBook = () => {
    const provider = new FacebookAuthProvider();
    signInWithRedirect(authentication, provider)
      .then(() => {
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
          window.location.reload();
           // Signed in 
        // ...
      })
      .catch((error) => {
        alert(error);
        window.location.reload();
      });
    }
  };
  
  return (
    <div className='accountSignup'>
      <div className="accountBody">
      <div className="homeLoginAuth logstyle">
      <div className="instagramLogo">
          <img srcSet={insta} className="instaLogo" alt="instalogo" />
        </div>
      <div className="homeEmailLogin">
        <form onSubmit={onSignInSubmit}>
          <div className="loginAuth">
            <div className="createEmail loginInput">
              <TextField
                label="Email"
                className="inputStyle"
                variant="filled"
                size="small"
                fullWidth
                type={'email'}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="createPassword loginInput ">
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
        </form>
      </div>
      <Divider>OR</Divider>

      <div className="homeFacebookLogin">
        <Button fullWidth variant="text" onClick={signInWithFaceBook}>
          <FacebookIcon /> Log In with Facebook
        </Button>
      </div>
      <div className="forgotPassword">
        <p>Forgot password?</p>
      </div>
    </div>
    <div className="noAccount logstyle">
    <p>Don't have an account? <Link className="account-btn" to='/accounts/emailsignup/'>Sign Up</Link></p>
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
  )
}

export default Loginaccount;