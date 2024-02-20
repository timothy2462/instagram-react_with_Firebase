import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { authentication } from '../../../Firebase-config';
import LoginHome from './Login-Home'
import Home from "../../Pages/Home/MainHome";

const Auth = () => {
  const [user, setUser] = useState({});
  onAuthStateChanged(authentication, (currentUser)=>{
    setUser(currentUser);
  })
  return (
    <div>
        {user ? <Home /> :
        (
          <LoginHome/>
        )}
    </div>
  )
}

export default Auth