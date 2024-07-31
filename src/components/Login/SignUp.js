import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie"

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      document.getElementById("password").value=""
      document.getElementById("username").value=""
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  const register = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post('http://localhost:5000/google-register', {
          token: response.credential
        });
        setMessage(res.data.message);
        navigate("/");
      } catch (error) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
      }
    },
    onError: (error) => {
      setMessage(`Registration Failed: ${error.message}`);
    },
  });

  const successregister = async  credentialResponse => {
    console.log(credentialResponse.credential);
    const token = credentialResponse.credential
    const decoded = await jwtDecode(token);
    console.log(decoded)
    localStorage.setItem("profile",JSON.stringify(decoded))
    const {email,name} = decoded
    console.log(email,name,"aaaa")
    


    setUsername(email)
    setPassword(name)
    try {
      document.getElementById("usernameSignup").value=""
      document.getElementById("passwordSignup").value=""
      const response = await axios.post("http://localhost:5000/register", {
        "username":email,
            "password":name,
      });
      setMessage(response.data.message);
      if(response.data.message=="User registered successfully"){
        try {
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
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }


  return (
    <div className="form-container sign-up-container">
      <form className="signin-signupform" onSubmit={handleOnSubmit}>
        <h1 className="headloginform">Create Account</h1>
        <GoogleLogin
          onSuccess={successregister}
          onError={() => {
            console.log('Login Failed');
            alert("failed to login")
          }}
        />
        <div className="social-container">
          <div className="aEle social">
            <i className="fab fa-facebook-f" />
          </div>
          <div onClick={() => register()} className="aEle social">
            <i className="fab fa-google-plus-g" />
          </div>
          <div className="aEle social">
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
        <span className="spanEle">or use your email for registration</span>
        <input
          className="inputvalueclass"
          type="text"
          name="name"
          id="usernameSignup"
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User Name"
        />
        <input
          className="inputvalueclass"
          type="password"
          name="password"
          required
          id="passwordSignup"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="signinsignupbutton" type="submit" disabled={loading}>
          {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Sign Up'}
        </button>
        {message && <p className="floating-message-login">{message}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
