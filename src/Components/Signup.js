import React, { Component } from "react";
import { Form, Input, Checkbox, Button, notification } from "antd";
import firebase from "../Constants/firebase";
import "firebase/firestore";
import { withRouter } from "react-router-dom";

class Signup extends Component {
	state = {
		confirmDirty: false,
		isLoading: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			var email = values.email;
			var password = values.password;

			if (!err && values.agreement) {
				this.setState({ isLoading: true });
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => {
						this.setState({ isLoading: false });
						notification["success"]({
							message: "Success",
							description: "You are in!"
						});
						this.props.history.push("/");
					})
					.catch(error => {
						this.setState({ isLoading: false });
						var errorCode = error.code;
						var errorMessage = error.message;

						notification["error"]({
							message: errorCode,
							description: errorMessage
						});
					});
			} else {
				this.setState({ isLoading: false });
				if (err) {
					notification["error"]({
						message: "Error",
						description: "Fill the empty fields!"
					});
				}
				if (!values.agreement) {
					notification["error"]({
						message: "Error",
						description: "Read agreements!"
					});
				}
			}
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("Two passwords that you enter is inconsistent!");
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(["confirm"], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div id="form">
				<Form className="signup-form" onSubmit={this.handleSubmit}>
					<Form.Item label="E-mail">
						{getFieldDecorator("email", {
							rules: [
								{
									type: "email",
									message: "The input is not valid E-mail!"
								},
								{
									required: true,
									message: "Please input your E-mail!"
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="Password">
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your password!"
								},
								{
									validator: this.validateToNextPassword
								}
							]
						})(<Input.Password />)}
					</Form.Item>
					<Form.Item label="Confirm Password">
						{getFieldDecorator("confirm", {
							rules: [
								{
									required: true,
									message: "Please confirm your password!"
								},
								{
									validator: this.compareToFirstPassword
								}
							]
						})(<Input.Password onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("agreement", {
							valuePropName: "checked"
						})(
							<Checkbox>
								I have read the{" "}
								<a href="http://www.africau.edu/images/default/sample.pdf">
									agreement
								</a>
							</Checkbox>
						)}
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={this.state.isLoading}
						>
							Register
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: "register" })(Signup);
export default withRouter(WrappedRegistrationForm);
