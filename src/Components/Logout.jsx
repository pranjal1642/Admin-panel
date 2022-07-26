import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '.././Styling/sidebar.css';

const Logout = () => {
	const navigate = useNavigate();

	const authentication = getAuth();

	const handleLogout = () => {
		debugger;

		signOut(authentication);
		Swal.fire({
			title: 'Are you sure to logout',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Logout it!',
		}).then((result) => {
			if (result.isConfirmed) {
				sessionStorage.removeItem('Auth Token');
				navigate('/');
			} else {
				Swal.fire({
					title: 'You are logged in',
					timer: 1000,
				});
			}
		});
	};
	return (
		<div>
			<button className="f-4x" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Logout;
