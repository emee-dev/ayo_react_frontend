import { Button, Content, FlexboxGrid, Row, Col, Stack } from "rsuite";

import { useState } from "react";
import DashboardContext from "../utils/context/DashboardContext";
import Calender from "../components/Calender";
import Prescription from "../components/Prescription";
import HeadSection from "../components/HeadSection";
import DoctorProfileForm from "../components/DoctorProfileForm";
import DoctorTableComponent from "../components/DoctorTableComponent";

const customButtonStyle = {
	width: "150px",
};

const DoctorDashboard = () => {
	const [view, setView] = useState("appointment");
	const [activeBtn, setActiveBtn] = useState("appointment");
	const [headText, setHeadText] = useState("My Appointments");
	const [btnType, setBtnType] = useState("RecordText");
	const [searchValue, setSearchValue] = useState(null);
	const [prescription, setPrescription] = useState([]);

	const viewType = "doctor";

	let contextValues = {
		viewType,
		toggleView: (view) => toggleView(view),
		headText,
		btnType,
		toggleHeadText: (type) => setBtnType(type),
		prescription,
		changeView: (view) => setView(view),
		setPrescription: (arr) => setPrescription(arr),
		searchValue,
		setSearchValue: (value) => setSearchValue(value),
	};

	const toggleView = (view) => {
		if (view === "appointment") setHeadText("My Appointments");
		if (view === "table_record") setHeadText("Patient Records");
		if (view === "profile") setHeadText("My Profile");
		if (view === "prescription") setHeadText("Patient Prescriptions");
		setBtnType("RecordText");
		setActiveBtn(view);
		setView(view);
	};

	return (
		<DashboardContext.Provider value={contextValues}>
			<Row style={{ marginTop: "10px" }}>
				<Col lg={3}>
					<Stack direction="column">
						<FlexboxGrid.Item as={Col} className="sidebar_item">
							<Button
								onClick={() => toggleView("appointment")}
								style={customButtonStyle}
								appearance={activeBtn === "appointment" ? "default" : "ghost"}
								active={activeBtn === "appointment" ? true : false}
							>
								Appointments
							</Button>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} className="sidebar_item">
							<Button
								onClick={() => toggleView("table_record")}
								style={customButtonStyle}
								appearance={activeBtn === "table_record" ? "default" : "ghost"}
								active={activeBtn === "table_record" ? true : false}
							>
								Patient Records
							</Button>
						</FlexboxGrid.Item>
						<FlexboxGrid.Item as={Col} className="sidebar_item">
							<Button
								onClick={() => toggleView("profile")}
								style={customButtonStyle}
								appearance={activeBtn === "profile" ? "default" : "ghost"}
								active={activeBtn === "profile" ? true : false}
							>
								Profile
							</Button>
						</FlexboxGrid.Item>
					</Stack>
				</Col>
				<Col lg={20}>
					<Content>
						<HeadSection />
						{view === "appointment" ? <Calender /> : ""}
						{view === "table_record" ? <DoctorTableComponent /> : ""}
						{view === "prescription" ? <Prescription /> : ""}
						{view === "profile" ? <DoctorProfileForm /> : ""}
					</Content>
				</Col>
			</Row>
		</DashboardContext.Provider>
	);
};

export default DoctorDashboard;
