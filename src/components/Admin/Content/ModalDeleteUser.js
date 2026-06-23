import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../services/apiService";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const {
    deleteData,
    show,
    setShow,
    fetchListUsers,
    fetchListUsersWithPaginate,
    currentPage,
  } = props;

  const handleClose = () => setShow(false);
  const handleDeleteUser = async () => {
    let data = await deleteUser(deleteData.id);

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

  return (
    <>
      <Modal show={show} onHide={() => handleClose()} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user{" "}
          {deleteData && deleteData.email ? deleteData.email : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
