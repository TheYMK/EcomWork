import React, { useState, useEffect } from 'react';
import { signup, isAuth } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

const SignupComponent = () => {
	const [ values, setValues ] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
		selectOption: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	});

	let { name, email, password, selectOption, role, confirmPassword, error, loading, message, showForm } = values;

	useEffect(() => {
		// if there is a logged in user redirect to home page
		isAuth() && Router.push('/');
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setValues({ ...values, error: 'Passwords do not match' });
		} else {
			setValues({ ...values, loading: true, error: false });

			role = selectOption === 'freelancer' ? 3 : 2;
			if (selectOption === 'freelancer') {
				role = 3;
			} else if (selectOption === 'client') {
				role = 2;
			} else {
				role = undefined;
			}

			const user = { name, email, password, role };

			// we pass it to signup action
			signup(user).then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					setValues({
						...values,
						name: '',
						email: '',
						password: '',
						confirmPassword: '',
						role: '',
						selectOption: '',
						error: '',
						loading: false,
						message: data.message,
						showForm: false
					});
				}
			});
		}
	};

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						value={name}
						className="form-control mt-3"
						type="text"
						placeholder="Enter your name..."
						onChange={handleChange('name')}
						required
					/>
					<input
						value={email}
						className="form-control mt-3"
						type="email"
						placeholder="Enter your email..."
						onChange={handleChange('email')}
					/>
					<input
						value={password}
						className="form-control mt-3"
						type="password"
						placeholder="Enter your password..."
						onChange={handleChange('password')}
					/>
					<input
						value={confirmPassword}
						className="form-control mt-3"
						type="password"
						placeholder="Retype your password..."
						onChange={handleChange('confirmPassword')}
					/>
					<div className="mt-3">
						<label htmlFor="role-select">Are you a client or a freelancer?</label>
						<br />
						<select id="role-select" onChange={handleChange('selectOption')}>
							<option value="">--Please choose an option--</option>
							<option value="client">Client</option>
							<option value="freelancer">Freelancer</option>
						</select>
					</div>
				</div>
				<div>
					<button className="btn btn-primary">Sign up</button>
				</div>
			</form>
		);
	};

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');

	const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

	return (
		<React.Fragment>
			{showError()}
			{showLoading()}
			{showMessage()}
			{showForm && signupForm()}
		</React.Fragment>
	);
};

export default SignupComponent;
