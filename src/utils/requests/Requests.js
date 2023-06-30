import { config } from "../config";

const fetchSearchValue = async (filter) => {
	try {
		let req = await fetch(
			`${config.BASE_URL}/doctor/patients?filter=${filter}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		let res = await req.json();
		let data = res.data;

		let patient = [
			{
				id: 1,
				patient_id: data?.userId,
				patient_phone: data?.userId?.phone,
				full_name: `${data?.userId?.firstname} ${data?.userId?.lastname}`,
				patient_email: data?.userId?.email,
				gender: data?.userId?.gender,
				allegies: data?.allegies,
			},
		];

		return [null, req, patient];
	} catch (error) {
		return [error];
	}
};

const GetAllPatients = async (page, limit) => {
	try {
		let arr = [];

		let req = await fetch(
			`${config.BASE_URL}/doctor/patients?page=${page}&limit=${limit}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);

		let res = await req.json();
		let pageCount = res.pageCount;

		res.data.map((item, index) => {
			arr.push({
				id: index + 1,
				patient_id: item?.userId?._id,
				patient_phone: item?.userId?.phone,
				full_name: `${item?.userId?.firstname} ${item?.userId?.lastname}`,
				patient_email: item?.userId?.email,
				gender: item?.userId?.gender,
				allegies: item?.allegies,
			});
		});

		return [null, req, arr, pageCount];
	} catch (error) {
		return [error];
	}
};

export const SearchORAllPatients = async (page, limit, filter = null) => {
	if (filter) {
		let [error, req, search] = await fetchSearchValue(filter);
		if (error) return console.error(error);
		if (req.status !== 200) return console.error("Request is not okay");
		return search;
	} else {
		let [error, req, allPatients, pageCount] = await GetAllPatients(
			page,
			limit
		);
		if (error) return console.error(error);
		if (req.status !== 200) return console.error("Request is not okay");
		return allPatients;
	}
};

export const Medical_Records = async (patientId) => {
	try {
		let arr = [];
		if (!patientId) throw new Error("Patient Id is undefined");

		let req = await fetch(`${config.BASE_URL}/patient/records`, {
			method: "POST",
			body: JSON.stringify({ patientId }),
			headers: { "Content-Type": "application/json" },
		});

		let res = await req.json();
		console.log({ "Patient Id": patientId, "Medical Records": res });

		res?.data?.map((item, index) => {
			arr.push({
				id: index + 1,
				_id: item._id,
				full_name: `${item?.patient_id?.firstname} ${item?.patient_id?.lastname}`,
				doc_full_name: `${item?.doctor_id?.firstname} ${item?.doctor_id?.lastname}`,
				doc_gender: item?.doctor_id?.gender,
				doc_email: item?.doctor_id?.email,
				doc_phone: item?.doctor_id?.phone,
				createdAt: `${item?.createdAt.split("T")[0]}`,
				prescription: item?.prescriptions,
			});
		});

		return [null, req, arr];
	} catch (error) {
		return [error];
	}
};

export const PatientPrecription = async (patientId) => {
	try {
		if (!patientId) throw new Error("Patient Id is undefined");

		let req = await fetch(`${config.BASE_URL}/doctor/prescriptions`, {
			method: "POST",
			body: JSON.stringify({ patientId }),
			headers: { "Content-Type": "application/json" },
		});
		let res = await req.json();
		let prescriptions = res?.data;

		return [null, req, prescriptions];
	} catch (error) {
		return [error];
	}
};
