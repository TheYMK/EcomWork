import Header from './Header';
import React from 'react';

function Layout({ children }) {
	return (
		<React.Fragment>
			<Header />
			{children}
		</React.Fragment>
	);
}

export default Layout;
