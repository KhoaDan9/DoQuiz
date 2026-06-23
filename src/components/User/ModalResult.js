import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
  const { t } = useTranslation();

  const { show, setShow, setIsShowQA, data, updateDataQuizWithQA } = props;
  const handleClose = () => setShow(false);
  const handleShowQA = () => {
    setIsShowQA(true);
    updateDataQuizWithQA();
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose()} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("user.modal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("user.modal.total-questions")} <b>{data.countTotal}</b>
          </div>
          <div>
            {t("user.modal.total-correct-ans")}: <b>{data.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleShowQA()}>
            {t("user.modal.btn-show")}
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            {t("user.modal.btn-close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
