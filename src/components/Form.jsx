import {
	Content,
	Form,
	ButtonToolbar,
	Button,
	Panel,
	FlexboxGrid,
	Row,
	Col,
	Radio,
	RadioGroup,
} from "rsuite";
import LoginSchema from "../schema/LoginSchema";
import RegisterSchema from "../schema/RegisterSchema";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Form.css";

import useAuth from "../utils/context/useAuth";
import { config } from "../utils/config";

const FormComponent = ({ formType }) => {
	return (
		<Content style={{ marginTop: "10px" }}>
			<FlexboxGrid justify="center">
				<FlexboxGrid.Item colspan={12}>
					<Panel header={<h3>{formType}</h3>} bordered>
						{formType === "Register" ? <RegisterForm /> : ""}
						{formType === "Login" ? <LoginForm /> : ""}
					</Panel>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Content>
	);
};

const RegisterForm = () => {
	const [formvalue, setFormValue] = useState({
		email: "",
		password: "",
		firstname: "",
		lastname: "",
		phone: "",
	});
	const [role, setRole] = useState("patient");
	const [gender, setGender] = useState("male");
	const [serverMessage, setServerMessage] = useState("");
	const formRef = useRef();
	const navigate = useNavigate();

	const registerReq = async () => {
		try {
			const { email, password, firstname, lastname, phone } = formvalue;

			let req = await fetch(`${config.AUTH_BASE_URL}/register`, {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
					firstname,
					lastname,
					gender,
					phone,
					role,
				}),
				headers: { "Content-Type": "application/json" },
			});

			let res = await req.json();
			return [null, req, res];
		} catch (error) {
			return [error];
		}
	};

	function clearInputs() {
		setFormValue((prev) => {
			return {
				...prev,
				email: "",
				password: "",
				firstname: "",
				lastname: "",
				phone: "",
			};
		});
	}

	const handleNavigate = (res) => {
		clearInputs();
		navigate("/signin");
	};

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			let [error, req, res] = await registerReq();
			if (error) return console.error(error);
			req.status === 200 ? handleNavigate(res) : setServerMessage(res.message);
		}
	};

	return (
		<Form
			ref={formRef}
			model={RegisterSchema}
			formValue={formvalue}
			onChange={setFormValue}
		>
			<Row>
				<Col>
					{/* email */}
					<Form.Group>
						<Form.ControlLabel>Email address</Form.ControlLabel>
						<Form.Control placeholder="example@mail.com" name="email" />
					</Form.Group>
				</Col>

				<Col>
					{/* Password */}
					<Form.Group>
						<Form.ControlLabel>Password</Form.ControlLabel>
						<Form.Control
							placeholder="Must have at least 6 characters"
							name="password"
							type="password"
							autoComplete="off"
						/>
					</Form.Group>
				</Col>
				<Col>
					{/* Firstname */}
					<Form.Group>
						<Form.ControlLabel>Firstname</Form.ControlLabel>
						<Form.Control placeholder="Sam" name="firstname" />
					</Form.Group>
				</Col>
				<Col>
					{/* Lastname */}
					<Form.Group>
						<Form.ControlLabel>Lastname</Form.ControlLabel>
						<Form.Control placeholder="John" name="lastname" />
					</Form.Group>
				</Col>
				<Col>
					{/* Lastname */}
					{/* TODO commit to rsuite for input element type string */}
					<Form.Group>
						<Form.ControlLabel>Contact Number</Form.ControlLabel>
						<Form.Control
							className="numberInput"
							placeholder="+23401234567"
							type="number"
							name="phone"
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.ControlLabel>Gender </Form.ControlLabel>
						<RadioGroup value={gender} onChange={setGender} inline>
							<Radio value="male">Male</Radio>
							<Radio value="female">Female</Radio>
						</RadioGroup>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group>
				<Form.ControlLabel>Are you ? </Form.ControlLabel>
				<RadioGroup value={role} onChange={setRole} inline>
					<Radio value="patient">Patient</Radio>
					<Radio value="doctor">Doctor</Radio>
				</RadioGroup>
			</Form.Group>
			<Form.Group
				style={{
					marginTop: "-15px",
					marginLeft: "10px",
					justifyItems: "center",
					color: "red",
				}}
			>
				<div>{serverMessage}</div>
			</Form.Group>
			<Form.Group>
				<ButtonToolbar>
					<Button onClick={handleSubmit} appearance="primary">
						Register
					</Button>
					<Button href="/signin" appearance="link">
						Have an Account, Login Here...
					</Button>
				</ButtonToolbar>
			</Form.Group>
		</Form>
	);
};

const LoginForm = () => {
	const [formvalue, setFormValue] = useState({
		email: "",
		password: "",
	});
	const [serverMessage, setServerMessage] = useState("");
	const formRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();
	const goto = location?.state?.from || -1 || "/";
	let { setAuth } = useAuth();

	const loginReq = async () => {
		try {
			const { email, password } = formvalue;
			let req = await fetch(`${config.AUTH_BASE_URL}/login`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			let res = await req.json();
			return [null, req, res];
		} catch (error) {
			return [error];
		}
	};

	function clearInputs() {
		setFormValue((prev) => {
			return {
				...prev,
				email: "",
				password: "",
			};
		});
	}

	const handleNavigate = (res) => {
		setAuth(res);
		clearInputs();
		navigate(goto, { replace: true });
	};

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			let [error, req, res] = await loginReq();
			if (error) return console.error(error);
			req.status === 200 ? handleNavigate(res) : setServerMessage(res.message);
		}
	};

	return (
		<Form
			ref={formRef}
			model={LoginSchema}
			formValue={formvalue}
			onChange={setFormValue}
			fluid
		>
			{/* email */}
			<Form.Group>
				<Form.ControlLabel>Email address</Form.ControlLabel>
				<Form.Control placeholder="example@mail.com" name="email" />
			</Form.Group>
			{/* Password */}
			<Form.Group>
				<Form.ControlLabel>Password</Form.ControlLabel>
				<Form.Control
					placeholder="Must have at least 6 characters"
					name="password"
					type="password"
					autoComplete="off"
				/>
			</Form.Group>
			<Form.Group
				style={{
					marginTop: "-15px",
					marginLeft: "10px",
					justifyItems: "center",
					color: "red",
				}}
			>
				<div>{serverMessage}</div>
			</Form.Group>
			<Form.Group>
				<ButtonToolbar>
					<Button onClick={handleSubmit} type="submit" appearance="primary">
						Sign in
					</Button>
					<Button href="/register" appearance="link">
						Don't have an Account, Register Here ....
					</Button>
				</ButtonToolbar>
			</Form.Group>
		</Form>
	);
};

export default FormComponent;
