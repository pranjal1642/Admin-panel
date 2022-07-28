import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { FiPlusCircle } from 'react-icons/fi';
const CourseList = () => {
	const [dataShow, setData] = useState([]);
	const [order, setOrder] = useState('ASC');

	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'Courses');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setData(list);
		})();
	}, []);
	let count = 1;
	dataShow.map((student) => {
		if (student !== 'undefined') {
			count = count + 1;
		}
	});

	return (
		<>
			<div>
				<div className="container">
					<div className="page-header">
						<Row>
							<Col className="col ">
								<h3 className="page-title mt-3">Classes</h3>
							</Col>
						</Row>
					</div>
					<div className="text-end me-2 mb-2">
						<Link
							to={`/addcourse`}
							className=" btn btn-light text-decoration-none "
						>
							<b>Add Class</b>
							<FiPlusCircle className="fa-2x " />
						</Link>
					</div>
					<div className="table-responsive">
						<Table className="table  table-hover table-breadcumb active table-bordered table align-middle">
							<thead>
								<tr className="bg-warning">
									<th scope="col">Class</th>
									<th scope="col">Admission Fee</th>
									<th scope="col">Monthly Fee</th>
									<th scope="col">Session Fee</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{dataShow?.map((list, index) => {
									return (
										<tr key={index}>
											<td>{list?.CourseName}</td>
											<td>Rs {list?.Admissionfee}</td>
											<td>Rs {list?.Monthlyfee}</td>
											<td>Rs {list?.SessionFee}</td>
											<th scope="col">
												<button className="btn btn-outline-warning border-0 m-1 p-0  ">
													<Link
														className="btn fa fa-pencil-square-o "
														to={`/CourseEdit/${list.id}`}
													></Link>
												</button>
												<button className="btn btn-outline-warning border-0 m-0 p-0  ">
													<Link
														className=" btn fa fa-eye"
														to={`/studentsinfo?CourseName=${list?.CourseName}`}
													/>
												</button>
											</th>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseList;
