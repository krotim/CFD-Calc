import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

ReactDOM.render(
	<Router>
		<Route exact path={ROUTES.LANDING} component={App} />
		<Route path={ROUTES.LOG_IN} component={Login} />
		<Route path={ROUTES.SIGN_UP} component={Signup} />
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
