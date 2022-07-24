import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Slidebar from '../Admindashboard/Slidebar';

const Layout = () => {
	return (
		<>
			<div className="container p-0 m-0">
				<Row>
					<Col lg={3}>
						<Slidebar />
					</Col>
					<Col sm={9}>
						<Outlet />
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Layout;
