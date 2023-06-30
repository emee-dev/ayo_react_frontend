import { Navbar, Nav, Row, Col } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import User from "@rsuite/icons/legacy/User";
import SignIn from "@rsuite/icons/legacy/SignIn";

const NavBar = () => {
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
						<Nav.Item href="/register" icon={<User />}>
							Register
						</Nav.Item>
					</Nav>
				</Col>
				<Col lg={2}>
					<Nav>
						<Nav.Item href="/signin" icon={<SignIn />}>
							SignIn
						</Nav.Item>
					</Nav>
				</Col>
			</Navbar>
		</Row>
	);
};

export default NavBar;
