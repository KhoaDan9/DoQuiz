import { useEffect, useState } from "react";
import { getQuizByUser } from "../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = () => {
  const { t } = useTranslation();

  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();

    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <div className="div-img">
                <img
                  src={`data:image/jpeg;base64,${quiz.image}`}
                  className="card-img-top"
                  alt="..."
                />
              </div>

              <div className="card-body">
                <div className="div-card">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text">{quiz.description}</p>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quizzes/${quiz.id}`, {
                      state: {
                        title: quiz.description,
                      },
                    })
                  }
                >
                  {t("user.btn-start")}
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>{t("user.quiz-not-found")}</div>}
    </div>
  );
};

export default ListQuiz;
