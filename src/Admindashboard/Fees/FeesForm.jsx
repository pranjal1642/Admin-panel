import React, { useEffect, useState } from 'react';
import { Form, Formik, Field, setFieldvalue, ErrorMessage } from 'formik';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const FeesForm = () => {
	const params = useParams();

	const navigate = useNavigate();
	const [user, setUser] = useState([]);
	const [gotStudent, setGotStudent] = useState(false);
	const [details, setDetail] = useState(null);
	const [verified, setVerified] = useState(false);
	const [monthtype, setMonthtype] = useState(false);

	const [dataShow, setData] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [stu, setStu] = useState([]);

	const [data, setShow] = useState({
		Name: '',
		CourseName: '',
	});
	const [transData, setTransData] = useState({
		type: '',
		timeStamp: serverTimestamp(),
		month: 'N/A',
	});

	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'Courses');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);
			const stuquery = await getDocs(collection(db, 'StudentInfo'));
			const stulist = [];
			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			stuquery.forEach((doc) => {
				stulist.push({ ...doc.data(), id: doc.id });
			});
			setData(list);
			setStu(stulist);
		})();
	}, []);
	const [filterData, setFilterData] = useState([]);

	const [selectstudent, setSelectstudent] = useState('');
	const [selectname, setSelectName] = useState('');

	useEffect(() => {
		debugger;
		if (selectstudent) {
			setFilterData(stu.filter((val) => val.Course === selectstudent));
			setShow(selectstudent);
		} else {
			setFilterData(stu);
		}
	}, [selectstudent]);

	console.log(selectstudent);

	const findUserHandler = async (e, id) => {
		debugger;
		setSelectName(e.target.value);
		console.log(selectname, 'Name');

		setDetail(null);
		const userquery = collection(db, 'Users');
		const q = query(userquery, where('Name', '==', e.target.value));

		const querysnap = await getDocs(q);
		console.log(q, 'q');

		querysnap.forEach((doc) => {
			setDetail(doc.data());
		});
	};

	const handleChange = (e) => {
		setGotStudent(true);
		debugger;
		setTransData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSelect = (e) => {
		debugger;

		setTransData((prevState) => ({
			...prevState,
			type: e.target.value,
		}));

		let cls = dataShow.filter((e) => e.CourseName === selectstudent);

		if (e.target.value === 'Admission Fee') {
			setGotStudent(true);
			setMonthtype(false);
			setTransData((prevState) => ({
				...prevState,
				amount: cls[0].Admissionfee,
			}));
		} else if (e.target.value === 'Monthly Fee') {
			setMonthtype(true);
			setTransData((prevState) => ({
				...prevState,
				amount: cls[0].Monthlyfee,
			}));
		}
	};
	const checkMonth = (monthSelect) => {
		let check = false;
		transactions.forEach(({ month }) => {
			if (month) {
				if (month === monthSelect) {
					check = true;
				}
			}
		});

		return check;
	};
	const checkFeetype = (TypeSelect) => {
		let check = false;
		transactions.forEach(({ type }) => {
			if (type) {
				if (type === TypeSelect) {
					check = true;
				}
			}
		});

		return check;
	};

	useEffect(() => {
		if (verified) {
			debugger;
			const fetchTransactions = async () => {
				debugger;
				const transRef = collection(db, 'transactions');

				const q = query(transRef, where('Name', '==', selectname));
				const querySnap = await getDocs(q);
				const transactions = [];
				querySnap.forEach((doc) => {
					return transactions.push(doc.data());
				});
				setTransactions(transactions);
			};

			fetchTransactions();
		}
	}, [verified]);

	const handleSubmit = async (e, id) => {
		debugger;
		const data = { ...transData, CourseName: selectstudent, Name: selectname };
		console.log(stu);
		let std = stu.find((e) => e.Name === selectname);
		const studentRef = doc(db, 'StudentInfo', std.id);
		switch (data.type) {
			case 'Admission Fee': {
				debugger;

				await updateDoc(studentRef, {
					addmissionfees: 'Paid',
				});
			}

			case 'Monthly Fee':
				if (data.amount) {
					await updateDoc(studentRef, {
						monthlyfees: 'Paid',
					});
				}
		}

		if (data.amount?.trim() === '' || data.type === '') {
			toast.error('Invalid Details');
			return;
		}
		//else if (data.month?.trim() === '') {
		// 	toast.warning('Select Month');
		// 	return;
		// }

		const docRef = await addDoc(collection(db, 'transactions'), data);
		console.log(docRef.id);

		setTransData((prevState) => ({
			...prevState,
			CourseName: '',
			Name: '',
			amount: '',
			type: '',
			month: '-',
		}));
		toast.success('Fees Paid Successfully');
		navigate('/transaction');
		console.log(data);
	};

	return (
		<>
			<Formik initialValues={dataShow} onSubmit={handleSubmit}>
				<Form>
					<div className="container p-0 m-0 ">
						<div className="col-lg-9 ">
							<div className="row mt-2">
								<div className="col-sm-12">
									<div className="topmg">
										<h3 className="page-title">Fees</h3>
										<ul className="breadcrumb">
											<li className="breadcrumb-item">Dashboard</li>
										</ul>
									</div>
									<h5 className="form-title"></h5>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Class</label>
										<Field
											className="form-control"
											as="select"
											name="CourseName"
											value={dataShow.CourseName}
											disabled={verified}
											onChange={({ target: { value } }) =>
												setSelectstudent(value)
											}
										>
											<option>Select Class</option>
											{dataShow.map((list) => {
												return <option key={list.id}>{list.CourseName}</option>;
											})}
										</Field>
									</div>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Name</label>
										<Field
											className="form-control"
											as="select"
											name="Name"
											value={user.Name}
											disabled={verified}
											onChange={findUserHandler}
										>
											<option>Select Name</option>;
											{filterData.map((s) => {
												return <option key={s.id}>{s.Name}</option>;
											})}
										</Field>
									</div>
								</div>
								<div className="table-responsive-md">
									{details && (
										<>
											<div class="card mb-3">
												<div class="card-body">
													<h5 class="card-title text-center text-uppercase fw-bold mb-4">
														Student Information
													</h5>
													<div className="row">
														<div className=" d-flex col-6 ">
															<span className=" fw-bold justify-content-inline">
																Class-id:
															</span>
															{details.userName}
														</div>
														<div className=" d-flex col-6 ">
															<span className=" fw-bold justify-content-inline ">
																FatherName:
															</span>
															{details.Fathername}
														</div>
														<div className=" d-flex col-6 ">
															<span className=" fw-bold">Name: </span>
															{details.Name}
														</div>
														<div className=" d-flex col-6 ">
															<span className=" fw-bold">MotherName: </span>
															{details.Mname}
														</div>
														<div className=" d-flex col-6 ">
															<span className=" fw-bold">E-mail: </span>
															{details.email}
														</div>

														<div className="d-flex col-6 ">
															<span className=" fw-bold">PhoneNumber: </span>
															{details.Pnumber}
														</div>
													</div>

													<div className="text-center mt-4">
														{verified ? (
															<span className="btn btn-success">
																verified
																{/* <button onClick={editVerify}></button> */}
															</span>
														) : (
															<button
																onClick={() =>
																	setVerified((prevState) => !prevState)
																}
																className="btn btn-warning"
															>
																verify
															</button>
														)}
													</div>
												</div>
											</div>
										</>
									)}
								</div>

								{verified && (
									<>
										<div className="col-sm-6 xs-12">
											<div className="form-group">
												<Field
													className="form-control"
													as="select"
													name="type"
													value={transData.type}
													onChange={handleSelect}
												>
													<option value={''}>Select Fee</option>
													<option
														value="Admission Fee"
														disabled={checkFeetype('Admission Fee')}
													>
														Admission Fee
													</option>
													<option
														value="Monthly Fee"
														disabled={transactions.length === 0 ? true : false}
													>
														Monthly Fee
													</option>
												</Field>
												<ErrorMessage
													className="text-warning"
													name="admissionFee"
												/>
											</div>
										</div>
										<div className="col-sm-6 xs-12">
											<div className="form-group">
												<Field
													className="form-control"
													type="text"
													name="amount"
													value={transData?.amount}
													onChange={handleChange}
												/>
											</div>
										</div>
										{monthtype && (
											<div className="col-sm-6 xs-12">
												<div className="form-group">
													<label htmlFor=""> Fees Months</label>
													<Field
														className="form-control"
														type="text"
														name="month"
														as="select"
														value={transData?.month}
														onChange={handleChange}
													>
														<option value={''}> Select Month</option>
														<option
															disabled={checkMonth('April')}
															value="April"
														>
															April
														</option>
														<option value={'May'} disabled={checkMonth('May')}>
															May
														</option>
														<option
															value={'June'}
															disabled={checkMonth('June')}
														>
															June
														</option>
														<option
															value={'July'}
															disabled={checkMonth('July')}
														>
															July
														</option>
														<option value={'Aug'} disabled={checkMonth('Aug')}>
															Aug
														</option>
														<option value={'Sep'} disabled={checkMonth('Sep')}>
															Sep
														</option>
														<option value={'Oct'} disabled={checkMonth('Oct')}>
															Oct
														</option>
														<option value={'Nov'} disabled={checkMonth('Nov')}>
															Nov
														</option>
														<option value={'Dec'} disabled={checkMonth('Dec')}>
															Dec
														</option>
														<option value={'Jan'} disabled={checkMonth('Jan')}>
															Jan
														</option>
														<option value={'Feb'} disabled={checkMonth('Feb')}>
															Feb
														</option>
														<option
															value={'March'}
															disabled={checkMonth('March')}
														>
															March
														</option>
													</Field>
												</div>
											</div>
										)}

										<div className="col-xs-12">
											<button
												className="btn btn-warning text-center mb-4 "
												type="submit"
												disabled={!gotStudent}
											>
												Submit
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
};

export default FeesForm;
