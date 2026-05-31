import Header from "../components/Header/Header";
import "./App.scss";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        test
        <div>
          <button>
            <Link to="/admins">Admin page</Link>
          </button>
          <button>
            <Link to="/users">User page</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
