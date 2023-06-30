import {
	Header,
	FlexboxGrid,
	Button,
	Input,
	InputGroup,
	Row,
	Col,
} from "rsuite";
import ArrowLeftLine from "@rsuite/icons/legacy/ArrowLeftLine";
import SearchIcon from "@rsuite/icons/Search";
import DashboardContext from "../utils/context/DashboardContext";
import { useContext } from "react";
import { useState } from "react";

const wait = (time) => {
	return new Promise((resolve) => {
		return setTimeout(resolve, time);
	});
};

// These here is for the header section
const HeadSection = () => {
	let { viewType, headText, toggleView, btnType, toggleHeadText } =
		useContext(DashboardContext);

	if (viewType === "doctor")
		return (
			<Row className="header_container">
				<Col lg={18}>
					<ChangeButton
						type={btnType}
						toggleView={toggleView}
						headText={headText}
						changeBtnBackTo={toggleHeadText}
					/>
				</Col>
				<Col>{headText === "Patient Records" ? <SearchBtn /> : ""}</Col>
			</Row>
		);

	if (viewType === "patient")
		return (
			<Row className="header_container">
				<Col lg={18}>
					<ChangeButton
						type={btnType}
						toggleView={toggleView}
						headText={headText}
						changeBtnBackTo={toggleHeadText}
					/>
				</Col>
			</Row>
		);
};

const ChangeButton = ({ type, toggleView, headText, changeBtnBackTo }) => {
	const handleOnClick = () => {
		toggleView("table_record");
		changeBtnBackTo("RecordText");
	};

	if (type === "RecordText")
		return <Col className="head_title">{headText}</Col>;

	if (type === "BackBtn")
		return (
			<Button
				onClick={() => handleOnClick()}
				startIcon={<ArrowLeftLine />}
				appearance="ghost"
			>
				Back
			</Button>
		);
};

const styles = {
	marginBottom: 10,
};

const SearchBtn = () => {
	let { setSearchValue } = useContext(DashboardContext);
	const [value, setValue] = useState("");

	const handleClick = async () => {
		setSearchValue(value);
	};

	return (
		<InputGroup size="sm" style={styles}>
			<Input placeholder="Search" value={value} onChange={setValue} />
			<InputGroup.Button>
				<SearchIcon onClick={handleClick} />
			</InputGroup.Button>
		</InputGroup>
	);
};

export default HeadSection;
