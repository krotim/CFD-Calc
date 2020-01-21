import React, { Component } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

export class Symbols extends Component {
	constructor(props) {
		super(props);

		this.state = {
			symbols: []
		};
	}

	componentDidMount() {
		this.populateSymbolsFromAPI();
	}

	populateSymbolsFromAPI = () => {
		axios
			.get(
				`/core/nyse-other-listings/nyse-listed_json/data/e8ad01974d4110e790b227dc1541b193/nyse-listed_json.json`
			)
			.then(res => {
				const data = res.data;
				const list = [];

				data.map(symbol =>
					list.push(
						<Option key={symbol["ACT Symbol"]}>
							{symbol["ACT Symbol"]}
						</Option>
					)
				);

				this.setState({ symbols: list });
			});
	};

	handleChange(value) {
		console.log(`selected ${value}`);
	}

	render() {
		return (
			<div>
				<Select
					mode="multiple"
					style={{ width: "100%" }}
					placeholder="Please select"
					defaultValue={["AAPL", "MSFT"]}
					onChange={this.handleChange}
				>
					{this.state.symbols}
				</Select>
			</div>
		);
	}
}

export default Symbols;
