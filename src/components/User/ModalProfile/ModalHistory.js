import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { getHistory } from "../../services/apiService";
import _ from "lodash";
import dayjs from "dayjs";

const ModalHistory = (props) => {
  const { t } = useTranslation();

  const [data, setData] = useState();

  const { show, setShow } = props;
  const handleClose = () => setShow(false);

  const fetchHistory = async () => {
    const res = await getHistory();
    if (res && res.EC === 0) {
      let history = res.DT.data;
      history = _.orderBy(history, ["createdAt"], ["desc"]);

      setData(history);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Modal
        className="modal-profile"
        show={show}
        onHide={() => handleClose()}
        backdrop="static"
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th scope="col">Quiz name</th>
                <th className="text-center" scope="col">
                  Result
                </th>
                <th className="text-center" scope="col">
                  Date Submit
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((h_data, index) => {
                  return (
                    <tr key={`table-history-${index}`}>
                      <th className="text-center" scope="row">
                        {index + 1}
                      </th>
                      <td>{h_data?.quizHistory?.name}</td>
                      <td className="text-center">
                        {h_data.total_correct}/{h_data.total_questions}
                      </td>
                      <td className="text-center">
                        {dayjs(h_data.createdAt).format("HH:mm DD/MM/YYYY")}
                      </td>
                    </tr>
                  );
                })}
              {data && data.length === 0 && (
                <tr>
                  <td colSpan={7}>Notfound data!</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHistory;
