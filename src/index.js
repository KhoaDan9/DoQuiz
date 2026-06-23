import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Layout from "./views/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "nprogress/nprogress.css";
import { PersistGate } from "redux-persist/integration/react";
import "react-perfect-scrollbar/dist/css/styles.css";
import i18n from "./components/utils/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>,

  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
