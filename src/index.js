import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

// Mobx
import store from "stores";
import { Provider } from "mobx-react";

// antd
import LocaleProvider from "antd/lib/locale-provider";
import enUS from "antd/lib/locale-provider/en_US";

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
