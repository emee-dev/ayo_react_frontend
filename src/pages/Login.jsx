import {
	Content,
	Form,
	ButtonToolbar,
	Button,
	Panel,
	FlexboxGrid,
} from "rsuite";

import LoginSchema from "../schema/LoginSchema";
import useAuth from "../utils/context/useAuth";
import { config } from "../utils/config";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
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
		<Content style={{ marginTop: "10px" }}>
			<FlexboxGrid justify="center">
				<FlexboxGrid.Item>
					<Panel header={<h3>{"Login"}</h3>}>
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
									<Button
										onClick={handleSubmit}
										type="submit"
										appearance="primary"
									>
										Sign in
									</Button>
									<Button href="/register" appearance="link">
										Don't have an Account, Register Here ....
									</Button>
								</ButtonToolbar>
							</Form.Group>
						</Form>
					</Panel>
				</FlexboxGrid.Item>
			</FlexboxGrid>
		</Content>
	);
};

export default Login;
