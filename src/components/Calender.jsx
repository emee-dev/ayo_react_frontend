import { useEffect, useState, useContext } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ScrollBar from "@fullcalendar/scrollgrid"; // a plugin!
import useAuth from "../utils/context/useAuth";
import DashboardContext from "../utils/context/DashboardContext";
import {
	patientAppointments,
	doctorAppointments,
	deleteEvent,
} from "../utils/requests/CalendarEvents";
import NoDataPlaceHolder from "./NoData";
import "./Calender.css";

const Calender = () => {
	const [events, setEvents] = useState([]);
	const { viewType } = useContext(DashboardContext);
	const { auth } = useAuth();
	let userId = auth.userId;

	async function PatientEvent() {
		let [error, req, patientEvent, res] = await patientAppointments(userId);
		if (error) return console.error(error);

		if (req.status === 200) {
			setEvents(patientEvent);
		} else if (req.status === 400) {
			setEvents(patientEvent);
		} else {
			return console.error(
				"Request is not okay at file 'Calender.jsx' at Line '31'",
				res
			);
		}
	}

	async function DoctorEvent() {
		let [error, req, doctorEvent, res] = await doctorAppointments(userId);
		if (error) return console.error(error);

		if (req.status === 200) {
			console.log(doctorEvent);
			setEvents(doctorEvent);
		} else if (req.status === 400) {
			setEvents(doctorEvent);
		} else {
			return console.error(
				"Request is not okay at file 'Calender.jsx' at Line '48'",
				res
			);
		}
	}

	useEffect(() => {
		if (viewType === "patient") PatientEvent();
		if (viewType === "doctor") DoctorEvent();
	}, []);

	const handleEventClick = async (clickInfo) => {
		if (viewType !== "doctor") return;
		if (confirm(`Are you sure you want to delete '${clickInfo.event.title}'`)) {
			// make api call to db to remove this event
			const eventId = clickInfo.event?.extendedProps?._id;
			const [error, req, res] = await deleteEvent(eventId);
			if (error) return console.error(error);
			if (req.status !== 200) return console.error("Request is not okay", res);
			clickInfo.event.remove();
		}
	};

	// dynamically change event content
	function renderEventContent(eventInfo) {
		return (
			<>
				<b>{eventInfo.event.date}</b>
				{viewType === "patient" ? (
					<i>Meeting with Dr. {eventInfo.event?.extendedProps?.doctor_name}</i>
				) : (
					<i>Meeting with {eventInfo.event?.extendedProps?.patient_name}</i>
				)}
			</>
		);
	}

	return (
		<div className="wrapper_calender">
			{events.length === 0 ? (
				<NoDataPlaceHolder displayText="You have no appointments, yet" />
			) : (
				<FullCalendar
					aspectRatio={9}
					contentHeight={510}
					plugins={[dayGridPlugin, ScrollBar]}
					initialView="dayGridWeek"
					dayMinWidth={80}
					weekends={true}
					events={events}
					eventClick={handleEventClick}
					eventContent={renderEventContent}
				/>
			)}
		</div>
	);
};

export default Calender;
