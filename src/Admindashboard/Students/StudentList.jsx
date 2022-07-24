import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/firebaseConfig';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { BiDownload } from 'react-icons/bi';

import '../../Styling/studentlist.css';
import DataTable from 'react-data-table-component';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { CSVLink } from 'react-csv';

const StudentList = () => {
	const [dataShow, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [standards, setStandards] = useState([]);

	const [loading, setLoading] = useState(false);

	const deletedata = async (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to delete this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteDoc(doc(db, 'StudentInfo', id));
				const oneIndex = dataShow.findIndex((val) => val.id === id);
				const cloned = [...dataShow];
				cloned.splice(oneIndex, 1);
				setData(cloned);
				Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
			}
		});
	};

	let [searchparam, setSearchparam] = useSearchParams();

	useEffect(() => {
		const Search = async () => {
			const param = searchparam.get('CourseName');
			let querys = null;
			if (param) {
				querys = query(
					collection(db, 'StudentInfo'),
					where('Course', '==', param),
				);
			} else {
				setLoading(true);
				querys = collection(db, 'StudentInfo');
			}
			const querySnapshot = await getDocs(querys);
			const list = [];
			querySnapshot.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
				setLoading(false);
			});
			setData(list);
		};

		Search();
	}, [searchparam]);

	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'Courses');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setStandards(list);
		})();
	}, []);
	const [status, setStatus] = useState();
	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'transactions');
			const amount = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(amount);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setStatus(list);
		})();
	}, []);

	let count = 0;
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
			name: 'Roll Number',
			selector: (row) => row.rollNumber,

			sortable: true,
		},
		{
			name: 'Full Name',
			selector: (row) => row.Name,
			sortable: true,
		},
		{
			name: 'Class',
			// selector: 'Course',
			selector: (row) => row.Course,
			sortable: true,
		},
		{
			name: 'Fee Status',
			selector: (row) => <div className={`common `}>{row.monthlyfees}</div>,
		},
		{
			name: 'Action',
			button: true,
			selector: 'id',
			cell: (row) => (
				<div>
					{/* <button className="m-2" onClick={() => handleUserEdit(row)}>
						{<FaUserEdit />}
					</button> */}

					<button onClick={() => deletedata(row.id)}>{<MdDelete />}</button>
				</div>
			),
		},
	];
	// const [standard, setstandard] = useState('');
	const header = [
		{
			label: 'Roll Number',
			key: 'rollNumber',
		},
		{ label: 'Name', key: 'Name' },
		{ label: 'Class', key: 'Course' },
		{ label: 'Admission Fees', key: 'addmissionfees' },
		{ label: 'Monthly Fees', key: 'monthlyfees' },
	];

	return (
		<>
			<div>
				<h3 className="page-title mt-3">Students Details</h3>
				<ul className="breadcrumb">
					<li className="breadcrumb-item">Dashboard</li>
					<li className="breadcrumb-item active">
						<Link to={`/studentadd`} className="text-decoration-none">
							Add Students
						</Link>
					</li>
				</ul>

				{/* <div className="text-center">
					<h5>Total Students: {count}</h5>
				</div> */}

				<div className="d-flex">
					<div class="input-group mb-2">
						<div class="form-outline">
							<input
								type="search"
								class="form-control"
								placeholder="search..."
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
						</div>
					</div>
					<div class="dropdown">
						<button
							class="btn btn-light dropdown-toggle me-5"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Classes
						</button>

						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
							<li>
								<Link class="dropdown-item" to={`/studentsinfo`}>
									All
								</Link>
							</li>

							{standards.map((i) => {
								return (
									<>
										<li>
											<Link
												class="dropdown-item"
												to={`/studentsinfo?CourseName=${i?.CourseName}`}
											>
												{i.CourseName}
											</Link>
										</li>
									</>
								);
							})}
						</ul>
					</div>
					<div className="">
						<CSVLink
							data={dataShow}
							headers={header}
							filename={'Students List'}
							target={'_blank'}
							type="button"
							className="btn btn-success"
						>
							<BiDownload />
						</CSVLink>
					</div>
				</div>

				<div className="table-responsive-md">
					<DataTable
						columns={columns}
						data={dataShow.filter((val) => {
							if (search === '') {
								return val;
							} else if (
								val.Name.toLowerCase().includes(search.toLowerCase())
							) {
								return val;
							}
						})}
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

export default StudentList;
