import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../Constants/routes";
import { Menu, Avatar, Button, Icon } from "antd";
import { UserContext } from "./User";

export class Navbar extends Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: Boolean
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.context.state.isLoggedIn !== state.isLoggedIn) {
			return {
				isLoggedIn: props.context.state.isLoggedIn
			};
		}

		return null;
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let button;

		if (isLoggedIn) {
			button = (
				<div>
					<Button onClick={this.props.context.signOut} type="danger">
						SignOut
					</Button>
					<Link className="margin-10" to={ROUTES.SETTINGS}>
						<Icon type="setting" />
						Settings
					</Link>
				</div>
			);
		} else {
			button = <Link to={ROUTES.LOG_IN}>Login/Signup</Link>;
		}
		return (
			<div>
				<Menu onClick={this.handleClick} mode="horizontal" theme="dark">
					<Menu.Item key="main">
						<Avatar
							style={{
								color: "#f56a00",
								backgroundColor: "#fde3cf"
							}}
						>
							KR
						</Avatar>
					</Menu.Item>
					<Menu.Item className="float-right" key="login">
						{button}
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default props => (
	<UserContext.Consumer>
		{state => <Navbar context={state} />}
	</UserContext.Consumer>
);
