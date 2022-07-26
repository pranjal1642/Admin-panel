import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Slidebar from '../Admindashboard/Slidebar';

const Layout = () => {
	const [w, setw] = useState();

	return (
		<>
			<div className="container p-0 m-0">
				<Row>
					{!w ? (
						<>
							<Col lg={3}>
								<Slidebar setwid={(x) => setw(x)} />
							</Col>
							<Col lg={9}>
								<Outlet />
							</Col>
						</>
					) : (
						<>
							<Col lg={1}>
								<Slidebar setwid={(x) => setw(x)} />
							</Col>
							<Col sm={11}>
								<Outlet />
							</Col>
						</>
					)}
				</Row>
			</div>
		</>
	);
};

export default Layout;
