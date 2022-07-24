import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseEdit = () => {
	const navigate = useNavigate();
	const params = useParams();

	const [data, setData] = useState({});

	const classref = doc(db, 'Courses', params.id);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const docSnap = await getDoc(classref);
				setData(docSnap.data());
			} catch (error) {
				console.log(error);
			}
		};
		console.log('Update');
		fetchStudent();
	}, []);

	const handleChange = (name) => (event) => {
		//console.log(event.target.value);
		setData({ ...data, [name]: event.target.value });
	};

	const handleSubmit = async () => {
		await updateDoc(doc(db, 'Courses', params.id), data);
		toast('Class Updated');
		console.log(data);
		navigate('/courselist');
	};

	return (
		<>
			<Formik initialValues={data} onSubmit={handleSubmit}>
				<Form>
					<div className="container p-0 m-0 ">
						<div className="col-lg-9 ">
							<div className="row mt-2">
								<div className="col-sm-12">
									<div className="topmg">
										<h3 className="page-title">Edit Class</h3>
										<ul className="breadcrumb">
											<li className="breadcrumb-item">Classes</li>
										</ul>
									</div>
									<h5 className="form-title"></h5>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Class</label>
										<Field
											className="form-control"
											type="string"
											name="CourseName"
											value={data.CourseName}
											onChange={handleChange('CourseName')}
										/>
									</div>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Admission Fee</label>
										<Field
											className="form-control"
											type="text"
											name="Duration"
											value={data.Admissionfee}
											onChange={handleChange('Duration')}
										/>
									</div>
								</div>

								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Monthly fee</label>
										<Field
											className="form-control"
											type="text"
											name="SemesterFee"
											value={data.Monthlyfee}
											onChange={handleChange('SemesterFee')}
										/>
									</div>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Session fee</label>
										<Field
											className="form-control"
											type="text"
											name="SessionFee"
											value={data.SessionFee}
											onChange={handleChange('SessionFee')}
										/>
									</div>
								</div>

								<div className="col-xs-12">
									<button
										className="btn btn-warning text-center mb-4 "
										type="submit"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</>
	);
};

export default CourseEdit;
