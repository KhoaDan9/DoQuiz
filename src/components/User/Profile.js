import { useSelector } from "react-redux";
import "./Profile.scss";
import { useState } from "react";
import ModalChangePassword from "./ModalProfile/ModalChangePassword";
import ModalHistory from "./ModalProfile/ModalHistory";
import ModalUpdateProfile from "./ModalProfile/ModalUpdateProfile";

const Profile = () => {
  const account = useSelector((state) => state.user.account);

  const [isShowModalChangePassword, setIsShowModalChangePassword] =
    useState(false);
  const [isShowModalUpdateProfile, setIsShowModalUpdateProfile] =
    useState(false);
  const [isShowModalHistory, setIsShowModalHistory] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <div className="profile-content">
        <div className="div-info">
          <img src={`data:image/jpeg;base64,${account.image}`} />
          <div className="detail">
            <span>{account.username}</span>
            <br></br>
            <span>{account.email}</span>
          </div>
        </div>

        <div className="div-btn">
          <button
            className="profile-btn btn btn-primary"
            onClick={() => setIsShowModalUpdateProfile(true)}
          >
            Update profile
          </button>
          <button
            className="profile-btn btn btn-primary"
            onClick={() => setIsShowModalChangePassword(true)}
          >
            Change password
          </button>
          <button
            className="profile-btn btn btn-primary"
            onClick={() => setIsShowModalHistory(true)}
          >
            Show data
          </button>
        </div>
      </div>
      <ModalChangePassword
        show={isShowModalChangePassword}
        setShow={setIsShowModalChangePassword}
      />
      <ModalHistory show={isShowModalHistory} setShow={setIsShowModalHistory} />

      <ModalUpdateProfile
        show={isShowModalUpdateProfile}
        setShow={setIsShowModalUpdateProfile}
      />
    </div>
  );
};

export default Profile;
