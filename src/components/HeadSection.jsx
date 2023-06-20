import { Header, FlexboxGrid, Button, Col, Input, InputGroup } from "rsuite";
import ArrowLeftLine from "@rsuite/icons/legacy/ArrowLeftLine";
import SearchIcon from "@rsuite/icons/Search";
import DashboardContext from "../utils/context/DashboardContext";
import { useContext } from "react";

// These here is for the header section
const HeadSection = () => {
	let { viewType, headText, toggleView, btnType, toggleHeadText } =
		useContext(DashboardContext);

	if (viewType === "doctor")
		return (
			<Header className="header_container">
				<FlexboxGrid justify="space-between" align="middle">
					<ChangeButton
						type={btnType}
						toggleView={toggleView}
						headText={headText}
						changeBtnBackTo={toggleHeadText}
					/>
					<FlexboxGrid.Item as={Col}>
						{headText === "Patient Records" ? <SearchBtn /> : ""}
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Header>
		);

	if (viewType === "patient")
		return (
			<Header className="header_container">
				<FlexboxGrid justify="space-between" align="middle">
					<ChangeButton
						type={btnType}
						toggleView={toggleView}
						headText={headText}
						changeBtnBackTo={toggleHeadText}
					/>
				</FlexboxGrid>
			</Header>
		);
};

const ChangeButton = ({ type, toggleView, headText, changeBtnBackTo }) => {
	const handleOnClick = () => {
		toggleView("table_record");
		changeBtnBackTo("RecordText");
	};

	if (type === "RecordText")
		return (
			<FlexboxGrid.Item className="head_title" as={Col}>
				{headText}
			</FlexboxGrid.Item>
		);

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
	let { searchComponent } = useContext(DashboardContext);
	return (
		<InputGroup size="sm" style={styles}>
			<Input placeholder="Search" />
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
		</InputGroup>
	);
};

export default HeadSection;
