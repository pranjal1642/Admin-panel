import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/Login.css';

import 'firebase/firestore';

import {
	collection,
	addDoc,
	serverTimestamp,
	query,
	getDocs,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { Card, Container } from '@material-ui/core';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect } from 'react';
const Signup = () => {
	const [value, setValue] = useState();

	const navigate = useNavigate();

	const [data, setdata] = useState({
		Name: '',
		email: '',
		password: '',
		role: '',
		timeStamp: '',
		Fathername: '',
		Mname: '',
		Pnumber: '',
		userName: '',
	});

	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};

	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const validationSchema = Yup.object({
		Name: Yup.string()
			.min(2, 'Too Short')
			.max(20, 'Too Long')
			.required('Name Required'),
		email: Yup.string()
			.email('Invalid email format')
			.required('Email Required'),
		password: Yup.string()
			.required('Please Enter your password')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
			),
		Fathername: Yup.string().required('Enter Father name'),
		role: Yup.string().required('Select role'),
		Mname: Yup.string().required('Enter Mother name'),
		// Pnumber: Yup.string()
		// 	.required('Phone-No Required')
		// 	.matches(phoneRegExp, 'Phone number is not valid')
		// 	.min(10, 'to short')
		// 	.max(10, 'to long'),
	});
	const Authentication = (data) => {
		const authentication = getAuth();

		try {
			createUserWithEmailAndPassword(
				authentication,
				data.email,
				data.password,
			).then(async (response) => {
				debugger;
				const uid = response.user.uid;
				console.log(uid);
				const datacopy = { ...data };
				datacopy.timeStamp = serverTimestamp();
				datacopy.userName = await createUserName();

				addData(uid, datacopy);
				toast.success('Register succesfully');
				navigate('/studentadd');

				sessionStorage.setItem(
					'Auth Token',
					response._tokenResponse.refreshToken,
				);
				return response.user.uid;
			});
		} catch {
			console.log('Error in Uploading');
		}
	};

	const handleSubmit = async (e, value) => {
		debugger;
		console.log(e);
		console.log(value);

		Authentication(e);
	};

	const createUserName = async (e) => {
		const year = new Date().getFullYear().toString().slice(-2);
		const q = query(collection(db, 'Users'));
		const studentSnapshot = await getDocs(q);
		const studentsLength = String(studentSnapshot.size).padStart(2, 0);
		// console.log(totalStudents)
		return 'PR' + year + studentsLength;
	};

	const addData = async (uid, e) => {
		try {
			const docRef = await addDoc(collection(db, 'Users'), {
				Name: e.Name,
				email: e.email,
				password: e.password,
				role: e.role,
				uid: uid,
				timeStamp: e.timeStamp,

				Fathername: e.Fathername,
				Mname: e.Mname,
				Pnumber: value,
				userName: e.userName,
			});
			console.log('Document written with ID:', docRef.id);
		} catch (e) {
			console.error('Error adding details', e);
		}
	};
	useMemo(() => {
		console.log(value);
	}, [value]);

	const PhoneInputField = ({ field, form }) => {
		debugger;
		return (
			<PhoneInput
				country={'in'}
				className="anonymous"
				value={field.name}
				onChange={setValue}
				placeholder="Enter Phone Number"
				isValid={(value, country) => {
					if (value.match(/12345/)) {
						return 'Invalid value: ' + value + ', ' + country.name;
					} else if (value.match(/1234/)) {
						return false;
					} else {
						return true;
					}
				}}
			/>
		);
	};
	return (
		<>
			<Formik
				initialValues={data}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<div className="container">
						<div className="row">
							<div className="col ">
								<div className="row mt-2">
									<div className="col-sm-10">
										<div className="topmg">
											<h3 className="page-title"> Register Student</h3>
											<ul className="breadcrumb">
												<li className="breadcrumb-item"></li>
											</ul>
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Name</label>
											<Field className="form-control" type="text" name="Name" />
											<small className="text-danger m-2">
												<ErrorMessage name="Name" />
											</small>
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Role</label>
											<Field className="form-control" as="select" name="role">
												<option value={''}>Select Role</option>
												<option value={1}>Admin</option>
												<option value={2}>Staff</option>
												<option value={3}>Student</option>
											</Field>
											<small className="text-danger m-2">
												<ErrorMessage name="role" />
											</small>
										</div>
									</div>

									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">E-mail</label>
											<Field
												className="form-control"
												type="email"
												name="email"
											/>
											<small className="text-danger m-2">
												<ErrorMessage name="email" />
											</small>
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<label htmlFor="">Password</label>

										<div className="d-flex mt-0  ">
											<Field
												className="form-control"
												type={passwordShown ? 'text' : 'password'}
												name="password"
											/>
											<i
												onClick={togglePassword}
												className=" btn btn-warning fa fa-eye mb-0"
												aria-hidden="true"
											/>
										</div>
										<small className="text-danger m-2">
											<ErrorMessage name="password" />
										</small>
									</div>
									<div className="col-xs-12">
										<h5 className="form-title">
											<span>Parent Information</span>
										</h5>
									</div>
									<div className="col-sm-6 col-xs-12">
										<div className="form-group">
											<label htmlFor="Name">Father-Name</label>
											<Field
												className="form-control"
												type="name"
												name="Fathername"
											/>
											<small className="text-danger m-2">
												<ErrorMessage name="Fathername" />
											</small>
										</div>
									</div>
									<div className="col-sm-6 col-xs-12">
										<div className="form-group">
											<label htmlFor="Occupation">Mother-Name</label>
											<Field
												className="form-control"
												type="name"
												name="Mname"
											/>
											<small className="text-danger m-2">
												<ErrorMessage name="Mname" />
											</small>
										</div>
									</div>
									<div className="col-sm-6 col-xs-12">
										<div className="form-group">
											<label htmlFor="Number"> Parent-Number</label>
											<Field
												required="true"
												type="tel"
												component={PhoneInputField}
												name="Pnumber"
												value={data.Pnumber}
												onChange={(phone) => setdata('Pnumber', phone)}
											/>
											{/* <small className="text-danger m-2">
												<ErrorMessage name="Pnumber" />
											</small> */}
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
					</div>
				</Form>
			</Formik>
		</>
	);
};

export default Signup;
