import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, notification } from "antd";
import * as ROUTES from "../Constants/routes";
import { Link } from "react-router-dom";
import firebase from "../Constants/firebase";

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			var email = values.email;
			var password = values.password;

			if (!err) {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.catch(function(error) {
						// Handle Errors here.
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

	test = () => {};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
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

const WrappedLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedLoginForm;
