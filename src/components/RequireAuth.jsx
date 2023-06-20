import { useLocation, Navigate } from "react-router-dom";

import NotAuthorized from "../pages/NotAuthorized";
import useAuth from "../utils/context/useAuth";
import { Outlet } from "react-router-dom";

const RequireAuth = ({ role }) => {
	const { auth } = useAuth();
	const currentLocation = useLocation();

	if (!auth)
		return (
			<Navigate
				to="/signin"
				state={{ from: currentLocation.pathname }}
				replace
			/>
		);

	if (auth?.role !== role) return <NotAuthorized />;

	return <Outlet />;
};

export default RequireAuth;
