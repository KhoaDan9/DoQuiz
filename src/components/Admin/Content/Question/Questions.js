import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import {
  FiMinusCircle,
  FiPlusCircle,
  FiMinusSquare,
  FiPlusSquare,
} from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllQuiz,
  postCreateNewAnswerForQuiz,
  postCreateNewQuestionForQuiz,
} from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Questions = () => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const valueNewQA = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState(valueNewQA);

  const handleUploadImage = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];

      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    } else if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);

      if (index > -1) {
        questionsClone[index].answers.push(newAnswer);
        setQuestions(questionsClone);
      }
    } else if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].answers = questionsClone[index].answers.filter(
          (item) => item.id !== answerId,
        );
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnchange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            } else if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        },
      );
    }
    setQuestions(questionsClone);
  };

  const handleSubmit = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    let errorMsg = "";
    let isValid = true;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        errorMsg = `Empty description at question ${i + 1}`;
        isValid = false;
        break;
      }

      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValid = false;
          errorMsg = `Not empty Answer ${j + 1} at question ${i + 1}`;
          break;
        }
      }
      if (isValid === false) break;
    }

    if (isValid === false) {
      toast.error(errorMsg);
      return;
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        selectedQuiz.value,
        question.description,
        question.imageFile,
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuiz(
          q.DT.id,
          answer.description,
          answer.isCorrect,
        );
      }
    }
    toast.success("Create question success");
  };

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

  useEffect(() => {
    fetchListQuiz();
  }, []);

  useEffect(() => {
    setQuestions(valueNewQA);
  }, [selectedQuiz]);

  return (
    <div className="question-container">
      <div className="title">{t("question-mng.title")}</div>
      <hr />
      <div className="header">
        <label>{t("question-mng.select-q")}</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          className="col-md-6"
        />
      </div>

      <div className="body-question">
        <label className="pt-3">{t("question-mng.btn-add")}</label>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="q-detail">
                    <div className="form-floating col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Description"
                        value={question.description}
                        onChange={(e) =>
                          handleOnchange(
                            "QUESTION",
                            question.id,
                            e.target.value,
                          )
                        }
                      />
                      <label>
                        {t("question-mng.question")} {index + 1}
                      </label>
                    </div>
                    <div>
                      <span onClick={() => handleAddRemoveQuestion("ADD")}>
                        <FiPlusCircle className="item-icon icon-plus " />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        >
                          <FiMinusCircle className="item-icon icon-minus " />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="q-image">
                    {question.imageFile ? (
                      <img
                        className="preview-img"
                        src={URL.createObjectURL(question.imageFile)}
                        // src={`data:image/jpeg;base64,${question.imageFile}`}
                      />
                    ) : (
                      <span>{t("question-mng.no-img")}</span>
                    )}
                    <label htmlFor={question.id}>
                      <BiImageAdd className="upload-img" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={question.id}
                      onChange={(e) => handleUploadImage(question.id, e)}
                    />
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="checkbox-input"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              e.target.checked,
                            )
                          }
                        />
                        <div className="answer-form form-floating col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Description"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                question.id,
                                answer.id,
                                e.target.value,
                              )
                            }
                          />
                          <label>
                            {t("question-mng.answer")} {index + 1}
                          </label>
                        </div>
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", question.id)
                          }
                        >
                          <FiPlusSquare className="item-icon icon-plus " />
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id,
                              )
                            }
                          >
                            <FiMinusSquare className="item-icon icon-minus " />
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      {questions && questions.length > 0 && (
        <div>
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            {t("question-mng.save")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
