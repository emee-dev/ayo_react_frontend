import { FlexboxGrid, Form, Row, Col, Button } from "rsuite";
import { useState, useContext, useRef } from "react";
import AuthProvider from "../utils/context/AuthProvider";
import DoctorUpdateForm from "../schema/DoctorUpdateForm";
import { config } from "../utils/config";

const customStyle = { width: "20%", marginTop: "1rem" };

const DoctorProfileForm = () => {
	const [formValue, setFormValue] = useState({
		firstname: "",
		lastname: "",
		specialization: "",
		education: "",
		license: "",
		location: "",
		phone: "",
	});
	const [serverMessage, setServerMessage] = useState("");
	const formRef = useRef();
	const { userId } = useContext(AuthProvider);

	const updateReq = async () => {
		try {
			const {
				firstname,
				lastname,
				specialization,
				education,
				license,
				location,
				phone,
			} = formValue;

			let req = await fetch(`${config.BASE_URL}/doctor/profile`, {
				method: "POST",
				body: JSON.stringify({
					doctorId: userId,
					firstname,
					lastname,
					specialization,
					education,
					licenseNumber: license,
					location,
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
					model={DoctorUpdateForm}
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
								<Form.ControlLabel>Specialization</Form.ControlLabel>
								<Form.Control
									placeholder="NeuroSurgeon"
									name="specialization"
								/>
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Education</Form.ControlLabel>
								<Form.Control placeholder="Harvard" name="education" />
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>License Number</Form.ControlLabel>
								<Form.Control placeholder="DOC_123345565" name="license" />
							</Form.Group>
						</Col>
						<Col style={{ margin: "10px" }}>
							<Form.Group>
								<Form.ControlLabel>Location</Form.ControlLabel>
								<Form.Control placeholder="Ward 6" name="location" />
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

export default DoctorProfileForm;
