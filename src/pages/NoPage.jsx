import { Container, Content } from "rsuite";
import NavBar from "../components/NavBar";

const NoPage = () => {
	return (
		<Container>
			{/* <div>
				<NavBar />
			</div> */}
			<Content style={{ margin: "10px auto" }}>Page was not found</Content>
		</Container>
	);
};

export default NoPage;
