import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getFreelancerPublicProfile } from '../../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import Cookies from 'cookies';
import ContactForm from '../../../components/form/ContactForm';
import moment from 'moment';

function FreelancerProfile({ user, jobs, params }) {
	const head = () => (
		<Head>
			<title>
				{user.username}'s Profile | {APP_NAME}{' '}
			</title>
			<meta name="description" content={`Freelancer profile of ${user.username}`} />
			<link rel="canonical" href={`${DOMAIN}/freelancer/profile/${params.username}`} />

			<meta property="og:title" content={`${user.username}'s Profile | ${APP_NAME}`} />
			<meta property="og:description" content={`Freelancer profile of ${user.username}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={`${DOMAIN}/freelancer/profile/${params.username}`} />
			<meta property="og:site_name" content={`${APP_NAME}`} />

			<meta property="og:image" content={`${DOMAIN}/static/images/ecomwork.jpg`} />
			<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/ecomwork.jpg`} />
			<meta property="og:image:type" content="image/jpg" />
			<meta property="og:fb:app_id" content={`${FB_APP_ID}`} />
		</Head>
	);

	const showIncompleteProfileMessage = () => {
		if (user.experiences.length === 0 || user.skills.length === 0 || user.education.length === 0) {
			return (
				<p className="alert alert-warning">
					Your profile is missing important information, please complete your profile! <br />
				</p>
			);
		}
	};

	return (
		<React.Fragment>
			<Layout>
				{head()}
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-md-4">
											<img
												src={`${DOMAIN}/static/images/ecomwork.jpg`}
												className="img img-fluid img-thumbnail mb-3"
												style={{ maxHeight: '200px', maxWidth: '100%' }}
												alt="user profile"
											/>
										</div>
										<div className="col-md-8">
											{showIncompleteProfileMessage()}
											<h5>{user.name}</h5>
											<p className="text-muted">
												Account created {moment(user.createdAt).fromNow()}
											</p>

											<div>
												<a
													className="btn btn-outline-success"
													href="/freelancer/profile/update"
												>
													Update profile
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<br />
				<div className="container pb-5">
					<div className="row">
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
										Jobs Overview
									</h5>
									<p>Show list of jobs here</p>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
										Contact {user.name}
									</h5>

									<ContactForm userEmail={user.email} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	);
}

export async function getServerSideProps({ req, res, params }) {
	const cookies = new Cookies(req, res);

	const token = cookies.get('token');

	return getFreelancerPublicProfile(params.username, token).then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			return {
				props: {
					user: data.user,
					jobs: data.jobs,
					params
				}
			};
		}
	});
}

export default FreelancerProfile;
