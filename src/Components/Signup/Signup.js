import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import g from "../../img/google.png";
import signbg from "../../img/signimg.webp";
import "../globalcss/style.css";
import { auth, provider } from "../Login/config.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signup() {
  const [googlelog, setGooglelog] = useState("");
  const [user, setUser]=useState('');
    const [ email, setemail ] = useState('');
    const [ pass, setpass ] = useState('');
   
   

    const handleEmailchange = e => {
         setemail(e.target.value);
        //console.log(email);
        
    }
    const handlePassChange = e => {
        setpass(e.target.value);
        //console.log(pass);
       
    }

    const handleSignup = e => {
      e.preventDefault();
         //console.log(email);
         //console.log(pass);

        createUserWithEmailAndPassword(auth,email,pass)
        .then((user)=>{
          setUser(user.user);
        }).catch((error)=>{
          console.log(error)
        })

        
        
    }
  const handleGoogleLogin = (e) => {
    // console.log(email);
    // console.log(pass);
    signInWithPopup(auth, provider).then((data) => {
      setGooglelog(data.user.email);
      localStorage.setItem("email", data.user.email);
      console.log('login kor')
    });
    
  };

  useEffect(() => {
    setGooglelog(localStorage.getItem("email"));
  });

  const googleLogout = () => {
    localStorage.clear();
    window.location.reload()
  };
  return (
    <>
      {googlelog ? (
        <h2 className=" my-4 pt-5 text-center ">
          <span className="text-danger">Congratulation</span> Google lognin is
          Done !!!!
        </h2>
      ) : (
        <h2 className="my-4 text-center pt-5"> </h2>
      )}
      {
        user&&<><h2>Sign up successfully log in</h2> <button className="btn btn-info rounded-pill"><a className="text-decoration-none text-light px-3" href="/login">Now</a></button></>
      }
      <div className="text-center d-flex ">
        <div className="d-flex shadow-lg mx-auto my-5 marginTopBot">
          <div className="w-50 d-flex mx-4">
            <img
              src={signbg}
              alt="login img"
              className="my-auto"
              width="100%"
            />
          </div>
          <div className="w-50">
            <Container className="border-start w-100   p-5">
              <h4 className="pt-5 pb-3 text-theme-dark border-theme mx-auto">
                Sign-Up
              </h4>
              <div className="py-5 ">
                <form>
                  <input
                    type="text"
                    className="form-control mx-auto"
                    placeholder="Enter Name"
                  />
                  <br />
                  <input
                    type="email"
                    className="form-control  mx-auto"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailchange}
                  />{" "}
                  <br />
                  <input
                    type="password"
                    className="form-control mx-auto"
                    placeholder="Password"
                    value={pass}
                    onChange={handlePassChange}
                  />
                  <br />
                  <button
                    type="submit"
                    className="btn btn-info text-light px-5 py-2 btn"
                    value="Sign Up"
                    onClick={handleSignup}
                  >Sign Up</button>
                </form>
                <p className="my-3 ">
                  Already register ?
                  <Link to="/login" className="ms-2">
                    {" "}
                    Log In
                  </Link>
                </p>
                <button
                  onClick={handleGoogleLogin}
                  className="btn-light my-2 px-5 py-2 btn shadow"
                >
                  <img
                    src={g}
                    className="pe-2"
                    width="28px"
                    height="20px"
                    alt="Google icon"
                  />{" "}
                  Sign in with Google
                </button>
              </div>
            </Container>
          </div>
        </div>
      </div>
      {googlelog ? (
        <button
          className="btn btn-primary px-4 py-2 my-5 rounded"
          onClick={googleLogout}
        >
          Google Log out
        </button>
      ) : (
        <h2 className="my-4 text-center pt-5"></h2>
      )}
    </>
  );
}
