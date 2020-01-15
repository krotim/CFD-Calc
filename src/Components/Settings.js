import React, { Component } from "react";
import { Button, Select, Icon, Menu, notification } from "antd";
import { Link } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import firebase from "../Constants/firebase";
import "firebase/firestore";

export class Settings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				email: String,
				username: String
			}
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {};

	render() {
		return (
			<div>
				<Menu mode="horizontal" theme="dark">
					<Menu.Item key="main">
						<Icon type="calculator" />
						CFD Calc
					</Menu.Item>
					<Menu.Item className="float-right" key="home">
						<Link to={ROUTES.LANDING}>Home</Link>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default Settings;
