import { useTranslation } from "react-i18next";

const CardQuiz = (props) => {
  const { listQuiz } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className="card-manage-quiz">
        {listQuiz &&
          listQuiz.length > 0 &&
          listQuiz.map((quiz, index) => {
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
                    <h5 className="card-title">{quiz.name}</h5>
                    <h5 className="card-title">{quiz.difficulty}</h5>

                    <p className="card-text">{quiz.description}</p>
                  </div>
                  <div className="btn-card">
                    <button
                      className="btn btn-secondary mx-3"
                      onClick={() => props.handleUpdateQuiz(quiz)}
                    >
                      {t("quiz-mng.table.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleDeleteQuiz(quiz)}
                    >
                      {t("quiz-mng.table.delete")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CardQuiz;
