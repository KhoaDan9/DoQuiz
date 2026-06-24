import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    let data = await postLogin(email, password);
    setIsLoading(false);

    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Don't have account yet?
        <button onClick={() => navigate("/register")}>Sign up</button>
        <Language />
      </div>
      <div className="col-4 mx-auto">
        <div className="title">DoQuiz</div>
        <div className="welcome">Hello, who is this?</div>
        <div className="content-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type={"email"}
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={"password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className="btn-submit">
            <button onClick={() => handleLogin()} disabled={isLoading}>
              {isLoading && <ImSpinner10 className="loader-icon" />}

              <span>Login</span>
            </button>
          </div>
          <div className="text-center">
            <span className="go-back" onClick={() => navigate("/")}>
              &#60;&#60; Go to homepage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
