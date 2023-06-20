import { Row, Col, Divider } from "rsuite";
import { useContext } from "react";
import DashboardContext from "../utils/context/DashboardContext";
import UserInfo from "@rsuite/icons/legacy/UserInfo";
import NoDataPlaceHolder from "./NoData";
import "./Prescription.css";

// const NoPrescription = () => {
// 	return (
// 		<div className="no_prescription">
// 			<div></div>
// 		</div>
// 	);
// };

const PrescriptionView = () => {
	const { prescription } = useContext(DashboardContext);

	return (
		<Row>
			{prescription.length === 0 ? (
				<NoDataPlaceHolder displayText="No Prescription for this patient yet" />
			) : (
				""
			)}
			{prescription &&
				prescription.map((item) => {
					return <Card key={crypto.randomUUID()} item={item} />;
				})}
		</Row>
	);
};

const Card = ({ item }) => {
	const {
		dosageInstructions,
		dispense_date,
		rpt,
		medication_name,
		diagnosis,
		quantity,
		days_to_take,
	} = item;

	return (
		<Col md={7} sm={12}>
			<div className="wrapper">
				<div className="head">
					<span>
						<UserInfo height={20} width={30} />
					</span>
					<div>
						<div className="label">{dosageInstructions}</div>
						<div className="date_wrapper">
							<span className="label">Dispense date:</span>
							<span className="grey_color">{dispense_date?.split("T")[0]}</span>
						</div>
					</div>
					<div className="rpt_wrapper">
						<span className="grey_color">{rpt}</span>
						<span className="label">Rpts</span>
					</div>
				</div>
				<Divider width={20} />
				<div className="mid_section">
					<div className="item">
						<span className="label">Medication: </span>
						<span className="grey_color">{medication_name}</span>
					</div>
					<div className="item">
						<span className="label">Diagnosis: </span>
						<span className="grey_color">{diagnosis}</span>
					</div>
				</div>
				<Divider width={20} />
				<div className="body">
					<div className="item">
						<span className="label">Status</span>
						<span className="grey_color">Active</span>
					</div>
					<div className="item">
						<span className="label">Quantity / Days</span>
						<span className="grey_color">
							{quantity} Tabs / {days_to_take} Day (s)
						</span>
					</div>
				</div>
			</div>
		</Col>
	);
};

export default PrescriptionView;
