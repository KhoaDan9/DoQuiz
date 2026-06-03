import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("login");
    let data = await postLogin(email, password);
    console.log(data);

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      return;
    }

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Don't have account yet?
        <button onClick={() => navigate("/signup")}>Sign up</button>
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
            />
          </div>
          <span className="forgot-password">Forgot password?</span>
          <div className="btn-submit">
            <button onClick={() => handleLogin()}>Login</button>
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
