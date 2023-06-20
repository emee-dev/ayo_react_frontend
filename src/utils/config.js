const BASE_URL = import.meta.env.PROD
	? import.meta.env.VITE_BASE_URL
	: "http://localhost:7000";

export const config = {
	BASE_URL,
	AUTH_BASE_URL: `${BASE_URL}/auth`,
};
