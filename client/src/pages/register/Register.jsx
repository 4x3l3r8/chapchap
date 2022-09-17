import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterCall } from "../../apiCalls";
import Spinner from "../../components/spinner";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const pass1 = useRef();
  const pass2 = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterCall(
      { username: username.current.value, email: email.current.value, password: pass1.current.value, passwordConfirm: pass2.current.value },
      dispatch
    );
    if (user) {
      email.current.value = "";
      username.current.value = "";
      pass1.current.value = "";
      pass2.current.value = "";

      navigate("/home");
    }
  };

  useEffect(() => {
    email.current.focus();
    return () => {
      dispatch({ type: "RESTING_STATE" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user, isFetching, error);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ChapChap</h3>
          <span className="loginDesc">Connect with friends and the world around you on ChapChap.</span>
        </div>
        <div className="loginRight">
          <form onSubmit={(e) => handleSubmit(e)} className="registerBox" autoComplete="false">
            {error && <div className="loginError">{error || error.Message}</div>}
            <input placeholder="Username" autoComplete={"off"} ref={username} id="username" className="loginInput" />
            <input placeholder="Email" ref={email} className="loginInput" />
            <input type="password" ref={pass1} placeholder="Password" id="password" className="loginInput" />
            <input type="password" ref={pass2} placeholder="Confirm Password" id="passwordConfirm" className="loginInput" />
            <button className={`loginButton ${isFetching ? "loading" : ""}`} type={"submit"} disabled={isFetching}>
              {isFetching ? <Spinner /> : "Register"}
            </button>
            {/* <a href="/" className="loginForgot">Forgot Password</a> */}
            <button onClick={() => navigate("/login")} disabled={isFetching} className="loginRegisterButton">
              Log in to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
