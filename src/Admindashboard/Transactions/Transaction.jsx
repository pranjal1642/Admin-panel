import React, { createRef, useEffect, useState } from 'react';
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
import { VscFilePdf } from 'react-icons/vsc';
import '../../Styling/studentlist.css';
import DataTable from 'react-data-table-component';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import moment from 'moment';
import PdfFile from '../Invoice/PdfFile';
import { jsPDF } from 'jspdf';
import { renderToString } from 'react-dom/server';
import logo from '../../Assets/logo.png';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import 'rsuite/dist/rsuite.min.css';

import { DateRangePicker } from 'rsuite';
import { CSVDownload, CSVLink } from 'react-csv';
function numberWithCommas(x) {
	debugger;
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Transaction = () => {
	const [dataShow, setData] = useState([]);
	const [FData, setFData] = useState([]);
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
				deleteDoc(doc(db, 'transactions', id));
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
			const param = searchparam.get('transactions');
			let querys = null;
			if (param) {
				querys = query(
					collection(db, 'transactions'),
					where('Course', '==', param),
				);
			} else {
				setLoading(true);
				querys = collection(db, 'transactions');
			}
			const querySnapshot = await getDocs(querys);
			const list = [];
			querySnapshot.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
				setLoading(false);
			});
			setFData(list);
			setData(list);
		};

		Search();
	}, [searchparam]);

	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'transactions');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setStandards(list);
		})();
	}, []);

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
	const handleUserPdf = (row) => {
		const pdf = new jsPDF('p', 'px', 'a4');
		const html = renderToString(<PdfFile row={row} />);
		pdf.html(html, {
			callback: function (pdf) {
				pdf.addImage(logo, 'png', 20, 40, 60, 40);
				pdf.save(`${row.Name}.pdf`);
			},
			html2canvas: { scale: 0.6 },
			x: 10,
			y: 2,
			width: 200,
			windowWidth: 700,
		});
	};
	const columns = [
		{
			name: 'Name',
			selector: (row) => row.Name,

			sortable: true,
		},
		{
			name: 'Class',
			selector: (row) => row.CourseName,
			sortable: true,
		},
		{
			name: 'Amount',
			selector: (row) => numberWithCommas(`₹ ${row.amount}`),
			sortable: true,
		},
		// {
		// 	name: 'Month',
		// 	selector: (row) => row.month,
		// 	sortable: true,
		// },
		{
			name: 'Type',
			selector: (row) => row.type,
			sortable: true,
		},
		{
			name: 'Date',
			selector: (row) => (
				<span>{moment(row.timeStamp.seconds * 1000).format('DD-MMM-YY')}</span>
			),
		},

		{
			name: 'Action',
			button: true,
			selector: 'id',
			cell: (row) => (
				<div>
					<button onClick={() => handleUserPdf(row)}>
						{<VscFilePdf className="fa-2x" />}
					</button>

					{/* <button onClick={() => deletedata(row.id)}>{<MdDelete />}</button> */}
				</div>
			),
		},
	];
	// const [standard, setstandard] = useState('');
	const selectionRange = {
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	};

	const handleDaterange = (startDate) => {
		debugger;
		if (!startDate) {
			console.log(FData);
			return setData(FData);
		}
		let values = dataShow.filter((val) => {
			debugger;

			let date = new Date(val.timeStamp.seconds * 1000)
				.toISOString()
				.split('T')[0];

			let start = new Date(startDate[0]).toISOString().split('T');
			let end = new Date(startDate[1]).toISOString().split('T');
			return (
				new Date(date).getTime() >= new Date(start[0]).getTime() &&
				new Date(date) <= new Date(end[0]).getTime()
			);
		});
		setData(values);
	};
	const header = [
		{ label: 'Name', key: 'Name' },
		{ label: 'Class', key: 'CourseName' },
		{ label: 'Amount', key: 'amount' },
		{ label: 'Type', key: 'type' },
		{ label: 'Month', key: 'month' },
	];

	return (
		<>
			<div className="container">
				<h3 className="page-title mt-3">Transactions </h3>
				<ul className="breadcrumb">
					<li className="breadcrumb-item">Dashboard</li>
					<li className="breadcrumb-item active">Transactions</li>
				</ul>

				<div className=" d-flex">
					<div className="m-2 p-1">
						<DateRangePicker
							style={{ width: 300 }}
							placeholder="Select Date Range"
							onChange={(e) => handleDaterange(e)}
						/>
					</div>
					<div class="input-group mt-2">
						<div class="form-outline">
							<input
								type="search"
								class="form-control"
								placeholder="Search..."
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
						</div>
					</div>
					<div>
						<CSVLink
							data={dataShow}
							headers={header}
							filename={'Students List'}
							target={'_blank'}
							type="button"
							className="btn btn-success "
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
					/>
					{loadingMessage()}
				</div>
			</div>
		</>
	);
};

export default Transaction;
