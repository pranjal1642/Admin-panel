import React, { useState, useEffect } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { db } from '../../Firebase/firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const StudentEdit = (props) => {
	const [values, setValues] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
	};

	useEffect(() => {
		(async () => {
			debugger;
			const querySnapshot = await getDocs(collection(db, 'Users '));
			const list = [];
			querySnapshot.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});

			setValues(list);
		})();
	}, []);
	return (
		<>
			<Formik initialValues={values} onSubmit={handleSubmit}>
				<Form>
					<div className="container p-0 m-0">
						<div className="row">
							<div className="col-lg-9 ">
								<div className="row mt-2">
									<div className="col-sm-12">
										<div className="topmg">
											<h3 className="page-title"> Edit Student</h3>
											<ul className="breadcrumb">
												<li className="breadcrumb-item"></li>
											</ul>
										</div>
										<h5 className="form-title"></h5>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Name</label>
											<Field
												className="form-control"
												type="text"
												name="Name"
												value={values.Name}
											/>
											<span className="text-danger">
												<ErrorMessage name="Name" />
											</span>
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Role</label>
											<Field
												className="form-control"
												as="select"
												name="role"
												// onChange={handleChange('role')}
												value={values.role}
											>
												<option value={''}>Select Role</option>
												<option value={1}>Admin</option>
												<option value={2}>Sub-Admin</option>
												<option value={3}>Student</option>
											</Field>
											<span className="text-danger">
												<ErrorMessage name="role" />
											</span>
										</div>
									</div>

									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">E-mail</label>
											<Field
												className="form-control"
												type="email"
												name="email"
												// onChange={handleChange('email')}
												value={values.email}
											/>
											<span className="text-danger">
												<ErrorMessage name="email" />
											</span>
										</div>
									</div>
									<div className="col-sm-6 xs-12">
										<div className="form-group">
											<label htmlFor="">Password</label>
											<Field
												className="form-control"
												type="password"
												name="password"
												// onChange={handleChange('password')}
												value={values.password}
											/>
											<span className="text-danger">
												<ErrorMessage name="password" />
											</span>
										</div>
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
												// onChange={handleChange('Fathername')}
												value={values.Fathername}
											/>
											<span className="text-danger">
												<ErrorMessage name="Fathername" />
											</span>
										</div>
									</div>
									<div className="col-sm-6 col-xs-12">
										<div className="form-group">
											<label htmlFor="Occupation">Mother-Name</label>
											<Field
												className="form-control"
												type="name"
												name="Mname"
												// onChange={handleChange('Mname')}
												value={values.Mname}
											/>
											<span className="text-danger">
												<ErrorMessage name="Mname" />
											</span>
										</div>
									</div>
									<div className="col-sm-6 col-xs-12">
										<div className="form-group">
											<label htmlFor="Number"> Parent-Number</label>
											<Field
												className="form-control"
												type="number"
												name="Pnumber"
												// onChange={handleChange('Pnumber')}
												value={values.Pnumber}
											/>
											<span className="text-danger">
												<ErrorMessage name="Pnumber" />
											</span>
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

export default StudentEdit;
