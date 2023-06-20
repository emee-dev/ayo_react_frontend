import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const GetLocalStorage = () => {
		let token = JSON.parse(localStorage.getItem("token"));
		if (!token) return null;
		return jwt_decode(token?.accessToken);
	};

	const [auth, setAuth] = useState(GetLocalStorage());

	const SetLocalStorage = (payload) => {
		localStorage.setItem("token", JSON.stringify(payload));
		let token = jwt_decode(payload?.accessToken);
		setAuth(token);
	};

	const Logout = () => localStorage.removeItem("token");

	return (
		<AuthContext.Provider
			value={{ auth, setAuth: SetLocalStorage, logOut: Logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
