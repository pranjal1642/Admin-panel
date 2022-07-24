import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const StudentAccount = () => {
	const [dataShow, setData] = useState([]);

	// let count = 0;
	// dataShow?.map((list) => {
	// 	if (list !== 'undefined') {
	// 		count = count + 1;
	// 	}
	// });

	useEffect(() => {
		(async () => {
			const querySnapshot = await getDocs(collection(db, 'UserRegister'));
			const list = [];
			querySnapshot.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setData(list);
		})();
	}, []);
	return (
		<>
			<div>
				<div className="container p-0 m-0">
					<Row>
						<Col sm={9}>
							<div className="page-header     ">
								<Row>
									<Col className="col">
										<h3 className="page-title">Students</h3>
										<ul className="breadcrumb">
											<li className="breadcrumb-item">Dashboard</li>
											<li className="breadcrumb-item active">Students</li>
										</ul>
									</Col>
								</Row>
							</div>
							<Table className="table">
								<thead>
									<tr>
										<th scope="col">S-id</th>
										<th scope="col">Name</th>
										<th scope="col">E-mail</th>
										<th scope="col">Password</th>
									</tr>
								</thead>
								<tbody>
									{dataShow?.map((list, index) => {
										return (
											<tr>
												<td scope="row">{list.id}</td>
												<td>{list?.name}</td>
												<td>{list?.email}</td>
												<td>{list?.password}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default StudentAccount;
