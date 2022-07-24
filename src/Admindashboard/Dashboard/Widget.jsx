import '../../Styling/widget.scss';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutline';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const Widget = ({ type }) => {
	let data;

	//temporary
	const amount = 100;
	const diff = 20;

	switch (type) {
		case 'user':
			data = {
				title: 'USERS',
				isMoney: false,
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
				title: 'Students',
				isMoney: false,
				link: 'View Students',
				icon: (
					<ShoppingCartOutlinedIcon
						className="icon"
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
				title: 'Fees',
				isMoney: true,
				link: 'View Students Fees',
				icon: (
					<MonetizationOnOutlinedIcon
						className="icon"
						style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
					/>
				),
			};
			break;
		case 'balance':
			data = {
				title: 'Transaction',
				isMoney: true,
				link: 'See Transaction details',
				icon: (
					<AccountBalanceWalletOutlinedIcon
						className="icon"
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
				<span className="title">{data.title}</span>
				<span className="counter">
					{data.isMoney && '$'} {amount}
				</span>
				<span className="link">{data.link}</span>
			</div>
			<div className="right">
				<div className="percentage positive">
					<KeyboardArrowUpIcon />
					{diff} %
				</div>
				{data.icon}
			</div>
		</div>
	);
};

export default Widget;
