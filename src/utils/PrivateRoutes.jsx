import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
	return sessionStorage.getItem('Auth Token') ? (
		<Outlet />
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoutes;
