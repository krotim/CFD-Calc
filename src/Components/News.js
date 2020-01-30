import React, { Component } from "react";
import { Select, Button, message, Card, Spin, Tag } from "antd";
import axios from "axios";
import { isEmpty } from "lodash";

const { Option } = Select;
const { Meta } = Card;

class News extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Symbols: [],
			News: [],
			loading: false
		};
	}

	populateSymbolsFromAPI = symbol => {
		const allSymbolsCopy = [];
		axios
			.get(
				`https://api.worldtradingdata.com/api/v1/stock_search?search_term=${symbol}&limit=5&page=1&api_token=ER823ms94FSWYnXVpkOB80oA1BXFSp8eRUDlIuLUHuxN0gDKlC5bc9D0HZEq`
			)
			.then(result => {
				const searchData = result.data;

				if (!isEmpty(searchData)) {
					searchData.data.map(symbol => {
						return allSymbolsCopy.push({
							name: symbol.name,
							symbol: symbol.symbol
						});
					});
				}

				this.setState({ Symbols: allSymbolsCopy });
			});
	};

	fetchSymbols = value => {
		this.populateSymbolsFromAPI(value);
	};

	fetchNews = value => {
		if (!isEmpty(value)) {
			this.setState({ loading: true });
			axios
				.get(
					`https://stocknewsapi.com/api/v1?tickers=${value}&items=12&token=bzfmperupgmjfufheqnno2dterbwfzgppfnbal37`
				)
				.then(result => {
					this.setState({ News: result.data.data });
					this.setState({ loading: false });
				})
				.catch(error => {
					message.error(error);
					this.setState({ loading: false });
				});
		}
	};

	render() {
		return (
			<div id="News">
				<h1>News</h1>
				<Select
					className="select"
					mode="multiple"
					placeholder="Search for symbols"
					onChange={this.fetchNews}
					onSearch={this.fetchSymbols}
				>
					{this.state.Symbols.map(data => (
						<Option key={data.symbol}>
							{data.name} - ({data.symbol})
						</Option>
					))}
				</Select>
				<Spin tip="Loading..." spinning={this.state.loading}>
					<div className="news__cards">
						{this.state.News.map(data => (
							<Card
								key={data.title}
								className="card"
								cover={
									<img alt="example" src={data.image_url} />
								}
							>
								<Meta
									title={data.title}
									description={data.text}
								/>
								<Button
									type="dashed"
									href={data.news_url}
									target="_blank"
									block
								>
									Go to news
								</Button>
								<Sentiment data={data.sentiment} />
							</Card>
						))}
					</div>
				</Spin>
			</div>
		);
	}
}

function Sentiment(props) {
	const sentiment = props.data;

	if (sentiment === "Positive") {
		return <Tag color="green">Positive</Tag>;
	} else if (sentiment === "Neutral") {
		return <Tag color="blue">Neutral</Tag>;
	} else {
		return <Tag color="red">Negative</Tag>;
	}
}

export default News;
