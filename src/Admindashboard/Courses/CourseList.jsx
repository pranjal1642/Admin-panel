import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { FiPlusCircle } from 'react-icons/fi';
import DataTable from 'react-data-table-component-with-filter';
function numberWithCommas(x) {
	debugger;
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const CourseList = () => {
	const [dataShow, setData] = useState([]);
	const [order, setOrder] = useState('ASC');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);

			const querySnapshot = collection(db, 'Courses');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setLoading(false);

			setData(list);
		})();
	}, []);
	let count = 1;
	dataShow.map((student) => {
		if (student !== 'undefined') {
			count = count + 1;
		}
	});
	const loadingMessage = () => {
		return (
			loading && (
				<div className="d-flex justify-content-center">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			)
		);
	};
	const columns = [
		{
			name: 'Class',
			selector: (row) => row.CourseName,

			sortable: true,
		},
		{
			name: 'Admission Fee',
			selector: (row) => numberWithCommas(row.Admissionfee),
			sortable: true,
		},
		{
			name: 'Monthly Fee',
			// selector: 'Course',
			selector: (row) => numberWithCommas(row.Monthlyfee),
			sortable: true,
		},
		{
			name: 'Action',
			button: true,
			selector: 'id',
			cell: (row) => (
				<div>
					<button className="btn btn-outline-warning border-0 m-1 p-0  ">
						<Link
							className="btn fa fa-pencil-square-o "
							to={`/CourseEdit/${row.id}`}
						></Link>
					</button>
					<button className="btn btn-outline-warning border-0 m-0 p-0  ">
						<Link
							className=" btn fa fa-eye"
							to={`/studentsinfo?CourseName=${row?.CourseName}`}
						/>
					</button>
					{/* <button onClick={() => deletedata(row.id)}>{<MdDelete />}</button> */}
				</div>
			),
		},
	];

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
					<DataTable
						columns={columns}
						data={dataShow}
						striped
						highlightOnHover
						defaultSortField="name"
						pagination={1 - 5}
						defaultSortAsc={false}
						viewtotal={true}
					/>
					{loadingMessage()}
				</div>
			</div>
		</>
	);
};

export default CourseList;
