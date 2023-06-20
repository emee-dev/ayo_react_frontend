import { config } from "../config";

export const Medical_Records = async (patientId) => {
	try {
		let arr = [];

		let req = await fetch(`${config.BASE_URL}/patient/records`, {
			method: "POST",
			body: JSON.stringify({ patientId }),
			headers: { "Content-Type": "application/json" },
		});

		let res = await req.json();

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

export const Patients = async () => {
	try {
		let arr = [];

		let req = await fetch(`${config.BASE_URL}/doctor/patients`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		let res = await req.json();
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

		return [null, req, arr];
	} catch (error) {
		return [error];
	}
};

export const PatientPrecription = async (patientId) => {
	try {
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
