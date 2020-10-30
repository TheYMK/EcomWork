import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

// add skill action
export const addSkill = (token, name) => {
	return fetch(`${API}/skill/add`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(name)
	})
		.then((response) => {
			handleResponse(response);
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const getSkills = (token) => {
	return fetch(`${API}/skills`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			// 'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const removeSkill = (name, token) => {
	return fetch(`${API}/skill/remove`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(name)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};
