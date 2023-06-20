import { config } from "../config";

export const patientAppointments = async (patientId) => {
	try {
		let eventSource = [];

		let req = await fetch(`${config.BASE_URL}/patient/appointments`, {
			method: "POST",
			body: JSON.stringify({ patientId }),
			headers: { "Content-Type": "application/json" },
		});
		let res = await req.json();

		res?.data?.map((item) => {
			eventSource.push({
				id: crypto.randomUUID(),
				title: `Appointment with Dr. ${item.doctor_name} & Patient ${item.patient_name}`,
				date: `${item.date.split("T")[0]}`,
				extendedProps: {
					eventId: `${item._id}`,
					doctor_name: `${item.doctor_name}`,
					patient_name: `${item.patient_name}`,
				},
			});
		});

		return [null, req, eventSource];
	} catch (error) {
		return [error];
	}
};

export const doctorAppointments = async (doctorId) => {
	try {
		let eventSource = [];

		let req = await fetch(`${config.BASE_URL}/doctor/appointments`, {
			method: "POST",
			body: JSON.stringify({ doctorId }),
			headers: { "Content-Type": "application/json" },
		});
		let res = await req.json();

		res?.data?.map((item) => {
			item.appointments.map((element) => {
				eventSource.push({
					id: crypto.randomUUID(),
					title: `Appointment with Dr. ${element.doctor_name} & Patient ${element.patient_name}`,
					date: `${element.date.split("T")[0]}`,
					extendedProps: {
						eventId: `${element._id}`,
						doctor_name: `${element.doctor_name}`,
						patient_name: `${element.patient_name}`,
					},
				});
			});
		});
		return [null, req, eventSource];
	} catch (error) {
		return [error];
	}
};

export const deleteEvent = async (eventId) => {
	try {
		let req = await fetch(`${config.BASE_URL}/doctor/appointments`, {
			method: "DELETE",
			body: JSON.stringify({ eventId }),
			headers: { "Content-Type": "application/json" },
		});
		let res = await req.json();

		return [null, req, res];
	} catch (error) {
		return [error];
	}
};
