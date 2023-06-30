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

import RegisterSchema from "../schema/RegisterSchema";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import { config } from "../utils/config";

const Register = () => {
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
	// style={{ width: "50%", marginTop: "10px", backgroundColor: "green" }}

	return (
		<Row>
			<Col xs={20} xsPush={2}>
				<Panel header={<h3>{"Register"}</h3>} bordered>
					<Form
						ref={formRef}
						model={RegisterSchema}
						formValue={formvalue}
						onChange={setFormValue}
						fluid
					>
						<Row>
							<Col xs={24}>
								<Form.Group>
									<Form.ControlLabel>Email address</Form.ControlLabel>
									<Form.Control placeholder="example@mail.com" name="email" />
								</Form.Group>
							</Col>
							<Col xs={24}>
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

							<Col xs={24}>
								<Form.Group>
									<Form.ControlLabel>Firstname</Form.ControlLabel>
									<Form.Control placeholder="Sam" name="firstname" />
								</Form.Group>
							</Col>
							<Col xs={24}>
								<Form.Group>
									<Form.ControlLabel>Lastname</Form.ControlLabel>
									<Form.Control placeholder="John" name="lastname" />
								</Form.Group>
							</Col>

							<Col xs={24}>
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

							<Col xs={12}>
								<Form.ControlLabel>Gender </Form.ControlLabel>
								<RadioGroup value={gender} onChange={setGender} inline>
									<Radio value="male">Male</Radio>
									<Radio value="female">Female</Radio>
								</RadioGroup>
							</Col>

							<Col xs={12}>
								<Form.ControlLabel>Are you ? </Form.ControlLabel>
								<RadioGroup value={role} onChange={setRole} inline>
									<Radio value="patient">Patient</Radio>
									<Radio value="doctor">Doctor</Radio>
								</RadioGroup>
							</Col>

							<Col xs={24}>
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
							</Col>

							<Col xs={17}>
								<Form.Group>
									<Button href="/signin" appearance="link">
										Have an Account, Login Here...
									</Button>
								</Form.Group>
							</Col>

							<Col xs={7}>
								<Form.Group>
									<Button
										style={{ maxWidth: "100%" }}
										onClick={handleSubmit}
										appearance="primary"
									>
										Register
									</Button>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Panel>
			</Col>
		</Row>
	);
};

export default Register;
