import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import moment from 'moment';
import { Col } from 'rsuite';

const useStyles = makeStyles(() => ({
	pdfView: {
		width: '70%',
	},
	InvoiceHead: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		color: 'black',
		fontWeight: 'bold',
		fontSize: '20px',
	},
	InvoiceTo: {
		color: 'black',
	},
}));

const PdfFile = ({ row }) => {
	const classes = useStyles();

	return (
		<>
			<CardHeader title="INVOICE" className={classes.InvoiceHead}></CardHeader>

			<div
				style={{
					contain: 'object-fit',
					padding: '10px',
					marginTop: '50px',
				}}
			>
				<Card>
					<CardContent>
						<Typography variant="h5" className={classes.InvoiceTo}>
							User Details
						</Typography>

						<Col className="col-lg-6 ">
							<ListItemText>Student Name:- {row?.Name} </ListItemText>
							<ListItemText> Class:- {row?.CourseName} </ListItemText>
							<ListItemText> Month:- {row?.month} </ListItemText>
							<ListItemText>Transaction-id-{row.id}</ListItemText>
						</Col>

						<Col className="col-lg-6 text-end align-item-center ">
							<ListItemText> Fee Type:- {row?.type} </ListItemText>
							<ListItemText>Amount:- {row?.amount} </ListItemText>
							<ListItemText>
								Date:-
								{moment(row.timeStamp.seconds * 1000).format('DD - MMM - YY')}
							</ListItemText>
						</Col>
					</CardContent>
				</Card>
				<Divider />
				<Card>
					<CardContent>
						<Typography variant="h5" className={classes.InvoiceTo}>
							Transaction History
						</Typography>
						<table className="table">
							<thead>
								<tr>
									<th>Type</th>
									<th>Price</th>
									<th>Amount (INR)</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{row.type}</td>
									<td>Rs{row.amount}</td>
									<td>Rs{row.amount}</td>
									<td className="text-success font-weight-5px"> {'Paid'}</td>
								</tr>
							</tbody>
						</table>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default PdfFile;
