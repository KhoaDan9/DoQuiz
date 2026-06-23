import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz, index, setIndex } = props;

  const onTimeUp = () => {
    handleFinishQuiz();
  };

  const getClassQuestion = (question, type) => {
    const selected = question.answers.find((ans) => ans.isSelected);
    if (selected) return "question selected";
    // if (type === "click") {
    //   return "question checked";
    // }

    return "question";
  };

  const handleClickQuestion = (question, index) => {
    setIndex(index);
    // getClassQuestion(question, "click");
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, indexQ) => {
            return (
              <div
                key={`question-${indexQ}`}
                className={
                  indexQ === index ? "question clicked" : getClassQuestion(item)
                }
                onClick={() => handleClickQuestion(item, indexQ)}
              >
                {indexQ + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
