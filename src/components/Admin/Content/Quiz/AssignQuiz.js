import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuiz,
  getAllUsers,
  postAssignQuizToUser,
} from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AssignQuiz = () => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();

    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newListQuiz);
    }
  };

  const handleSubmit = async () => {
    const res = await postAssignQuizToUser(
      selectedQuiz.value,
      selectedUser.value,
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.success(res.EM);
    }
  };

  const fetchListUser = async () => {
    let res = await getAllUsers();

    if (res && res.EC === 0) {
      let newListUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email} `,
        };
      });
      setListUser(newListUser);
    }
  };

  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);
  return (
    <div className="assign-quiz-container row">
      <div className="col-md-6">
        <label>{t("quiz-mng.assign.quiz")}</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-md-6">
        <label>{t("quiz-mng.assign.user")}</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button onClick={() => handleSubmit()} className="btn btn-warning mt-3">
          {t("quiz-mng.assign.btn")}
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
