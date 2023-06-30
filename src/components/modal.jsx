import { Modal, Button, Form, DatePicker } from "rsuite";
import { useState, useContext, useRef } from "react";
import useAuth from "../utils/context/useAuth";
import MedicalRecordSchema from "../schema/Medical_Record_Schema";
import { config } from "../utils/config";

const customStyle = {
	display: "flex",
	justifyContent: "space-between",
	marginBottom: "10px",
};

const ModalComponent = ({ toggle, close, data }) => {
	const [modalType, setModalType] = useState("create_medical_record");

	if (modalType === "create_medical_record")
		return (
			<MedicalRecordModal
				toggle={toggle}
				close={close}
				data={data}
				setModalType={setModalType}
			/>
		);

	if (modalType === "create_appointment")
		return (
			<AppointmentModal
				toggle={toggle}
				close={close}
				data={data}
				setModalType={setModalType}
			/>
		);
};

const MedicalRecordModal = ({ toggle, close, data, setModalType }) => {
	const [formValue, setFormValue] = useState({
		medication_name: "",
		rpt: "",
		dosage: "",
		quantity: "",
		duration: "",
		treatment: "",
		diagnosis: "",
	});

	const formRef = useRef();
	const { auth } = useAuth();
	let userId = auth.userId;

	function clearInputs() {
		setFormValue((prev) => {
			return {
				...prev,
				medication_name: "",
				rpt: "",
				dosage: "",
				quantity: "",
				duration: "",
				treatment: "",
				diagnosis: "",
			};
		});
	}

	const submit = async () => {
		const {
			medication_name,
			rpt,
			dosage,
			quantity,
			duration,
			treatment,
			diagnosis,
		} = formValue;

		try {
			let req = await fetch(`${config.BASE_URL}/doctor/record`, {
				method: "POST",
				body: JSON.stringify({
					patient_id: data._id,
					doctor_id: userId,
					medication_name,
					rpt,
					dosageInstructions: dosage,
					quantity,
					days_to_take: duration,
					treatment,
					diagnosis,
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
			const [error, req, res] = await submit();
			if (error) return console.error(error);
			if (req.status !== 200) return console.error("Request is not okay");
			clearInputs();
			close();
		}
	};
	const changeModalType = (type) => setModalType(type);

	const closeModal = () => {
		clearInputs();
		close();
	};

	return (
		<>
			<Modal
				backdrop={true}
				keyboard={false}
				open={toggle}
				onClose={() => close()}
			>
				<Modal.Header>
					<Modal.Title>New Medical Record</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div style={customStyle}>
						<Button
							onClick={() => changeModalType("create_appointment")}
							appearance="ghost"
						>
							Create Appointment
						</Button>
					</div>
					<Form
						ref={formRef}
						model={MedicalRecordSchema}
						formValue={formValue}
						onChange={setFormValue}
						fluid
					>
						<Form.Group controlId="medication_name">
							<Form.ControlLabel>Medication Name</Form.ControlLabel>
							<Form.Control
								placeholder="Lisinopril 10mg Tablet"
								name="medication_name"
							/>
						</Form.Group>
						<Form.Group controlId="rpt">
							<Form.ControlLabel>Times to Repeat</Form.ControlLabel>
							<Form.Control placeholder="3" name="rpt" />
						</Form.Group>
						<Form.Group controlId="dosage">
							<Form.ControlLabel>Dosage</Form.ControlLabel>
							<Form.Control
								placeholder="Take one tablet daily with water"
								name="dosage"
							/>
						</Form.Group>
						<Form.Group controlId="quantity">
							<Form.ControlLabel>Quantity</Form.ControlLabel>
							<Form.Control placeholder="35" name="quantity" />
						</Form.Group>
						<Form.Group controlId="duration">
							<Form.ControlLabel>Days to Take</Form.ControlLabel>
							<Form.Control placeholder="7" name="duration" />
						</Form.Group>
						<Form.Group controlId="treatment">
							<Form.ControlLabel>Treatment</Form.ControlLabel>
							<Form.Control
								placeholder="Prescribed medication and advised dietary changes"
								name="treatment"
							/>
						</Form.Group>
						<Form.Group controlId="diagnosis">
							<Form.ControlLabel>Diagnosis</Form.ControlLabel>
							<Form.Control placeholder="Hypertension" name="diagnosis" />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => handleSubmit()} appearance="primary">
						Ok
					</Button>
					<Button onClick={() => closeModal()} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const AppointmentModal = ({ toggle, close, data, setModalType }) => {
	const [date, setDate] = useState(new Date());
	const { auth } = useAuth();
	let userId = auth.userId;

	const submit = async () => {
		try {
			let req = await fetch(`${config.BASE_URL}/doctor/appointments/create`, {
				method: "POST",
				body: JSON.stringify({
					patient_id: data._id,
					doctor_id: userId,
					date,
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
		const [error, req, res] = await submit();
		if (error) return console.error(error);
		if (req.status !== 200) return console.error("Request is not okay");
		close();
	};
	const changeModalType = (type) => setModalType(type);

	return (
		<>
			<Modal
				backdrop={true}
				keyboard={false}
				open={toggle}
				onClose={() => close()}
			>
				<Modal.Header>
					<Modal.Title>New Appointment</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div style={customStyle}>
						<Button
							onClick={() => changeModalType("create_medical_record")}
							appearance="ghost"
						>
							Create Medical Record
						</Button>
					</div>
					<Form
						fluid
						// onChange={setDate}
						// formValue={date}
					>
						<Form.Group controlId="patient_id">
							<Form.ControlLabel>Patient Id</Form.ControlLabel>
							<Form.Control value={data._id} disabled name="patient_id" />
						</Form.Group>
						<Form.Group controlId="doctor_id">
							<Form.ControlLabel>Doctor Id</Form.ControlLabel>
							<Form.Control value={userId} disabled name="doctor_id" />
						</Form.Group>
						<Form.Group controlId="appointment_date">
							<Form.ControlLabel>Appointment Date</Form.ControlLabel>
							<DatePicker
								placement="top"
								name="date"
								value={date}
								onChange={setDate}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => handleSubmit()} appearance="primary">
						Ok
					</Button>
					<Button onClick={() => close()} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalComponent;
