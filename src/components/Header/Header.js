import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { postLogout } from "../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogOut = async () => {
    const res = await postLogout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">DoQuiz</Navbar.Brand> */}
        <Nav>
          <NavLink className="navbar-brand" to="/">
            DoQuiz
          </NavLink>
        </Nav>

        {isAuthenticated === false ? (
          <>
            <button className="btn-login" onClick={() => navigate("/login")}>
              {t("header.login")}
            </button>
          </>
        ) : (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/">
                  {t("header.home")}
                </NavLink>
                <NavLink className="nav-link" to="/quizzes">
                  {t("header.quizzes")}
                </NavLink>
                <NavLink className="nav-link" to="/admins">
                  {t("header.admin")}
                </NavLink>
              </Nav>
              <Nav>
                {isAuthenticated === true && (
                  <NavDropdown
                    title={t("header.setting")}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={() => navigate("/profile")}>
                      {t("header.profile")}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogOut()}>
                      {t("header.logout")}
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <Language />
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
