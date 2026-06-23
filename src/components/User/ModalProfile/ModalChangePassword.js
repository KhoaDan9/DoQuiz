import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { postChangePassword } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { doLogout } from "../../../redux/action/userAction";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const ModalChangePassword = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [isShowPassword1, setIsShowPassword1] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  const { show, setShow } = props;
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    const res = await postChangePassword(currentPw, newPw);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogout());
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal
        className="modal-change-password"
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row ">
            <div className="col-md-12 pass-group">
              <label htmlFor="inputCurrentPw" className="form-label">
                Current Password:
              </label>
              <input
                type={isShowPassword1 ? "text" : "password"}
                className="form-control "
                id="inputCurrentPw"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
              />
              {isShowPassword1 ? (
                <span
                  className="icons-eye"
                  onClick={() => setIsShowPassword1(false)}
                >
                  <VscEye />
                </span>
              ) : (
                <span
                  className="icons-eye"
                  onClick={() => setIsShowPassword1(true)}
                >
                  <VscEyeClosed />
                </span>
              )}
            </div>
            <div className="col-md-12 pass-group">
              <label htmlFor="inputNewPw" className="form-label">
                New Password:
              </label>
              <input
                type={isShowPassword2 ? "text" : "password"}
                className="form-control pass-group"
                id="inputNewPw"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
              {isShowPassword2 ? (
                <span
                  className="icons-eye"
                  onClick={() => setIsShowPassword2(false)}
                >
                  <VscEye />
                </span>
              ) : (
                <span
                  className="icons-eye"
                  onClick={() => setIsShowPassword2(true)}
                >
                  <VscEyeClosed />
                </span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
