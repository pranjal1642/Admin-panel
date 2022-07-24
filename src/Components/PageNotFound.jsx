import React from 'react';
import { useParams } from 'react-router-dom';

const PageNotFound = () => {
	const params = useParams();
	let message = `"${params.pageName}" page not found!`;
	if (params.pageName === 'admin') {
		message = 'You need to be logged in to access this page.';
	}

	return <h1>{message}</h1>;
};

export default PageNotFound;
