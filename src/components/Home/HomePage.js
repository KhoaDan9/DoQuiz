import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="home-title">{t("homepage.title")}</div>
        <div className="home-body">{t("homepage.body")}</div>
        <div className="home-content">
          {!isAuthenticated ? (
            <button className="home-btn" onClick={() => navigate("/login")}>
              {t("homepage.login")}
            </button>
          ) : (
            <button className="home-btn" onClick={() => navigate("/users")}>
              {t("homepage.do-quiz")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
