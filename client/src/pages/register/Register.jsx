import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterCall } from "../../apiCalls";
import {
  Desc,
  LeftSplit,
  LoginButton,
  LoginError,
  LoginForm,
  LoginInput,
  LoginPage,
  LoginWrapper,
  Logo,
  RegisterButton,
  RightSplit
} from "../../components/AuthComponents";
import Spinner from "../../components/spinner";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterCall({ username: username, email: email, password: pass1, passwordConfirm: pass2 }, dispatch);
    if (user) {
      setEmail("");
      setUsername("");
      setPass1("");
      setPass2("");

      navigate("/home");
    }
  };

  useEffect(() => {
    // dispatch({ type: "RESTING_STATE" });
    return () => {
      dispatch({ type: "RESTING_STATE" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginPage>
      <LoginWrapper>
        <LeftSplit>
          <Logo>ChapChap</Logo>
          <Desc>Connect with friends and the world around you on ChapChap.</Desc>
        </LeftSplit>
        <RightSplit>
          <LoginForm onSubmit={(e) => handleSubmit(e)} autoComplete="false">
            {error && <LoginError>{error.Message || error}</LoginError>}
            <LoginInput
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete={"off"}
              id="username"
            />
            <LoginInput
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <LoginInput
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPass1(e.target.value);
              }}
              id="password"
            />
            <LoginInput
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setPass2(e.target.value);
              }}
              id="passwordConfirm"
            />
            <LoginButton isFetching={isFetching} type={"submit"} disabled={isFetching}>
              {isFetching ? <Spinner /> : "Register"}
            </LoginButton>
            {/* <a href="/" className="loginForgot">Forgot Password</a> */}
            <RegisterButton onClick={() => navigate("/login")} disabled={isFetching}>
              Log in to your account
            </RegisterButton>
          </LoginForm>
        </RightSplit>
      </LoginWrapper>
    </LoginPage>
  );
};

export default Register;
