import Chart from './Dashboard/Chart';
import Featured from './Dashboard/Featured';
import Widget from './Dashboard/Widget';
import '../Styling/admin.scss';

const Admin = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12 col-sm-6">
					<div className="home1">
						<div className="homeContainer">
							<div className="widgets">
								<Widget type="user" />
								<Widget type="order" />
								<Widget type="earning" />
								<Widget type="TotalPayment" />
							</div>
							<div className="charts">
								<Featured />
								<Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
