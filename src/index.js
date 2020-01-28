import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Settings from "./Components/Settings";
import "./Style/main.sass";
import User from "./Components/User";

ReactDOM.render(
	<Router>
		<User>
			<Route exact path={ROUTES.LANDING} component={App} />
			<Route path={ROUTES.SETTINGS} component={Settings} />
		</User>
		<Route path={ROUTES.LOG_IN} component={Login} />
		<Route path={ROUTES.SIGN_UP} component={Signup} />
	</Router>,
	document.getElementById("root")
);
