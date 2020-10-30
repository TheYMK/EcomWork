import React, { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

const Client = ({ children }) => {
	useEffect(() => {
		if (!isAuth()) {
			Router.push('/signin');
		} else if (isAuth().role !== 2) {
			Router.push('/');
		}
	}, []);

	return <React.Fragment>{children}</React.Fragment>;
};

export default Client;
