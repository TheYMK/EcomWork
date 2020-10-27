import React, { useState } from 'react';
import Layout from '../Layout';
import Link from 'next/link';
import { isAuth } from '../../actions/auth';

function FreelancerDashboard() {
	return (
		<React.Fragment>
			<div className="container-fluid mt-4">
				<div className="row">
					<div className="col-md-3">
						<ul className="list-group">
							<li className="list-group-item">
								<Link href={`/freelancer/profile/${isAuth().username}`}>
									<a>Profile</a>
								</Link>
							</li>
							<li className="list-group-item">
								<Link href="/">
									<a className="">Jobs</a>
								</Link>
							</li>
							<li className="list-group-item">
								<Link href="/">
									<a className="">Notifications</a>
								</Link>
							</li>
							<li className="list-group-item">
								<Link href="/">
									<a className="">Messages</a>
								</Link>
							</li>
							<li className="list-group-item">
								<Link href="/">
									<a className="">Earnings</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-8">
						<h2>Freelancer Dashboard</h2>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default FreelancerDashboard;
