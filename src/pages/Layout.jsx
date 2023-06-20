import { Outlet } from "react-router-dom";
import { Container, Header, Content } from "rsuite";
import NavBar from "../components/NavBar";
import DoctorNavBar from "../components/DoctorAuthNavBar";
import PatientNavBar from "../components/PatientAuthNavBar";

import useAuth from "../utils/context/useAuth";

const Layout = () => {
	const { auth } = useAuth();
	console.log(import.meta.env.DEV);

	return (
		<div>
			<Container>
				<Header>
					{!auth ? <NavBar /> : ""}
					{auth?.role.toLowerCase() === "patient" ? <PatientNavBar /> : ""}
					{auth?.role.toLowerCase() === "doctor" ? <DoctorNavBar /> : ""}
				</Header>
				<Content>
					<Outlet />
				</Content>
			</Container>
		</div>
	);
};

export default Layout;
