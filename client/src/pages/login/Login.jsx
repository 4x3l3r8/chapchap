import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCall } from "../../apiCalls";
import Spinner from "../../components/spinner";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginCall({ email: email.current.value, password: password.current.value }, dispatch);
  };


  useEffect(() => {
    if (user) {
      email.current.value = "";
      password.current.value = "";
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    email.current.focus();
    return () => {
      dispatch({ type: "RESTING_STATE" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChapChap</h3>
          <span className="loginDesc">Connect with friends and the world around you on ChapChap.</span>
        </div>
        <div className="loginRight">
          <form onSubmit={(e) => handleSubmit(e)} className="loginBox">
            {error && <div className="loginError">{error.Message || error}</div>}
            <input placeholder="Email" type={"email"} className="loginInput" required ref={email} />
            <input type="password" placeholder="Password" className="loginInput" required minLength={8} ref={password} />
            <button className={`loginButton ${isFetching ? "loading" : ""}`} type={"submit"} disabled={isFetching}>
              {isFetching ? <Spinner /> : "Log In"}
            </button>
            <a href="/" className="loginForgot">
              Forgot Password
            </a>
            <button disabled={isFetching} onClick={() => navigate("/register")} className="loginRegisterButton" type={"button"}>
              Create a new Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
