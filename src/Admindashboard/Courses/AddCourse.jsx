import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddCourse = () => {
	const navigate = useNavigate();

	const [data, setData] = useState({
		CourseName: '',
		Admissionfee: '',
		Monthlyfee: '',
		SessionFee: '',
		timeStamp: '',
	});
	const validationSchema = Yup.object({
		CourseName: Yup.string().required(' Class Required'),
		Admissionfee: Yup.string().required(' Monthly Fee Required'),
		Monthlyfee: Yup.string().required(' Semester Fees Required'),
		SessionFee: Yup.string().required(' Session Fees Required'),
	});
	const addData = async (data) => {
		try {
			const docRef = await addDoc(collection(db, 'Courses'), {
				CourseName: data.CourseName,
				Admissionfee: data.Admissionfee,
				Monthlyfee: data.Monthlyfee,
				SessionFee: data.SessionFee,
				timeStamp: serverTimestamp(),
			});
			console.log('Document written with ID:', docRef.id);
			toast.success('Add Class Scussefully');
			navigate(`/courselist`);
		} catch (e) {
			toast.error('Error adding details', e);
		}
	};
	const handleSubmit = (data) => {
		addData(data);
		console.log(data);
	};

	return (
		<>
			<Formik
				initialValues={data}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<div className="container p-0 m-0 ">
						<div className="col-lg-9     ">
							<div className="row mt-2">
								<div className="col-sm-12">
									<div className="topmg">
										<h3 className="page-title">Add Class</h3>
										<ul className="breadcrumb">
											<li className="breadcrumb-item">Classes</li>
											{/* <li className="breadcrumb-item active"></li> */}
										</ul>
									</div>
									<h5 className="form-title">
										{/* <span>Student Information</span> */}
									</h5>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Class</label>
										<Field
											className="form-control"
											type="string"
											name="CourseName"
											autocomplete="off"
										/>
										<small className="text-danger m-2">
											<ErrorMessage name="CourseName" />
										</small>
									</div>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Admission Fee</label>
										<Field
											className="form-control"
											type="text"
											name="Admissionfee"
											autocomplete="off"
										/>
										<small className="text-danger m-2">
											<ErrorMessage name="Admissionfee " />
										</small>
									</div>
								</div>

								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Monthly fee</label>
										<Field
											className="form-control"
											type="text"
											name="Monthlyfee"
											autocomplete="off"
										/>
										<small className="text-danger m-2">
											<ErrorMessage name="Monthlyfee" />
										</small>
									</div>
								</div>
								<div className="col-sm-6 xs-12">
									<div className="form-group">
										<label htmlFor="">Session fee</label>
										<Field
											className="form-control"
											type="text"
											name="SessionFee"
											autocomplete="off"
										/>
										<small className="text-danger m-2">
											<ErrorMessage name="SessionFee" />
										</small>
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

export default AddCourse;
