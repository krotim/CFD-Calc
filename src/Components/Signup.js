import React, { Component } from "react";
import {
	Form,
	Input,
	Tooltip,
	Icon,
	Checkbox,
	Button,
	notification
} from "antd";
import firebase from "../Constants/firebase";
import "firebase/firestore";
import { withRouter } from "react-router-dom";

class Signup extends Component {
	state = {
		confirmDirty: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			var email = values.email;
			var password = values.password;
			var username = values.username;

			if (!err) {
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => {
						notification["success"]({
							message: "Success",
							description: "You are in!"
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
			<div>
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
					<Form.Item
						label={
							<span>
								Username&nbsp;
								<Tooltip title="What do you want others to call you?">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
					>
						{getFieldDecorator("username", {
							rules: [
								{
									required: true,
									message: "Please input your username!",
									whitespace: true
								}
							]
						})(<Input />)}
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
						<Button type="primary" htmlType="submit">
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
