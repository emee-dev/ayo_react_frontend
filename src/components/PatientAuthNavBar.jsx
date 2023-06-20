import { Navbar, Nav } from "rsuite";
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
		<Navbar appearance="inverse">
			<Nav>
				<Nav.Item icon={<HomeIcon />}>Enugu State Hospital</Nav.Item>
			</Nav>
			<Nav pullRight>
				<Nav.Item href="/patient" icon={<ChangeList />}>
					LoggedIn As Patient
				</Nav.Item>
				<Nav.Item onClick={() => handleLogout()} icon={<SignOut />}>
					SignOut
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default PatientNavBar;
