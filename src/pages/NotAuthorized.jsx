import { Container, Content } from "rsuite";
import NavBar from "../components/NavBar";

const NotAuthorized = () => {
	return (
		<Container>
			{/* <div>
				<NavBar />
			</div> */}
			<Content style={{ margin: "10px auto" }}>You are not Authorized</Content>
		</Container>
	);
};

export default NotAuthorized;
