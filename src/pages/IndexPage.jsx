import { Container, Content, Stack, Button } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHospitalUser,
	faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import "./IndexPage.css";

const IndexPage = () => {
	return (
		<Container>
			<Content style={{ margin: " 10px auto" }}>
				<Stack>
					<div className="items">
						<FontAwesomeIcon className="icons" icon={faHospitalUser} />
						<Button href="/patient" className="link_button" appearance="link">
							Proceed as Patient
						</Button>
					</div>
				</Stack>
				<Stack>
					<div className="items">
						<FontAwesomeIcon className="icons" icon={faUserDoctor} />
						<Button href="/doctor" className="link_button" appearance="link">
							Proceed as Doctor
						</Button>
					</div>
				</Stack>
			</Content>
		</Container>
	);
};

export default IndexPage;
