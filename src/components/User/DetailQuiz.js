import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getDataQuiz,
  getDataQuizWithAnswers,
  postSubmitQuiz,
} from "../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
import { useTranslation } from "react-i18next";

const DetailQuiz = () => {
  const { t } = useTranslation();

  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [isShowQA, setIsShowQA] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let image,
        questionDescription = null;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          value.forEach((item, index) => {
            if (index === 0) {
              image = item.image;
              questionDescription = item.description;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (dataQuiz && index !== 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId,
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId,
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    let answers = [];

    setIsFinished(true);

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = +question.questionId;
        let userAnswerId = [];
        question.answers.forEach((answer) => {
          if (answer.isSelected) userAnswerId.push(answer.id);
        });
        answers.push({ questionId, userAnswerId });
      });
    }
    let payload = {
      quizId: +quizId,
      answers: answers,
    };

    let res = await postSubmitQuiz(payload);
    if (res && res.EC === 0) {
      setDataModalResult(res.DT);
      setIsShowModalResult(true);
    } else {
      alert("loi roi ng oi");
    }
  };

  const updateDataQuizWithQA = async () => {
    const res = await getDataQuizWithAnswers(quizId);

    let newQa = res.DT.qa;
    let correctArr = [];

    newQa.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.isCorrect === true) correctArr.push(answer.id);
      });
    });

    let newDataQuiz = _.cloneDeep(dataQuiz);

    for (let i = 0; i < newDataQuiz.length; i++) {
      newDataQuiz[i].answers.forEach((answer) => {
        if (answer.id === correctArr[i]) answer.isCorrect = true;
      });
    }

    setDataQuiz(newDataQuiz);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location.state.title}
        </div>
        <div className="q-body">
          {/* src={`data:image/jpeg;base64,${quiz.image}`} */}
        </div>
        <div className="q-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            isShowQA={isShowQA}
          />
        </div>
        <div className="footer">
          <button
            className={`btn ml-4 ${index !== 0 ? "btn-primary" : "btn-secondary disabled"}`}
            onClick={() => handlePrev()}
          >
            {t("user.prev")}
          </button>
          <button
            className={`btn ml-4 ${dataQuiz && dataQuiz.length > index + 1 ? "btn-primary" : "btn-secondary disabled"}`}
            onClick={() => handleNext()}
          >
            {t("user.next")}
          </button>
          <button
            className="btn btn-success ml-4"
            onClick={() => handleFinishQuiz()}
          >
            {t("user.finish")}
          </button>
          {/* {!isFinished ? (
            <button
              className="btn btn-success ml-4"
              onClick={() => handleFinishQuiz()}
            >
              {t("user.finish")}
            </button>
          ) : (
            <button className="btn btn-success ml-4 disabled">
              {t("user.finish")}
            </button>
          )} */}
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinishQuiz={handleFinishQuiz}
          index={index}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        data={dataModalResult}
        setIsShowQA={setIsShowQA}
        updateDataQuizWithQA={updateDataQuizWithQA}
      />
    </div>
  );
};

export default DetailQuiz;
