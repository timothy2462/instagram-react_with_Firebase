import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "./Assets/404.png";


const Error = () => {
  let navigate = useNavigate();
  function shopping() {
    navigate('/')
  }
  return (
    <div className="errorPage">
      <img srcSet={errorImage} alt="404 error" width={"40%"} />
      <Button variant="contained" color="info" onClick={shopping}>
        Check new posts
      </Button>
    </div>
  );
};

export default Error;
