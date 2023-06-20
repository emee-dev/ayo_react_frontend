import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doctor from "./pages/DoctorDashboard";
import Patient from "./pages/PatientDashboard";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import "rsuite/dist/rsuite.min.css";
import "./App.css";

import { AuthProvider } from "./utils/context/AuthProvider";

const RoutesWrapper = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="register" element={<Register />} />
						<Route path="signin" element={<Login />} />

						<Route path="/" element={<IndexPage />} />

						{/* we want to protect these routes */}
						<Route element={<RequireAuth role="PATIENT" />}>
							<Route path="patient" element={<Patient />} />
						</Route>

						<Route element={<RequireAuth role="DOCTOR" />}>
							<Route path="doctor" element={<Doctor />} />
						</Route>

						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RoutesWrapper />
	</React.StrictMode>
);
