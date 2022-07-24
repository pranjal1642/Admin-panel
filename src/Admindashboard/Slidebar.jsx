//import useState hook to create menu collapse state
import React, { useState } from 'react';

//import react pro sidebar components
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
	SubMenu,
} from 'react-pro-sidebar';

//import icons from react icons
import { HiUserGroup } from 'react-icons/hi';
import {
	FiHome,
	FiLogOut,
	FiArrowLeftCircle,
	FiArrowRightCircle,
} from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';

//import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import '../Styling/sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';

import { GrScorecard } from 'react-icons/gr';
import { BiUserPlus } from 'react-icons/bi';
import Logout from '../Components/Logout';

const Slidebar = () => {
	//create initial menuCollapse state using useState hook
	const [menuCollapse, setMenuCollapse] = useState(false);

	//create a custom function that will change menucollapse state from false to true and true to false
	const menuIconClick = () => {
		//condition checking to change state from true to false and vice versa
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};

	return (
		<>
			<div id="header">
				{/* collapsed props to change menu size using menucollapse state */}
				<ProSidebar collapsed={menuCollapse}>
					<SidebarHeader>
						<div className="logotext mt-3">
							{/* small and big change using menucollapse state */}
							<p>{menuCollapse ? 'Admin' : 'Admin Panel'}</p>
						</div>
						<div className="closemenu" onClick={menuIconClick}>
							{/* changing menu collapse icon on click */}
							{/* {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />} */}
						</div>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="square">
							<MenuItem icon={<FiHome />}>
								<NavLink
									to={`/admin`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'true',
									})}
								>
									Dashboard
								</NavLink>
							</MenuItem>
							<MenuItem icon={<BiUserPlus />}>
								<NavLink
									to={`/Register`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'blue',
									})}
								>
									Register User
								</NavLink>
							</MenuItem>

							<MenuItem className="bg" icon={<HiUserGroup />}>
								<NavLink
									to={`/studentsinfo`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'true',
									})}
								>
									Students
								</NavLink>
							</MenuItem>
							<MenuItem icon={<RiPencilLine />}>
								<NavLink
									to={`/courselist`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'blue',
									})}
								>
									Classes
								</NavLink>
							</MenuItem>
							<MenuItem icon={<GrScorecard />}>
								<NavLink
									to={`/feesforms`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'blue',
									})}
								>
									Fees
								</NavLink>
							</MenuItem>
							<MenuItem icon={<GrScorecard />}>
								<NavLink
									to={`/transaction`}
									style={(isActive) => ({
										color: isActive ? 'black' : 'blue',
									})}
								>
									Transactions
								</NavLink>
							</MenuItem>
						</Menu>
					</SidebarContent>
					<SidebarFooter>
						<Menu iconShape="square">
							<MenuItem icon={<FiLogOut />}>
								<Logout className="bg-none" />
							</MenuItem>
						</Menu>
					</SidebarFooter>
				</ProSidebar>
			</div>
		</>
	);
};

export default Slidebar;
