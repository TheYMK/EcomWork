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
import Router from 'next/router';

// For nprogress
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

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
						<React.Fragment>
							<NavItem>
								<Link href="/signin">
									<NavLink style={{ cursor: 'pointer' }}>Sign in</NavLink>
								</Link>
							</NavItem>
							<NavItem>
								<Link href="/signup">
									<NavLink style={{ cursor: 'pointer' }}>Sign up</NavLink>
								</Link>
							</NavItem>
						</React.Fragment>
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default Header;
