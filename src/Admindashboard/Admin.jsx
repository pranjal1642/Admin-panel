import Chart from './Dashboard/Chart';
import Featured from './Dashboard/Featured';
import Widget from './Dashboard/Widget';
import '../Styling/admin.scss';

const Admin = () => {
	return (
		<div className="home">
			<div className="homeContainer">
				<div className="widgets">
					<Widget type="user" />
					<Widget type="order" />
					<Widget type="earning" />
					<Widget type="balance" />
				</div>
				<div className="charts">
					<Featured />
					<Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
				</div>
			</div>
		</div>
	);
};

export default Admin;
