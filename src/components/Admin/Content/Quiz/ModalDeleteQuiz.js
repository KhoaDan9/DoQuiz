import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../services/apiService";
import { useTranslation } from "react-i18next";

function ModalDeleteQuiz(props) {
  const { deleteData, show, setShow, fetchListQuiz } = props;
  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleDeleteQuiz = async () => {
    let data = await deleteQuiz(deleteData.id);

    if (data && data.EC === 0) {
      handleClose();
      toast.success(data.EM);
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose()} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("quiz-mng.delete-title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("quiz-mng.delete-body")}{" "}
          <b>
            {deleteData && deleteData.name ? deleteData.name : ""} (ID:{" "}
            {deleteData && deleteData.id ? deleteData.id : ""})
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("quiz-mng.delete-close")}
          </Button>
          <Button variant="primary" onClick={() => handleDeleteQuiz()}>
            {t("quiz-mng.delete-yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;
