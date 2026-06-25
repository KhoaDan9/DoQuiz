import Sidebar from "./Sidebar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
import { postLogout } from "../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { t } = useTranslation();
  const account = useSelector((state) => state.user.account);

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
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={(value) => setToggled(value)}
        />
      </div>
      <div className="admin-content">
        <PerfectScrollbar>
          <div className="admin-header">
            <span
              className="sidebar-non-mob"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaBars className="left-side" />
            </span>
            <span className="sidebar-mob" onClick={() => setToggled(true)}>
              <FaBars className="left-side" />
            </span>
            <div className="right-side">
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  {t("admin.profile")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("admin.logout")}
                </NavDropdown.Item>
              </NavDropdown>
              <Language />
            </div>
          </div>

          <div className="admin-main">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Admin;
