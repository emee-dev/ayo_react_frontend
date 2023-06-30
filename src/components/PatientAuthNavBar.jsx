import { Navbar, Nav, Col, Row } from "rsuite";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@rsuite/icons/legacy/Home";
import ChangeList from "@rsuite/icons/ChangeList";
import SignOut from "@rsuite/icons/legacy/SignOut";
import AuthProvider from "../utils/context/AuthProvider";
import { useContext } from "react";

const PatientNavBar = () => {
	const { logOut } = useContext(AuthProvider);
	const navigate = useNavigate();

	const handleLogout = () => {
		logOut();
		navigate("/", {
			replace: true,
		});
	};
	return (
		<Row>
			<Navbar appearance="inverse">
				<Col xs={18} sm={11} md={14} lg={17}>
					<Nav>
						<Nav.Item icon={<HomeIcon />}>Enugu State Hospital</Nav.Item>
					</Nav>
				</Col>
				<Col xsHidden lg={4}>
					<Nav>
						<Nav.Item href="/patient" icon={<ChangeList />}>
							Goto Dashboard
						</Nav.Item>
					</Nav>
				</Col>
				<Col lg={2}>
					<Nav>
						<Nav.Item onClick={() => handleLogout()} icon={<SignOut />}>
							SignOut
						</Nav.Item>
					</Nav>
				</Col>
			</Navbar>
		</Row>
	);
};

export default PatientNavBar;
