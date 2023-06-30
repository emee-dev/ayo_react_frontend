import { FlexboxGrid, Form, Row, Col, Button } from "rsuite";
import { useState, useContext, useRef } from "react";
import useAuth from "../utils/context/useAuth";
import PatientUpdateForm from "../schema/PatientUpdateForm";
import { config } from "../utils/config";

const customStyle = { width: "20%", marginTop: "1rem" };

const PatientProfileForm = () => {
	const [formValue, setFormValue] = useState({
		firstname: "",
		lastname: "",
		allegies: "",
		phone: "",
	});
	const [serverMessage, setServerMessage] = useState("");
	const formRef = useRef();
	const { auth } = useAuth();
	let userId = auth.userId;

	const updateReq = async () => {
		try {
			const { firstname, lastname, allegies, phone } = formValue;
			let req = await fetch(`${config.BASE_URL}/patient/profile`, {
				method: "POST",
				body: JSON.stringify({
					patientId: userId,
					firstname,
					lastname,
					allegies,
					phone,
				}),
				headers: { "Content-Type": "application/json" },
			});

			let res = await req.json();
			return [null, req, res];
		} catch (error) {
			return [error];
		}
	};

	const handleSubmit = async () => {
		if (formRef.current.check()) {
			let [error, req, res] = await updateReq();
			if (error) return console.error(error);
			if (req.status !== 200) return console.error("Request is not okay");
			setServerMessage(res.message);
		}
	};

	return (
		<FlexboxGrid justify="space-between">
			<FlexboxGrid.Item colspan={20}>
				<Form
					ref={formRef}
					model={PatientUpdateForm}
					formValue={formValue}
					onChange={setFormValue}
					layout="vertical"
				>
					<Row>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Firstname</Form.ControlLabel>
								<Form.Control placeholder="David" name="firstname" />
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Lastname</Form.ControlLabel>
								<Form.Control placeholder="Pearl" name="lastname" />
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Allegies</Form.ControlLabel>
								<Form.Control placeholder="Peanuts, Butter" name="allegies" />
								<Form.HelpText>Separate with Comma</Form.HelpText>
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Phone No</Form.ControlLabel>
								<Form.Control placeholder="0123456789" name="phone" />
							</Form.Group>
						</Col>
					</Row>
					<Form.Group
						style={{
							marginTop: "5px",
							marginLeft: "10px",
							justifyItems: "center",
							color: "red",
						}}
					>
						<div>{serverMessage}</div>
					</Form.Group>
					<Form.Group style={{ margin: "10px" }}>
						<Button
							onClick={handleSubmit}
							style={customStyle}
							appearance="primary"
						>
							Submit
						</Button>
					</Form.Group>
				</Form>
			</FlexboxGrid.Item>
		</FlexboxGrid>
	);
};

export default PatientProfileForm;
