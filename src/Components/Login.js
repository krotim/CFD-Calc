import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, notification } from "antd";
import * as ROUTES from "../Constants/routes";
import { Link, withRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	handleSubmit = e => {
		e.preventDefault();

		this.setState({
			isLoading: true
		});

		this.props.form.validateFields((err, values) => {
			var email = values.email;
			var password = values.password;
			var remember = values.remember;
			var persistence;

			if (remember) {
				persistence = firebase.auth.Auth.Persistence.LOCAL;
			} else {
				persistence = firebase.auth.Auth.Persistence.NONE;
			}

			if (!err) {
				firebase
					.auth()
					.setPersistence(persistence)
					.then(function() {
						return firebase
							.auth()
							.signInWithEmailAndPassword(email, password);
					})
					.then(() => {
						this.setState({ isLoading: false });
						notification["success"]({
							message: "Success",
							description: "You are logged in!"
						});
						this.props.history.push("/");
					})
					.catch(function(error) {
						var errorCode = error.code;
						var errorMessage = error.message;
						notification["error"]({
							message: errorCode,
							description: errorMessage
						});
					});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="form">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator("email", {
							rules: [
								{
									required: true,
									message: "Please input your email!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="user"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								placeholder="E-Mail"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your Password!"
								}
							]
						})(
							<Input.Password
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								type="password"
								placeholder="Password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("remember", {
							valuePropName: "checked",
							initialValue: false
						})(<Checkbox>Remember me</Checkbox>)}
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={this.state.isLoading}
							onClick={this.handelClick}
						>
							Log in
						</Button>
						Or <Link to={ROUTES.SIGN_UP}>Register now</Link>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const WrappedLoginForm = Form.create({ name: "login" })(Login);

export default withRouter(WrappedLoginForm);
