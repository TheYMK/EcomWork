import React, { useState } from 'react';
import Link from 'next/link';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';

import '../node_modules/nprogress/nprogress.css';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';

// For nprogress
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	let dashboardLink = '';

	if (isAuth() && isAuth().role === 1) {
		dashboardLink = '/admin';
	} else if (isAuth() && isAuth().role === 2) {
		dashboardLink = '/client';
	} else if (isAuth() && isAuth().role === 3) {
		dashboardLink = '/freelancer';
	}

	return (
		<React.Fragment>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className="font-weight-bold" style={{ cursor: 'pointer' }}>
						{APP_NAME}
					</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{!isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href="/signin">
										<NavLink>Signin</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<Link href="/signup">
										<NavLink>Signup</NavLink>
									</Link>
								</NavItem>
							</React.Fragment>
						)}

						{isAuth() && (
							<React.Fragment>
								<NavItem>
									<Link href={dashboardLink}>
										<NavLink style={{ cursor: 'pointer' }}>{isAuth().name}'s Dashboard</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<NavLink
										style={{ cursor: 'pointer' }}
										onClick={() => signout(() => Router.replace('/signin'))}
									>
										Sign out
									</NavLink>
								</NavItem>
							</React.Fragment>
						)}

						{/* {isAuth() &&
						isAuth().role === 1 && (
							<React.Fragment>
								<NavItem>
									<Link href="/admin">
										<NavLink style={{ cursor: 'pointer' }}>Admin's Dashboard</NavLink>
									</Link>
								</NavItem>
								<NavItem>
									<NavLink
										style={{ cursor: 'pointer' }}
										onClick={() => signout(() => Router.replace('/signin'))}
									>
										Sign out
									</NavLink>
								</NavItem>
							</React.Fragment>
						)} */}
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default Header;
