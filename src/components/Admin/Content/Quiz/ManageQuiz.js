import { useEffect, useRef, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { getAllQuiz, postCreateNewQuiz } from "../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalActionQuiz from "./ModalActionQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import AssignQuiz from "./AssignQuiz";
import { useTranslation } from "react-i18next";

const ManageQuiz = (props) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const fileRef = useRef();
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState();

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();

    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
    console.log(res);
  };

  const options = [
    { value: "EASY", label: t("quiz-mng.easy") },
    { value: "MEDIUM", label: t("quiz-mng.medium") },
    { value: "HARD", label: t("quiz-mng.hard") },
  ];

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setSelectedQuiz(quiz);
  };

  const handleUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setSelectedQuiz(quiz);
  };

  const handleSubmitQuiz = async (e) => {
    if (!name || !description || !image) {
      return toast.error("Please input data!");
    }

    let res = await postCreateNewQuiz(name, description, type?.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
      fileRef.current.value = "";
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchListQuiz();
  }, []);
  return (
    <div className="manage-quiz-container">
      <div className="title">{t("quiz-mng.title")}</div>
      <hr />
      <Accordion className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("quiz-mng.btn-add")}</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>{t("quiz-mng.add.name")}</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="des"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>{t("quiz-mng.add.description")}</label>
              </div>
              <div className="my-3">
                <Select
                  defaultValue={type}
                  options={options}
                  placeholder={t("quiz-mng.add.type")}
                  onChange={setType}
                />
              </div>
              <div className="">
                <label className="mb-1">{t("quiz-mng.add.upload-img")}</label>
                <input
                  ref={fileRef}
                  type="file"
                  className="form-control"
                  onChange={(e) => handleChangeFile(e)}
                />
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={(e) => handleSubmitQuiz(e)}
              >
                {t("quiz-mng.add.save")}
              </button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>{t("quiz-mng.assign.title")}</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <TableQuiz
        listQuiz={listQuiz}
        handleUpdateQuiz={handleUpdateQuiz}
        handleDeleteQuiz={handleDeleteQuiz}
      />
      <ModalActionQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        listQuiz={listQuiz}
        fetchListQuiz={fetchListQuiz}
        selectedQuiz={selectedQuiz}
        setSelectedQuiz={setSelectedQuiz}
        handleUpdateQuiz={handleUpdateQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        listQuiz={listQuiz}
        fetchListQuiz={fetchListQuiz}
        deleteData={selectedQuiz}
        setDeleteUser={setSelectedQuiz}
        handleDeleteQuiz={handleDeleteQuiz}
      />
    </div>
  );
};

export default ManageQuiz;
