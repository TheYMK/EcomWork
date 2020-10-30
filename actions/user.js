import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

// freelancer public profile action
export const getFreelancerPublicProfile = (username, token) => {
	return fetch(`${API}/user/freelancer/profile/${username}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const getProfile = (token) => {
	return fetch(`${API}/user/profile`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const update = (token, user) => {
	return fetch(`${API}/user/freelancer/profile/update`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
			Authorization: `Bearer ${token}`
		},
		body: user
	})
		.then((response) => {
			handleResponse(response);
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const deleteProfile = (token) => {
	return fetch(`${API}/user/freelancer/profile/delete`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json', got rid of this because we're sending files (form-data)
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};
