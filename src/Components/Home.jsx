import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<Link className="btn btn-primary" to={'/login'}>
				Login
			</Link>
		</div>
	);
};

export default Home;
