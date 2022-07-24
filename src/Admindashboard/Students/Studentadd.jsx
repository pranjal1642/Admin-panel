import React, { useEffect, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';

import { db } from '../../Firebase/firebaseConfig';
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavItem } from 'react-bootstrap';

const Studentadd = () => {
	const [dataShow, setShow] = useState([]);
	const [user, setUser] = useState([]);
	const [checkoptionValue, setCheckOptionValue] = useState(false);
	const [gotStudent, setGotStudent] = useState(false);
	const [details, setDetail] = useState(null);

	const navigate = useNavigate();
	const [data, setData] = useState({
		Name: '',
		Course: '',
		rollNumber: '',
		admissionfees: false,
		monthlyfees: false,
		timeStamp: '',
	});

	const addData = async (e) => {
		try {
			const docRef = await addDoc(collection(db, 'StudentInfo'), {
				Name: e.Name,
				Course: e.Course,
				rollNumber: e.rollNumber,
				addmissionfees: 'Pending',
				monthlyfees: 'Pending',
				timeStamp: serverTimestamp(),
			});
			console.log('Document written with ID:', docRef.id);
			toast.success('Add stutudent Scussefully');
			navigate(`/studentsinfo`);
		} catch (e) {
			toast.error('error');
		}
	};

	const handleSubmit = async (e) => {
		let newdata = { ...details, Course: checkoptionValue };
		console.log(newdata);
		try {
			debugger;
			const { Course } = newdata;
			const studentRef = collection(db, 'StudentInfo');

			const qroll = query(studentRef, where('Course', '==', Course));

			const querySnap = await getDocs(qroll);

			let roll = +parseInt(Course) * 1000 + querySnap.size + 1;

			const dataCopy = { ...newdata };
			dataCopy.rollNumber = roll;
			addData(dataCopy);
		} catch {
			toast.error('error  ');
		}
	};
	useEffect((id) => {
		(async () => {
			const querySnapshot = collection(db, 'Courses');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const q2 = await getDocs(collection(db, 'Users'));
			const list = [];
			const q = [];
			querySnap2.forEach((doc) => {
				return list.push({ ...doc.data(), id: doc.id });
			});
			q2.forEach((doc) => {
				return q.push({ ...doc.data(), id: doc.id });
			});
			setShow(list);
			setUser(q);
		})();
	}, []);

	const [state, setState] = useState([]);

	useEffect(() => {
		(async () => {
			const q3 = await getDocs(collection(db, 'StudentInfo'));
			const add = [];
			q3.forEach((doc) => {
				return add.push({ ...doc.data(), id: doc.id });
			});

			setState(add);
		})();
	});

	const classHandler = async (e) => {
		debugger;
		if (e.target.value === '') {
			setCheckOptionValue(false);
			setGotStudent(false);
		} else {
			setCheckOptionValue(e.target.value);
		}
	};
	const findUserHandler = async (e) => {
		setGotStudent(false);

		setDetail(null);
		const userquery = collection(db, 'Users');
		const q = query(userquery, where('Name', '==', e.target.value));

		const querysnap = await getDocs(q);
		querysnap.forEach((doc) => {
			setDetail(doc.data());
		});

		setGotStudent(true);
	};
	return (
		<>
			<Formik initialValues={data} onSubmit={handleSubmit}>
				<Form>
					<div className="container p-0 m-0 ">
						<div className="row">
							<div className="col-lg-9 ">
								<div className="row mt-2">
									<div className="col-sm-12">
										<div className="topmg">
											<h3 className="page-title">Add Students</h3>
											<ul className="breadcrumb">
												<li className="breadcrumb-item">Students</li>
											</ul>
										</div>
										<h5 className="form-title">
											<span>Student Information</span>
										</h5>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="name">Name</label>
											<Field
												className="form-control"
												as="select"
												name="Name"
												value={user.Name}
												onChange={findUserHandler}
											>
												<option value={''}>Select Name</option>
												{checkoptionValue &&
													user &&
													user.length > 0 &&
													user.map((q) => (
														<option
															disabled={state.some(
																(item) => item.Name === q.Name,
															)}
														>
															{q.Name}
														</option>
													))}
											</Field>
											<ErrorMessage name="Name" />
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Class</label>
											<Field
												as="select"
												className="form-control"
												name="Course"
												value={user.Course}
												onChange={classHandler}
											>
												<option value={''}>Select class</option>
												{dataShow?.map((list, index) => {
													return (
														<>
															<option
																className="ascending order"
																key={'index'}
																disabled={(CourseName) => {
																	if (
																		(CourseName =
																			'' && CourseName === list.CourseName)
																	) {
																		toast.success(' Already ADD');
																	} else {
																		toast.error('Error');
																	}
																}}
															>
																{list?.CourseName}
															</option>
															;
														</>
													);
												})}
											</Field>
											<ErrorMessage name="Course" />
										</div>
									</div>
									{/* width: 50%; display: inline-block; margin-bottom: 15px; } */}
									<div>
										<div className="table-responsive-md">
											{user && details && (
												<>
													<table className="table table-hover ">
														<thead>
															<tr className=" col-2 text-truncate">
																<th scope="col">Userid</th>
																<th scope="col">Name</th>
																<th scope="col">E-mail</th>
																<th scope="col">FatherName</th>
																<th scope="col">Mothername</th>
																<th scope="col">Parent's Number</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>{details.userName}</td>
																<td>{details.Name}</td>
																<td>{details.email}</td>
																<td>{details.Fathername}</td>
																<td>{details.Mname}</td>
																<td>{details.Pnumber}</td>
															</tr>
														</tbody>
													</table>
												</>
											)}
										</div>
									</div>
									<div className="text-center">
										<button
											className="btn btn-warning text-center mb-4 "
											type="submit"
											disabled={!gotStudent}
										>
											Verify Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
};

export default Studentadd;
