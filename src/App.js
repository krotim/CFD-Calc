import React from "react";
import { Button, InputNumber, Select } from "antd";
import "./Style/main.sass";

const { Option } = Select;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	onChangeInvestment = value => {
		console.log("changed", value);
	};

	onChangeDirection = value => {
		console.log("changed", value);
	};
	onchangeLeverage = value => {
		console.log("changed", value);
	};
	onChangeEntryPrice = value => {
		console.log("changed", value);
	};
	onchangeExitPrice = value => {
		console.log("changed", value);
	};

	Calc = () => {};

	render() {
		return (
			<div className="App">
				<div className="form">
					<InputNumber
						min={1}
						defaultValue={10}
						formatter={value =>
							`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						}
						parser={value => value.replace(/\$\s?|(,*)/g, "")}
						step={10}
						onChange={this.onChange}
					/>
					<Select
						defaultValue="Long"
						style={{ width: 120 }}
						onChange={this.onChangeDirection}
					>
						<Option value="long">Long</Option>
						<Option value="short">Short</Option>
					</Select>
					<InputNumber
						min={1}
						defaultValue={5}
						onChange={this.onchangeLeverage}
					/>
					<InputNumber
						min={0.1}
						placeholder="34"
						onChange={this.onChangeEntryPrice}
					/>
					<InputNumber
						min={0.1}
						placeholder="36"
						onChange={this.onChangeExitPrice}
					/>
					<Button type="primary" block onClick={this.Calc}>
						Calc
					</Button>
				</div>
			</div>
		);
	}
}

export default App;
