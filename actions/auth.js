import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';
import Router from 'next/router';

// handle token expiry - we get status code 401 if token expires and user is unauthorized
// to be use everywhere we need to check if user's token is still valid
export const handleResponse = (response) => {
	if (response.status === 401) {
		signout(() => {
			// we can also pass an object here
			Router.push({
				pathname: '/signin',
				query: {
					message: 'Your session has expired. Please signin'
				}
			});
		});
	}
};

// preSignup action
export const preSignup = (user) => {
	return fetch(`${API}/auth/pre-signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`===>${err}`));
};

// Signup action
export const signup = (user) => {
	return fetch(`${API}/auth/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

// Signin action

export const signin = (user) => {
	return fetch(`${API}/auth/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const signout = (next) => {
	removeCookie('token');
	removeLocalStorage('user');
	next();

	return fetch(`${API}/auth/signout`, {
		method: 'GET'
	})
		.then((response) => {
			console.log('====> signout success');
		})
		.catch((err) => console.log(`====> ${err}`));
};

// set cookie
export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1
		});
	}
};

// remove cookie
export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key, {
			expires: 1
		});
	}
};

// get cookie
export const getCookie = (key) => {
	if (process.browser) {
		return cookie.get(key);
	}
};
// set localstorage
export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

// remove localstorage
export const removeLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};

// authenticate user by passing data to cookie and localstorage
export const authenticate = (data, next) => {
	setCookie('token', data.token);
	setLocalStorage('user', data.user);
	next();
};

// get authenticated user information from localstorage
export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = getCookie('token');
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
};

export const forgotPassword = (email) => {
	return fetch(`${API}/auth/forgot-password`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(email)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};

export const resetPassword = (resetInfo) => {
	return fetch(`${API}/auth/reset-password`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(resetInfo)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(`====> ${err}`));
};
