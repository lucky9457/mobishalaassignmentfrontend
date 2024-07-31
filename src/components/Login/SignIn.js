import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from '@react-oauth/google';

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 7 });
      setMessage("User logged in successfully!");
      navigate("/");
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  {/*const login = useGoogleLogin({
    /*onSuccess: async (response) => {
      try {
        console.log(response.credential)
        const res = await axios.post('http://localhost:5000/google-login', {
          token: response.credential
        });
        
        Cookies.set("token", res.data.token, { expires: 7 });
        setMessage("User logged in successfully!");
        navigate("/");
      } catch (error) {
        setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
      }
    },
    onError: (error) => {
      setMessage(`Login Failed: ${error}`);
    },
    onSuccess: codeResponse => console.log(codeResponse),
    
  })*/}

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const successlogin = async  credentialResponse => {
    console.log(credentialResponse.credential);
    const token = credentialResponse.credential
    const decoded = jwtDecode(token);
    console.log(decoded)
    localStorage.setItem("profile",JSON.stringify(decoded))
    const {email,name} = decoded
    console.log(email,name,"aaaa")
    
    try {
      document.getElementById("password").value=""
      document.getElementById("username").value=""
      const response = await axios.post("http://localhost:5000/login", {
        "username":email,
        "password":name,
      });
      console.log(response)
      Cookies.set("token", response.data.token, { expires: 7 });
      setMessage("User logged in successfully!");
      navigate("/");
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || "Network Error"}`);
    } finally {
      setLoading(false);
      setUsername("")
      setPassword("")
    }
  }


  return (
    <div className="form-container sign-in-container">
      <form className="signin-signupform" onSubmit={handleSubmit}>
        <h1 className="headloginform">Sign In</h1>
        <GoogleLogin
          onSuccess={successlogin}
          onError={() => {
            console.log('Login Failed');
            alert("failed to login")
          }}
        />
        <div className="social-container">
          <div className="aEle social">
            <i className="fab fa-facebook-f" />
          </div>
          <div onClick={() => login()} className="aEle social">
          <i className="fab fa-linkedin-in" />
          </div>
          <div className="aEle social">
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
        <span className="spanEle">or use your account</span>
        <input
          className="inputvalueclass"
          type="text"
          required
          placeholder="Username"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        required
          className="inputvalueclass"
          type="password"
          placeholder="Password"
          id="password"
          autoComplete="off"

          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="aEle">Forgot your password?</a>
        <button className="signinsignupbutton" type="submit" disabled={loading}>
          {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Sign In'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
