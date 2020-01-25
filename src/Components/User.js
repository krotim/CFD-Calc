import React, { Component, createContext } from "react";
import { notification } from "antd";
import firebase from "../Constants/firebase";

export const UserContext = createContext({});

export class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			userId: null,
			symbols: [],
			username: "-",
			email: ""
		};
	}

	componentDidMount() {
		this.checkIfUserIsLoggedIn();
	}

	signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(function() {
				window.location.reload();
			})
			.catch(function(error) {
				notification["error"]({
					message: "Error",
					description: error
				});
			});
	};

	checkIfUserIsLoggedIn = () => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					isLoggedIn: true,
					userId: user.uid,
					email: user.email
				});
			}
		});
	};

	render() {
		return (
			<UserContext.Provider
				value={{ data: this.state, signOut: this.signOut }}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default User;
