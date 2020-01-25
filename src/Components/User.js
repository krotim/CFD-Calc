import React, { Component, createContext } from "react";
import { notification } from "antd";
import firebase from "../Constants/firebase";

export const UserContext = createContext({});

export class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			userId: null
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
					userId: user.uid
				});
			} else {
				this.setState({
					isLoggedIn: false,
					userId: null
				});
			}
		});
	};

	render() {
		return (
			<UserContext.Provider
				value={{ state: this.state, signOut: this.signOut }}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default User;
