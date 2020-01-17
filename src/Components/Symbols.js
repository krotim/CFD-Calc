import React, { Component } from "react";
import { Select } from "antd";

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
		for (let i = 10; i < 36; i++) {
			this.setState({
				symbols: this.state.symbols.push(
					<Option key={i.toString(36) + i}>
						{i.toString(36) + i}
					</Option>
				)
			});
		}
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
