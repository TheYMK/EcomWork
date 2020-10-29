import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const emailContactForm = (data) => {
	let emailEndpoint;

	if (data.userEmail) {
		emailEndpoint = `${API}/form/contact-user`;
	} else {
		// delete this comment after we've set this api route in the backend
		emailEndpoint = `${API}/contact`;
	}

	return fetch(`${emailEndpoint}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
			// Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`===> ${err}`));
};
