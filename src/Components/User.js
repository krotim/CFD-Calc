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
			email: "",
			symbols: {}
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
				this.getSymbols(user.uid);

				this.setState({
					isLoggedIn: true,
					userId: user.uid,
					email: user.email
				});
			}
		});
	};

	getSymbols = userId => {
		const db = firebase.firestore();
		var symbolsRef = db.collection("users").doc(userId);

		symbolsRef
			.get()
			.then(symbols => {
				if (symbols.exists) {
					this.setState({ symbols: symbols.data() });
				} else {
					console.log("No such document!");
				}
			})
			.catch(function(err) {
				console.log("Error: " + err);
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
