import React from "react";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className="signin-signupform" onSubmit={handleOnSubmit}>
        <h1 className="headloginform">Sign in</h1>
        <div className="social-container">
          <div className="aEle social">
            <i className="fab fa-facebook-f" />
          </div>
          <div  className="aEle social">
            <i className="fab fa-google-plus-g" />
          </div>
          <div  className="aEle social">
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
        <span className="spanEle">or use your account</span>
        <input
        className="inputvalueclass"
          type="text"
          placeholder="Username"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
        className="inputvalueclass"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a className="aEle">Forgot your password?</a>
        <button className="signinsignupbutton">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
