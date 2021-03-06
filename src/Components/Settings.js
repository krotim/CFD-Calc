import React, { Component } from "react";
import Symbols from "./Symbols";
import Navbar from "./Navbar";
import { Descriptions } from "antd";
import { UserContext } from "./User";

export class Settings extends Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);

		this.state = {
			user: {
				email: String
			}
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.context.data.email !== state.email) {
			return {
				user: {
					email: props.context.data.email
				}
			};
		}

		return null;
	}

	render() {
		return (
			<div>
				<Navbar />
				<Symbols />
				<Descriptions title="User Info">
					<Descriptions.Item label="E-Mail">
						{this.state.user.email}
					</Descriptions.Item>
					<Descriptions.Item label="UserName">-</Descriptions.Item>
				</Descriptions>
				,
			</div>
		);
	}
}

export default props => (
	<UserContext.Consumer>
		{state => <Settings context={state} />}
	</UserContext.Consumer>
);
