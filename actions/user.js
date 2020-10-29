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
