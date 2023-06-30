import { Outlet } from "react-router-dom";
import { Container, Header, Content, Grid } from "rsuite";
import NavBar from "../components/NavBar";
import DoctorNavBar from "../components/DoctorAuthNavBar";
import PatientNavBar from "../components/PatientAuthNavBar";

import useAuth from "../utils/context/useAuth";

const Layout = () => {
	const { auth } = useAuth();

	return (
		<Grid style={{ width: "100vw" }}>
			{!auth ? <NavBar /> : ""}
			{auth?.role.toLowerCase() === "patient" ? <PatientNavBar /> : ""}
			{auth?.role.toLowerCase() === "doctor" ? <DoctorNavBar /> : ""}

			<Outlet />
		</Grid>
	);
};

export default Layout;
