import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { postUpdateProfile } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../../redux/action/userAction";

const ModalUpdateProfile = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreViewImage] = useState("");

  const { t } = useTranslation();

  const { show, setShow } = props;
  const handleClose = () => setShow(false);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const res = await postUpdateProfile(username, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogout());
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    if (account) {
      setUsername(account.username);
      if (account.image) {
        setImage(account.image);
        setPreViewImage(`data:image/jpeg;base64,${account.image}`);
      } else {
        setImage("");
        setPreViewImage("");
      }
    }
  }, []);

  return (
    <>
      <Modal
        className="modal-profile"
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row ">
            <div className="col-md-12">
              <label htmlFor="inputName" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={account.username}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                Avatar:
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadImage(e)}
              />
              <label className="col-md-12 img-preview" htmlFor="labelUpload">
                {previewImage ? (
                  <img src={previewImage} />
                ) : (
                  <span>Preview Img</span>
                )}
              </label>
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

export default ModalUpdateProfile;
