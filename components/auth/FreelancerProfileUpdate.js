import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { addSkill, getSkills, removeSkill } from '../../actions/skill';
import { API } from '../../config';

const FreelancerProfileUpdate = () => {
	const [ values, setValues ] = useState({
		username: '',
		username_for_photo: '',
		name: '',
		email: '',
		bio: '',
		skills: [],
		experiences: [],
		education: [],
		password: '',
		error: false,
		success: false,
		loading: false,
		removed: false,
		reload: false,
		skillName: '',
		photo: '',
		userData: process.browser && new FormData()
	});

	const token = getCookie('token');

	const {
		username,
		username_for_photo,
		name,
		email,
		bio,
		skills,
		experiences,
		education,
		password,
		error,
		success,
		loading,
		photo,
		userData,
		removed,
		reload,
		skillName
	} = values;

	const init = () => {
		getProfile(token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					username: data.username,
					username_for_photo: data.username,
					name: data.name,
					email: data.email,
					bio: data.bio,
					skills: data.skills,
					experiences: data.experiences,
					education: data.education
				});
			}
		});
	};

	useEffect(() => {
		init();

		setValues({ ...values, userData: new FormData() });
	}, []);

	useEffect(
		() => {
			loadSkills();
		},
		[ reload ]
	);

	const loadSkills = () => {
		getSkills(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({
					...values,
					skills: data.skills,
					username: data.username,
					username_for_photo: data.username,
					name: data.name,
					email: data.email,
					bio: data.bio,
					experiences: data.experiences,
					education: data.education
				});
			}
		});
	};

	const showSkills = () => {
		return skills.map((skill, index) => {
			return (
				<button
					onDoubleClick={() => deleteSkillConfirm(skill)}
					title="Double click to delete"
					key={index}
					className="btn btn-outline-primary mr-1 ml-1 mt-3"
				>
					{skill}
				</button>
			);
		});
	};

	const deleteSkillConfirm = (name) => {
		let answer = window.confirm('Are you sure you want to delete this skill?');

		if (answer) {
			deleteSkill(name);
		}
	};

	const deleteSkill = (name) => {
		removeSkill({ name }, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setValues({ ...values, error: false, success: false, skillName: '', removed: true, reload: !reload });
			}
		});
	};

	const handleChange = (name) => (e) => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;

		userData.set(name, value);
		setValues({ ...values, [name]: value, userData, error: false, success: false });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setValues({ ...values, loading: true });
		update(token, userData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						username: data.username,
						name: data.name,
						email: data.email,
						bio: data.bio,
						password: '',
						success: true,
						loading: false
					});
				});
			}
		});
	};

	const profileUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="btn btn-outline-info">
					Update profile photo
					<input type="file" accept="image/*" hidden onChange={handleChange('photo')} />
				</label>
			</div>
			<div className="form-group">
				<label className="text-muted">Username</label>
				<input type="text" value={username} className="form-control" onChange={handleChange('username')} />
			</div>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input type="text" value={name} className="form-control" onChange={handleChange('name')} />
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input type="email" value={email} className="form-control" onChange={handleChange('email')} />
			</div>
			<div className="form-group">
				<label className="text-muted">Bio</label>
				<textarea type="text" value={bio} className="form-control" onChange={handleChange('bio')} />
			</div>
			<div className="form-group">
				<label className="text-muted">Password</label>
				<input type="password" value={password} className="form-control" onChange={handleChange('password')} />
			</div>
			<div>
				{showSuccess()}
				{showError()}
				{showLoading()}
			</div>
			<div>
				<button type="submit" className="btn btn-primary" disabled={!username || !name || !email || !bio}>
					Update profile
				</button>
			</div>
		</form>
	);

	const handleSkillChange = (e) => {
		setValues({ ...values, skillName: e.target.value, error: false, success: false, removed: '' });
	};

	const handleSubmitSkills = (e) => {
		e.preventDefault();
		addSkill(token, { name: skillName }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({ ...values, error: false, success: true, skillName: '', removed: false, reload: !reload });
			}
		});
	};

	const skillsForm = () => (
		<form className="mb-2" onSubmit={handleSubmitSkills}>
			<div className="form-group">
				<label className="text-muted">Skills</label>
				<input type="text" className="form-control" required onChange={handleSkillChange} value={skillName} />
			</div>
			<div className="mt-2">
				<button type="submit" className="btn btn-primary">
					Add
				</button>
			</div>
		</form>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
			Profile updated
		</div>
	);

	const showLoading = () => (
		<div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
			Loading...
		</div>
	);

	return (
		<React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-4 mb-5">
						<img
							src={`${API}/user/photo/${username_for_photo}`}
							className="img img-fluid img-thumbnail mb-3"
							style={{ maxHeight: '300px', maxWidth: '100%' }}
							alt="user profile"
						/>
					</div>
					<div className="col-md-4 mb-5">{profileUpdateForm()}</div>
					<div className="col-md-4 mb-5">
						{skillsForm()} {showSkills()}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default FreelancerProfileUpdate;
