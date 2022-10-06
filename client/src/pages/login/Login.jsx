import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCall } from "../../apiCalls";
import {
  Desc,
  ForgotLink,
  LeftSplit,
  LoginButton,
  LoginError,
  LoginForm,
  LoginInput,
  LoginPage,
  LoginWrapper,
  Logo,
  RegisterButton,
  RightSplit,
} from "../../components/AuthComponents";
import Spinner from "../../components/spinner";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginCall({ email: email, password: password }, dispatch);
  };

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
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
          <LoginForm onSubmit={(e) => handleSubmit(e)}>
            {error && <LoginError>{error.Message || error}</LoginError>}
            <LoginInput placeholder="Email" onChange={(e) => setEmail(e.target.value)} type={"email"} required />
            <LoginInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            <LoginButton type={"submit"} disabled={isFetching}>
              {isFetching ? <Spinner /> : "Log In"}
            </LoginButton>
            <ForgotLink href="/">Forgot Password</ForgotLink>
            <RegisterButton disabled={isFetching} onClick={() => navigate("/register")} type={"button"}>
              Create a new Account
            </RegisterButton>
          </LoginForm>
        </RightSplit>
      </LoginWrapper>
    </LoginPage>
  );
};

export default Login;
