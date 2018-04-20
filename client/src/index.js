import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import muiTheme from "./config/theme";
import Layout from "./components/Layout";
import Routes from "./routes";
import { Provider } from "react-redux";
import createStore from "./redux/Store";

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStore}>
      <Layout>
        {/* <Login /> */}
        <Routes />
      </Layout>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
