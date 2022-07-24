import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';

import firebase from 'firebase/compat/app';

import { firebaseConfig } from './Firebase/firebaseConfig';
import Studentadd from './Admindashboard/Students/Studentadd';
import StudentEdit from './Admindashboard/Students/StudentEdit';
import StudentAccount from './Admindashboard/Students/StudentAccount';
import Admin from './Admindashboard/Admin';
import Layout from './Components/Layout';
import StudentList from './Admindashboard/Students/StudentList';
import CourseList from './Admindashboard/Courses/CourseList';
import AddCourse from './Admindashboard/Courses/AddCourse';
import FeesForm from './Admindashboard/Fees/FeesForm';
import Transaction from './Admindashboard/Transactions/Transaction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseEdit from './Admindashboard/Courses/CourseEdit';
import PageNotFound from './Components/PageNotFound';
import Slidebar from './Admindashboard/Slidebar';
import Home from './Components/Home';
import Logout from './Components/Logout';
import PrivateRoutes from './utils/PrivateRoutes';

firebase.initializeApp(firebaseConfig);

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<ToastContainer />

			<BrowserRouter>
				{/* <Navbar /> */}

				<Routes>
					<>
						<Route element={<Layout />}>
							<Route element={<PrivateRoutes />}>
								<Route path="/logout" element={<Logout />} />

								<Route path="/admin" element={<Admin />} />

								<Route path="/Register" element={<Signup />} />

								<Route path="/studentadd" element={<Studentadd />} />
								<Route path="/studentEdit/:id" element={<StudentEdit />} />
								<Route path="/studentList" element={<StudentAccount />} />
								<Route path="/studentsinfo" element={<StudentList />} />
								<Route path="/courselist" element={<CourseList />} />
								<Route path="/addcourse" element={<AddCourse />} />
								<Route path="/CourseEdit/:id" element={<CourseEdit />} />
								<Route path="/feesforms" element={<FeesForm />} />
								<Route path="/transaction" element={<Transaction />} />
							</Route>
						</Route>
					</>

					<Route path="/login" element={<Login />} />

					<Route path="/" element={<Home />} />

					<Route path="/:pageName" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
