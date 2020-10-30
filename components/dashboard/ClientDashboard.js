import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

function ClientDashboard() {
	const [ loggedInUser, setLoggedInUser ] = useState('');

	useEffect(() => {
		if (isAuth()) {
			setLoggedInUser(isAuth().username);
		} else {
			setLoggedInUser('');
			Router.push('/');
		}
	}, []);

	return (
		<React.Fragment>
			<div className="container-fluid mt-4">
				<div className="row">
					<div className="col-md-3">
						<ul className="list-group">
							<li className="list-group-item">
								<Link href={`/client/profile/${loggedInUser}`}>
									<a>Profile</a>
								</Link>
							</li>
							<li className="list-group-item">
								<Link href="/">
									<a className="">Jobs</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-8">
						<h2>Client Dashboard</h2>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default ClientDashboard;
