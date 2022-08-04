import '../../Styling/widget.scss';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { useEffect, useState } from 'react';
import moment from 'moment';
import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
	() => ({
		icon: {
			borderRadius: '30px',
			padding: '5px',
		},
	}),
	[],
);

const Widget = ({ type }) => {
	const [transactions, setTransactions] = useState([]);
	const today = moment().format('YYYY-MMM-DD');
	const fullMonth = moment().subtract(30, 'd').format('YYYY-MMM-DD');
	const sevendays = moment().subtract(7, 'd').format('YYYY-MM-DD');
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	let data;
	const classes = useStyles();

	useEffect(() => {
		(async () => {
			const querySnapshot = collection(db, 'transactions');
			const Sort = query(querySnapshot, orderBy('timeStamp', 'asc'));
			const querySnap2 = await getDocs(Sort);

			const list = [];
			querySnap2.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			setTransactions(list);
		})();
	}, []);

	var getsevendays;
	const Days = transactions.filter((item) => {
		return (
			(getsevendays = moment(item.timeStamp.seconds * 1000).format(
				'YYYY-MMM-DD',
			)),
			getsevendays >= sevendays && getsevendays <= today
		);
	});

	const SevenDaysAmount = Days.map((item) => item.amount).reduce(
		(prev, curr) => Number(prev) + Number(curr),
		0,
	);

	var daysOfMonth;
	const LastThirtyDays = transactions.filter((item) => {
		return (
			(daysOfMonth = moment(item.timeStamp.seconds * 1000).format(
				'YYYY-MMM-DD',
			)),
			daysOfMonth >= fullMonth && daysOfMonth >= today
		);
	});
	const Thirty_Days_Amount = LastThirtyDays.map((item) => item.amount).reduce(
		(sum, item) => Number(sum) + Number(item),
		0,
	);
	const CurrentAmount = transactions.filter((item) => {
		return (
			moment(item.timeStamp?.seconds * 1000).format('YYYY-MMM-DD') === today
		);
	});

	const TodayAmount = CurrentAmount.map((item) => item.amount).reduce(
		(prev, curr) => Number(prev) + Number(curr),
		0,
	);

	switch (type) {
		case 'user':
			data = {
				Amount: numberWithCommas(TodayAmount),

				title: 'Today payement',
				isMoney: true,
				link: 'See all users',
				icon: (
					<PersonOutlinedIcon
						className="icon"
						style={{
							color: 'crimson',
							backgroundColor: 'rgba(255, 0, 0, 0.2)',
						}}
					/>
				),
			};
			break;
		case 'order':
			data = {
				Amount: numberWithCommas(SevenDaysAmount),

				title: 'Lastweek Payments',
				isMoney: true,
				link: 'View Students',
				icon: (
					<ShoppingCartOutlinedIcon
						className={classes.icon}
						style={{
							backgroundColor: 'rgba(218, 165, 32, 0.2)',
							color: 'goldenrod',
						}}
					/>
				),
			};
			break;
		case 'earning':
			data = {
				Amount: numberWithCommas(Thirty_Days_Amount),
				title: 'Total Fees Paid',
				isMoney: true,
				link: 'View Students Fees',
				icon: (
					<MonetizationOnOutlinedIcon
						className={classes.icon}
						style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
					/>
				),
			};
			break;
		case 'TotalPayment':
			data = {
				Amount: numberWithCommas(Thirty_Days_Amount),
				title: 'Total Payments',
				isMoney: true,
				link: 'See Transaction details',
				icon: (
					<AccountBalanceWalletOutlinedIcon
						className={classes.icon}
						style={{
							backgroundColor: 'rgba(128, 0, 128, 0.2)',
							color: 'purple',
						}}
					/>
				),
			};
			break;
		default:
			break;
	}

	return (
		<div className="widget">
			<div className="left">
				<span className="title">{data?.title}</span>
				<span className="counter">
					{data?.isMoney && '₹'}
					{data?.Amount}
				</span>
				<span className="link">{data?.link}</span>
			</div>
			<div className="right">
				<div className="percentage positive">
					<KeyboardArrowUpIcon />
				</div>
				{data?.icon}
			</div>
		</div>
	);
};

export default Widget;
