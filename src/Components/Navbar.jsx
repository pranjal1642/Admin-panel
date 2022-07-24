import React from 'react';
import { Dropdown, Container } from 'react-bootstrap';
import '../Styling/Navbar.css';

const Navbar = () => {
	return (
		<>
			<div className=" ">
				<div className="topbarWrapper">
					<div className="topLeft">
						<a href="" to="index.html" class="logo">
							<img
								src="https://preschool.dreamguystech.com/react/f5d66ee9d0af30a8b083d16966421565.png"
								alt="Logo"
							/>
						</a>
					</div>
					<div className="topRight">
						<div className="topbarIconContainer">
							{/* <span>{FaBell}</span> */}
						</div>
						<div className="topbarIconContainer">
							<span className="notify">
								<i className="fa fa-bell" aria-hidden="true"></i>
							</span>
						</div>
						<div className="topbarIconContainer">{/* <Settings /> */}</div>

						<Dropdown>
							<Dropdown.Toggle variant="transparent" id="dropdown-basic">
								<img
									src="https://cdn1.vectorstock.com/i/thumb-large/82/55/anonymous-user-circle-icon-vector-18958255.jpg"
									alt=""
									className="topAvatar"
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
