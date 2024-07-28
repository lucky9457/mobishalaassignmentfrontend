import React from "react";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="signin-signupform" onSubmit={handleOnSubmit}>
        <h1  className="headloginform">Create Account</h1>
        <div className="social-container">
          <div  className=" aEle social">
            <i className="fab fa-facebook-f" />
          </div>
          <div  className="aEle  social">
            <i className="fab fa-google-plus-g" />
          </div>
          <div  className="aEle social">
            <i className="fab fa-linkedin-in" />
          </div>
        </div>
        <span className="spanEle">{/*or use your email for registration*/}</span>
        <input
        className="inputvalueclass"
          type="text"
          name="name"
          
          value={state.name}
          onChange={handleChange}
          placeholder="User Name"
        />
        
        <input
        className="inputvalueclass"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="signinsignupbutton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
