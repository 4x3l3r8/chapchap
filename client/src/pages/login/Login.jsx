import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChapChap</h3>
          <span className="loginDesc">Connect with friends and the world around you on ChapChap.</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input type="password" placeholder="Password" className="loginInput" />
            <button className="loginButton">Log In</button>
            <a href="/" className="loginForgot">Forgot Password</a>
            <button className="loginRegisterButton">Create a new Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
