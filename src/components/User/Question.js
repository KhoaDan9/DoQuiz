import _ from "lodash";

const Question = (props) => {
  const { index, data, isShowQA } = props;

  const handleHandleCheckbox = (e, aId, qId) => {
    props.handleCheckbox(aId, qId);
  };
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question: {index + 1}: {data.questionDescription}?
      </div>
      <div className="q-content">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="answer">
                {isShowQA === false ? (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id={`qs-${index}`}
                      type="checkbox"
                      checked={a.isSelected}
                      onChange={(e) =>
                        handleHandleCheckbox(e, a.id, data.questionId)
                      }
                    />
                    <label className="form-check-label" htmlFor={`qs-${index}`}>
                      {a.description}
                    </label>
                  </div>
                ) : (
                  <div
                    className={`form-check ${a.isCorrect === true ? "answer-true" : a.isSelected ? "answer-false" : ""}`}
                  >
                    <input
                      className="form-check-input"
                      id={`qs-${index}`}
                      type="checkbox"
                      checked={a.isSelected}
                      disabled
                      onChange={(e) =>
                        handleHandleCheckbox(e, a.id, data.questionId)
                      }
                    />
                    <label className="form-check-label" htmlFor={`qs-${index}`}>
                      {a.description}
                    </label>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
