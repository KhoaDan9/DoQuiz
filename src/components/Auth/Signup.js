import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    let data = await postRegister(email, password);

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      return;
    }

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        Have a account?<button>Login</button>
      </div>
      <div className="col-4 mx-auto">
        <div className="title">DoQuiz</div>
        <div className="welcome">Sign up</div>
        <div className="content-form">
          <div className="form-group">
            <label>Email(*)</label>
            <input
              type={"email"}
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group pass-group">
            <label>Password(*)</label>
            <input
              type={isShowPassword ? "password" : "text"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(false)}
              >
                <VscEye />
              </span>
            ) : (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(true)}
              >
                <VscEyeClosed />
              </span>
            )}
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type={"text"}
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="btn-submit">
            <button onClick={() => handleSignup()}>Signup</button>
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
export default Signup;
