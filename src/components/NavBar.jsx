import { Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import User from "@rsuite/icons/legacy/User";
import SignIn from "@rsuite/icons/legacy/SignIn";

const NavBar = () => {
	return (
		<Navbar appearance="inverse">
			<Nav>
				<Nav.Item icon={<HomeIcon />}>Enugu State Hospital</Nav.Item>
			</Nav>
			<Nav pullRight>
				<Nav.Item href="/register" icon={<User />}>
					Register
				</Nav.Item>
				<Nav.Item href="/signin" icon={<SignIn />}> 
					SignIn
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default NavBar;
