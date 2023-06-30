import { useState, useContext, useEffect } from "react";
import { Table, Button, Pagination } from "rsuite";
import ModalComponent from "./modal";
import DashboardContext from "../utils/context/DashboardContext";
import {
	SearchORAllPatients,
	PatientPrecription,
} from "../utils/requests/Requests";

const { Column, HeaderCell, Cell } = Table;

const DoctorTableComponent = () => {
	const [tableData, setTableData] = useState([]);
	const [toggle, setToggle] = useState(false);
	const [rowdata, setRowdata] = useState({});

	const { changeView, toggleHeadText, setPrescription, searchValue } =
		useContext(DashboardContext);

	// Pagination
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	const FetchRequest = async () => {
		let value = await SearchORAllPatients(page, limit, searchValue);

		console.log(value);
		setTableData((rest) => {
			return [...value];
		});
		// setPageCount(pageCount);
	};

	// const searchFetch = async () => {
	// 	// searchComponent.setValue(search);
	// 	setTableData((rest) => {
	// 		return [search];
	// 	});
	// 	setPageCount(1);
	// };

	useEffect(() => {
		FetchRequest();
		console.log("UseEffect Ran");
	}, [page, searchValue]);

	const toggleModal = () => setToggle(false);

	const ModalData = (values) => {
		setRowdata({ ...values });
		return setToggle(true);
	};

	const rowDataFn = async (val) => {
		setRowdata({ ...val });
		fetchPrescription(val.patient_id);
		toggleHeadText("BackBtn"); // change header button or header text values ["RecordText","BackBtn"]
	};

	const fetchPrescription = async (patientId) => {
		let [error, req, prescriptionArr] = await PatientPrecription(patientId);
		if (error) return console.error(error);

		if (req.status === 200) {
			setPrescription(prescriptionArr);
		} else if (req.status === 400) {
			setPrescription(prescriptionArr);
		} else {
			console.log(
				"Request is not okay at file 'DoctorTableComponent.jsx' at Line '75'"
			);
			return console.error(error);
		}

		changeView("prescription"); // set prescription view to main section
	};

	const handlePageChange = (val) => {
		setPage(val);
	};

	return (
		<>
			<Table
				height={400}
				data={tableData}
				onRowClick={(rowData) => {
					ModalData(rowData);
				}}
			>
				<Column width={60} align="center" fixed>
					<HeaderCell>Id</HeaderCell>
					<Cell dataKey="id" />
				</Column>

				<Column width={180}>
					<HeaderCell>Full Name</HeaderCell>
					<Cell dataKey="full_name" />
				</Column>

				<Column width={150}>
					<HeaderCell>Patient Phone</HeaderCell>
					<Cell dataKey="patient_phone" />
				</Column>

				<Column width={250}>
					<HeaderCell>Patient Email</HeaderCell>
					<Cell dataKey="patient_email" />
				</Column>

				<Column width={100}>
					<HeaderCell>Gender</HeaderCell>
					<Cell dataKey="gender" />
				</Column>

				<Column width={250}>
					<HeaderCell>Allegies</HeaderCell>
					<Cell dataKey="allegies" />
				</Column>

				<Column width={150} fixed="right">
					<HeaderCell>...</HeaderCell>

					<Cell style={{ padding: "6px" }}>
						{(rowData) => (
							<Button appearance="link" onClick={() => rowDataFn(rowData)}>
								Prescriptions
							</Button>
						)}
					</Cell>
				</Column>
			</Table>
			<div style={{ padding: 20 }}>
				<Pagination
					prev
					next
					first
					last
					ellipsis
					boundaryLinks
					maxButtons={5}
					size="xs"
					layout={["total", "pager", "limit", "skip"]}
					total={pageCount}
					limitOptions={[10, 30, 50]}
					limit={limit}
					activePage={page}
					onChangePage={handlePageChange}
				/>
			</div>
			<ModalComponent toggle={toggle} close={toggleModal} data={rowdata} />
		</>
	);
};

export default DoctorTableComponent;
