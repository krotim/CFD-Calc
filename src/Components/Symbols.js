import React, { Component } from "react";
import { Select, Button, message } from "antd";
import axios from "axios";
import firebase from "../Constants/firebase";
import "firebase/firestore";
import { UserContext } from "./User";
import { isEmpty } from "lodash";

const { Option } = Select;
const db = firebase.firestore();

export class Symbols extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: "",
			fetchedSymbols: [],
			DBSymbols: {}
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.context.data.isLoggedIn !== state.isLoggedIn) {
			return {
				userId: props.context.data.userId
			};
		}

		return null;
	}

	populateSymbolsFromAPI = symbol => {
		const fetchedSymbolsCopy = [];
		axios
			.get(
				`https://api.worldtradingdata.com/api/v1/stock_search?search_term=${symbol}&limit=50&page=1&api_token=ER823ms94FSWYnXVpkOB80oA1BXFSp8eRUDlIuLUHuxN0gDKlC5bc9D0HZEq`
			)
			.then(result => {
				const searchData = result.data;

				if (!isEmpty(searchData)) {
					searchData.data.map(symbol => {
						return fetchedSymbolsCopy.push({
							name: symbol.name,
							symbol: symbol.symbol
						});
					});
				}

				this.setState({ fetchedSymbols: fetchedSymbolsCopy });
			});
	};

	handleChange = value => {
		const DBSymbolsCopy = Object.assign({}, value);

		this.setState({ DBSymbols: DBSymbolsCopy });
	};

	fetchSymbols = value => {
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
					onSearch={this.fetchSymbols}
				>
					{this.state.fetchedSymbols.map(data => (
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

export default props => (
	<UserContext.Consumer>
		{state => <Symbols context={state} />}
	</UserContext.Consumer>
);
