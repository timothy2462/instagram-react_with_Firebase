import React, { useState } from "react";
import {
  signInWithRedirect,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Divider } from "antd";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField, Button, CircularProgress, Backdrop } from "@mui/material";
import insta from "../Home/Assets/insta.png";
import "../Home/Login-Home.css";
import { Select } from "antd";
import { authentication } from "../../../Firebase-config";
import { Link } from "react-router-dom";
import { faker } from '@faker-js/faker';

const { Option } = Select;

const Createaccount = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const profilePicUrl = faker.image.avatar()

  const signInWithFaceBook = () => {
    const provider = new FacebookAuthProvider();
    signInWithRedirect(authentication, provider)
      .then((result) => {
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setOpen(!open);
    if (email && password && fullName) {
      createUserWithEmailAndPassword (authentication, email, password)
        .then(async () => {
          if((email) && (password) && (fullName)){
            updateProfile(authentication.currentUser, {
              displayName: fullName,
              photoURL: profilePicUrl
            });
          }
          // ...
          alert('Sign up successful');
          window.location.reload();
        })
        .catch((error) => {
          // ..
          alert(error);
          window.location.reload();
        });
    }
  };

  

  return (
    <div className="accountSignup">
      <div className="accountBody">
        <div className="homeLoginAuth logstyle">
          <div className="instagramLogo">
            <img srcSet={insta} className="instaLogo" alt="instalogo" />
          </div>
          <div className="signUpText">
            Sign up to see photos and videos from your friends.
          </div>
          <div className="homeFacebookLogin">
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={signInWithFaceBook}
            >
              <FacebookIcon /> Log In with Facebook
            </Button>
            <Divider>OR</Divider>
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
                    type={"email"}
                    required
                    value={email.value}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="createFullName loginInput">
                  <TextField
                    label="Full Name"
                    className="inputStyle"
                    variant="filled"
                    size="small"
                    fullWidth
                    type={"text"}
                    required
                    value={fullName.value}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="createPassword  loginInput">
                  <TextField
                    label="Password"
                    className="inputStyle"
                    variant="filled"
                    size="small"
                    fullWidth
                    value={password.value}
                    type={"password"}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="SignUpPolicy">
                  <p>
                    People who use our service may have uploaded your contact
                    information to Instagram. <b>Learn More</b>
                  </p>
                  <p>
                    By signing up, you agree to our Terms , Privacy Policy and
                    Cookies Policy .
                  </p>
                </div>
                <div className="loginButton">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="info"
                  >
                    Sign Up
                  </Button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="noAccount logstyle">
          <p>
            Have an account?{" "}
            <Link to="/accounts/login/" className="account-btn">
              Log in
            </Link>
          </p>
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

export default Createaccount;
