import React, { Component } from "react";
import { Select, Button, message } from "antd";
import axios from "axios";
import firebase from "../Constants/firebase";
import "firebase/firestore";

const { Option } = Select;
const db = firebase.firestore();

export class Symbols extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: "",
			AllSymbols: [],
			DBSymbols: {}
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ userId: user.uid });
		});
	}

	populateSymbolsFromAPI = symbol => {
		const allSymbolsCopy = [];
		axios
			.get(
				`/api/v1/stock_search?search_term=${symbol}&limit=50&page=1&api_token=ER823ms94FSWYnXVpkOB80oA1BXFSp8eRUDlIuLUHuxN0gDKlC5bc9D0HZEq`
			)
			.then(res => {
				const searchData = res.data;

				searchData.data.map(symbol => {
					return allSymbolsCopy.push({
						name: symbol.name,
						symbol: symbol.symbol
					});
				});

				this.setState({ AllSymbols: allSymbolsCopy });
			});
	};

	handleChange = value => {
		const DBSymbolsCopy = Object.assign({}, value);

		this.setState({ DBSymbols: DBSymbolsCopy });
	};

	fetchUser = value => {
		this.populateSymbolsFromAPI(value);
	};

	AddSymbolsToDB = () => {
		db.collection("users")
			.doc(this.state.userId)
			.set(this.state.DBSymbols)
			.then(function() {
				message.success("You have successfully entered your symbols");
			})
			.catch(function(error) {
				message.error(error);
			});
	};

	render() {
		return (
			<div id="add__symbols">
				<Select
					mode="multiple"
					style={{ width: "100%" }}
					placeholder="Search for symbols"
					onChange={this.handleChange}
					onSearch={this.fetchUser}
				>
					{this.state.AllSymbols.map(data => (
						<Option key={data.symbol}>
							{data.name} - ({data.symbol})
						</Option>
					))}
				</Select>
				<Button
					onClick={this.AddSymbolsToDB}
					icon="plus"
					type="primary"
				>
					Add symbols
				</Button>
			</div>
		);
	}
}

export default Symbols;
