import "./register.css";

const Register = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChapChap</h3>
          <span className="loginDesc">Connect with friends and the world around you on ChapChap.</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" id="username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input type="password" placeholder="Password" id="password" className="loginInput" />
            <input type="password" placeholder="Confirm Password" id="passwordConfirm" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            {/* <a href="/" className="loginForgot">Forgot Password</a> */}
            <button className="loginRegisterButton">Log in to your account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
