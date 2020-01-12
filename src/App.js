import React from "react";
import {
	Button,
	InputNumber,
	Select,
	Card,
	Statistic,
	Icon,
	message,
	Menu
} from "antd";
import { Link } from "react-router-dom";
import * as ROUTES from "./Constants/routes";
import "./Style/main.sass";

const { Option } = Select;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Investment: null,
			Direction: "Long",
			Leverage: null,
			EntryPrice: null,
			ExitPrice: null,
			Result: 0,
			stat: {
				color: "#3f8600",
				arrow: "arrow-up"
			}
		};
	}

	onChangeInvestment = value => {
		this.setState({ Investment: value });
	};
	onChangeDirection = value => {
		this.setState({ Direction: value });
	};
	onchangeLeverage = value => {
		this.setState({ Leverage: value });
	};
	onChangeEntryPrice = value => {
		this.setState({ EntryPrice: value });
	};
	onchangeExitPrice = value => {
		this.setState({ ExitPrice: value });
	};

	Calc = () => {
		var result;

		if (
			this.state.Investment === null ||
			this.state.Leverage === null ||
			this.state.EntryPrice === null ||
			this.state.ExitPrice === null
		) {
			message.error("Please fill empty fields");
		} else {
			if (this.state.Direction === "Long") {
				result =
					((this.state.ExitPrice - this.state.EntryPrice) *
						this.state.Investment *
						this.state.Leverage) /
					this.state.EntryPrice;
			} else {
				result =
					((this.state.EntryPrice - this.state.ExitPrice) *
						this.state.Investment *
						this.state.Leverage) /
					this.state.EntryPrice;
			}

			this.setState({ Result: result });

			if (result >= 0) {
				this.setState({
					stat: { color: "#3f8600", arrow: "arrow-up" }
				});
			} else {
				this.setState({
					stat: { color: "#cf1322", arrow: "arrow-down" }
				});
			}
		}
	};

	render() {
		return (
			<div className="App">
				<Menu onClick={this.handleClick} mode="horizontal" theme="dark">
					<Menu.Item key="main">
						<Icon type="calculator" />
						CFD Calc
					</Menu.Item>
					<Menu.Item className="login-link" key="login">
						<Link to={ROUTES.LOG_IN}>Login/Signup</Link>
					</Menu.Item>
				</Menu>
				<section id="form">
					<div className="form">
						<InputNumber
							min={1}
							placeholder={5}
							formatter={value =>
								`$ ${value}`.replace(
									/\B(?=(\d{3})+(?!\d))/g,
									","
								)
							}
							parser={value => value.replace(/\$\s?|(,*)/g, "")}
							step={10}
							onChange={this.onChangeInvestment}
						/>
						<Select
							defaultValue="Long"
							onChange={this.onChangeDirection}
						>
							<Option value="Long">Long</Option>
							<Option value="Short">Short</Option>
						</Select>
						<InputNumber
							min={1}
							placeholder="Leverage"
							onChange={this.onchangeLeverage}
						/>
						<InputNumber
							min={0.1}
							placeholder="Entry Price"
							onChange={this.onChangeEntryPrice}
						/>
						<InputNumber
							min={0.1}
							placeholder="Exit Price"
							onChange={this.onchangeExitPrice}
						/>
						<Button type="danger" block onClick={this.Calc}>
							CALC
						</Button>
						<Card>
							<Statistic
								title="Result"
								value={this.state.Result}
								precision={2}
								valueStyle={{ color: this.state.stat.color }}
								prefix="$"
								suffix={<Icon type={this.state.stat.arrow} />}
							/>
						</Card>
					</div>
				</section>
			</div>
		);
	}
}

export default App;
