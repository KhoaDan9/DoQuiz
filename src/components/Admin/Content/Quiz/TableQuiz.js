import { useTranslation } from "react-i18next";

const TableQuiz = (props) => {
  const { listQuiz } = props;
  const { t } = useTranslation();

  return (
    <table className="table table-responsive table-hover table-bordered rounded-3 table-manage-quiz">
      <thead>
        <tr>
          <th className="text-center" scope="col">
            #
          </th>
          <th className="text-center" scope="col">
            ID
          </th>
          <th scope="col">{t("quiz-mng.table.name")}</th>
          <th scope="col">{t("quiz-mng.table.description")}</th>
          <th scope="col">{t("quiz-mng.table.type")}</th>
          <th className="text-center" scope="col">
            {t("quiz-mng.table.image")}
          </th>
          <th className="text-center" scope="col">
            {t("quiz-mng.table.action")}
          </th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.map((item, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td className="text-center">
                  <img
                    style={{ height: "100px" }}
                    src={`data:image/jpeg;base64,${item.image}`}
                  />
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-secondary mx-3"
                    onClick={() => props.handleUpdateQuiz(item)}
                  >
                    {t("quiz-mng.table.update")}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.handleDeleteQuiz(item)}
                  >
                    {t("quiz-mng.table.delete")}
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableQuiz;
