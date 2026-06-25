import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../services/apiService";
import { useTranslation } from "react-i18next";

const ModalActionQuiz = (props) => {
  const { show, setShow, fetchListQuiz, selectedQuiz } = props;
  const { t } = useTranslation();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreViewImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleUpdateQuiz = async () => {
    let data = await putUpdateQuiz(id, description, name, type, image);

    if (data && data.EC === 0) {
      handleClose();
      toast.success(data.EM);
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    if (selectedQuiz) {
      setId(selectedQuiz.id);
      setName(selectedQuiz.name);
      setDescription(selectedQuiz.description);
      setType(selectedQuiz.difficulty);
      if (selectedQuiz.image) {
        setImage(selectedQuiz.image);
        setPreViewImage(`data:image/jpeg;base64,${selectedQuiz.image}`);
      } else {
        setImage("");
        setPreViewImage("");
      }
    }
  }, [selectedQuiz]);

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
          <Modal.Title>{t("quiz-mng.update-title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row ">
            <div className="col-md-8">
              <label htmlFor="inputName" className="form-label">
                {t("quiz-mng.table.name")}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputRole" className="form-label">
                {t("quiz-mng.table.type")}
              </label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EASY">{t("quiz-mng.easy")}</option>
                <option value="MEDIUM">{t("quiz-mng.medium")}</option>
                <option value="HARD">{t("quiz-mng.hard")}</option>
              </select>
            </div>

            <div className="col-md-12 mt-1">
              <label htmlFor="inputDescription" className="form-label">
                {t("quiz-mng.add.description")}
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-12 mt-2">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("quiz-mng.add.upload-img")}
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
                <span>{t("quiz-mng.add.preview-img")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            {t("quiz-mng.add.close")}
          </Button>
          <Button variant="primary" onClick={() => handleUpdateQuiz()}>
            {t("quiz-mng.add.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalActionQuiz;
