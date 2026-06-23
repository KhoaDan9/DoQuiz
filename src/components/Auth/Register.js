import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
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
        Have a account?<button onClick={() => navigate("/login")}>Login</button>
        <Language />
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
              type={isShowPassword ? "text" : "password"}
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
            <button onClick={() => handleRegister()}>Sign up</button>
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
export default Register;
