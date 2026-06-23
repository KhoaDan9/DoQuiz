import { useEffect, useState } from "react";
import "./Dashboard.scss";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../services/apiService";
import { useTranslation } from "react-i18next";

const Dashboard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();

  const fetchDataOverview = async () => {
    const res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      setDataChart(res.DT.users);
      let Qz = 0,
        Qs = 0,
        As = 0;

      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];

      setDataChart(data);
    }

    console.log(res);
  };

  useEffect(() => {
    fetchDataOverview();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">{t("dashboard.title")}</div>
      <hr />
      <div className="content">
        <div className="c-left">
          <div className="data">
            <span className="text-1">{t("dashboard.c-left-1")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="data">
            <span className="text-1">{t("dashboard.c-left-2")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="data">
            <span className="text-1">{t("dashboard.c-left-3")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="data">
            <span className="text-1">{t("dashboard.c-left-4")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart
              data={dataChart}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qs" fill="#8884d8" />
              <Bar dataKey="Qz" fill="#82ca9d" />
              <Bar dataKey="As" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
