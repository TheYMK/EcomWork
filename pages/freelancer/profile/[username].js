import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { isAuth, getCookie, signout } from '../../../actions/auth';
import { getFreelancerPublicProfile, deleteProfile } from '../../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config';
import Cookies from 'cookies';
import ContactForm from '../../../components/form/ContactForm';
import moment from 'moment';
import Router from 'next/router';

function FreelancerProfile({ user, jobs, params }) {
	let currentlyLoggedInUser;

	const [ values, setValues ] = useState({
		error: '',
		success: '',
		loading: ''
	});

	const token = getCookie('token');
	const { error, success, loading } = values;

	if (isAuth()) {
		currentlyLoggedInUser = isAuth().username;
	}

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

	const hanldeDeleteProfile = () => {
		setValues({ ...values, error: false, success: false, loading: true });

		let answer = window.confirm('Are you sure you want to delete your account?');

		if (answer) {
			deleteProfile(token).then((data) => {
				if (data.error) {
					setValues({ ...values, error: true, success: false, loading: false });
				} else {
					setValues({ ...values, error: false, success: true, loading: false });
					signout(() => {
						Router.push('/signin');
					});
				}
			});
		}
	};

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
			Profile Deleted
		</div>
	);

	const showLoading = () => (
		<div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
			Loading...
		</div>
	);

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
												src={`${API}/user/photo/${user.username}`}
												className="img img-fluid img-thumbnail mb-3"
												style={{ maxHeight: '200px', maxWidth: '100%' }}
												alt="user profile"
											/>
										</div>
										<div className="col-md-8">
											{user.username === currentlyLoggedInUser ? (
												showIncompleteProfileMessage()
											) : (
												''
											)}
											{showError()}
											{showSuccess()}
											{showLoading()}
											<h5>{user.name}</h5>
											<p className="text-muted">
												Member since {moment(user.createdAt).fromNow()}
											</p>

											{user.username === currentlyLoggedInUser ? (
												<div>
													<a
														className="btn btn-outline-success"
														href="/freelancer/profile/update"
													>
														Update profile
													</a>
													<button
														className="btn btn-outline-danger ml-3"
														onClick={hanldeDeleteProfile}
													>
														Delete profile
													</button>
												</div>
											) : (
												''
											)}
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
