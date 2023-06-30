import { useState, useContext, useEffect } from "react";
import { Table, Button, Pagination } from "rsuite";
import { Medical_Records } from "../utils/requests/Requests";
import DashboardContext from "../utils/context/DashboardContext";
import NoDataPlaceHolder from "./NoData";
import useAuth from "../utils/context/useAuth";

const { Column, HeaderCell, Cell } = Table;

const PatientTableComponent = () => {
	const [tableData, setTableData] = useState([]);

	const { auth } = useAuth();
	const userId = auth.userId;

	const { changeView, toggleHeadText, setPrescription } =
		useContext(DashboardContext);

	// Pagination
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const InitialFetch = async () => {
		let [error, req, patientRecords] = await Medical_Records(userId);
		if (error) return console.error(error);

		if (req.status === 200) {
			setTableData(patientRecords);
		} else if (req.status === 400) {
			setTableData(patientRecords);
		} else {
			return console.error(
				"Request is not okay at file 'PatientTableComponent.jsx' at Line '30'"
			);
		}
	};

	useEffect(() => {
		InitialFetch();
	}, []);

	const rowDataFn = (val) => {
		setPrescription([...val.prescription]);
		changeView("prescription"); // set prescription to main section
		toggleHeadText("BackBtn"); // change header button or header text values ["RecordText","BackBtn"]
	};

	const handleChangeLimit = (dataKey) => {
		setPage(1);
		setLimit(dataKey);
	};

	const data = tableData.filter((v, i) => {
		const start = limit * (page - 1);
		const end = start + limit;
		return i >= start && i < end;
	});

	if (tableData.length === 0)
		return <NoDataPlaceHolder displayText="You have no medical records, yet" />;

	return (
		<>
			<Table height={400} data={data}>
				<Column width={60} align="center" fixed>
					<HeaderCell>Id</HeaderCell>
					<Cell dataKey="id" />
				</Column>

				<Column width={180}>
					<HeaderCell>Full Name</HeaderCell>
					<Cell dataKey="full_name" />
				</Column>

				<Column width={180}>
					<HeaderCell>Doctor Full Name</HeaderCell>
					<Cell dataKey="doc_full_name" />
				</Column>

				<Column width={130}>
					<HeaderCell>Doctor Gender</HeaderCell>
					<Cell dataKey="doc_gender" />
				</Column>

				<Column width={190}>
					<HeaderCell>Doctor Email</HeaderCell>
					<Cell dataKey="doc_email" />
				</Column>

				<Column width={150}>
					<HeaderCell>Doctor Phone</HeaderCell>
					<Cell dataKey="doc_phone" />
				</Column>

				<Column width={150}>
					<HeaderCell>CreatedAt</HeaderCell>
					<Cell dataKey="createdAt" />
				</Column>
				<Column width={120} fixed="right">
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
					total={tableData.length}
					limitOptions={[10, 30, 50]}
					limit={limit}
					activePage={page}
					onChangePage={setPage}
					onChangeLimit={handleChangeLimit}
				/>
			</div>
		</>
	);
};

export default PatientTableComponent;
