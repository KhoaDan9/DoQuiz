import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateUser, putUpdateUser } from "../../services/apiService";

const ModalActionUser = (props) => {
  const {
    show,
    setShow,
    fetchListUsers,
    fetchListUsersWithPaginate,
    isCreate,
    currentPage,
    setCurrentPage,
    selectedUser,
    setSelectedUser,
  } = props;
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreViewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleClose = () => {
    setShow(false);

    setEmail("");
    setUsername("");
    setPassword("");
    setRole("USER");
    setImage("");
    setPreViewImage("");

    setSelectedUser({});
  };

  const handleCreateUser = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await postCreateUser(email, username, password, role, image);

    if (data && data.EC === 0) {
      handleClose();
      toast.success(data.EM);
      // await fetchListUsers();
      setCurrentPage(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleUpdateUser = async () => {
    let data = await putUpdateUser(id, username, role, image);

    if (data && data.EC === 0) {
      handleClose();
      toast.success(data.EM);
      // await fetchListUsers();
      await fetchListUsersWithPaginate(currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      setId(selectedUser.id);
      setEmail(selectedUser.email);
      setUsername(selectedUser.username);
      setRole(selectedUser.role);
      if (selectedUser.image) {
        setImage(selectedUser.image);
        setPreViewImage(`data:image/jpeg;base64,${selectedUser.image}`);
      } else {
        setImage("");
        setPreViewImage("");
      }
    }
  }, [isCreate, selectedUser]);

  return (
    <>
      <Modal
        backdrop="static"
        size="xl"
        show={show}
        onHide={() => handleClose()}
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          {isCreate ? (
            <Modal.Title>Add new user</Modal.Title>
          ) : (
            <Modal.Title>Update user</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <form className="row ">
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isCreate}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isCreate}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Img</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          {isCreate ? (
            <Button variant="primary" onClick={() => handleCreateUser()}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleUpdateUser()}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalActionUser;
