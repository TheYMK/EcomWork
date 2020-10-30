import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import Head from 'next/head';
import Client from '../../../components/auth/Client';

const ClientProfile = () => {
	// const head = () => (
	// 	<Head>
	// 		<title>
	// 			{user.username}'s Profile | {APP_NAME}{' '}
	// 		</title>
	// 		<meta name="description" content={`Client profile of ${user.username}`} />
	// 		<link rel="canonical" href={`${DOMAIN}/client/profile/${params.username}`} />

	// 		<meta property="og:title" content={`${user.username}'s Profile | ${APP_NAME}`} />
	// 		<meta property="og:description" content={`Client profile of ${user.username}`} />

	// 		<meta property="og:type" content="website" />
	// 		<meta property="og:url" content={`${DOMAIN}/client/profile/${params.username}`} />
	// 		<meta property="og:site_name" content={`${APP_NAME}`} />

	// 		<meta property="og:image" content={`${DOMAIN}/static/images/ecomwork.jpg`} />
	// 		<meta property="og:image:secure_url" content={`${DOMAIN}/static/images/ecomwork.jpg`} />
	// 		<meta property="og:image:type" content="image/jpg" />
	// 		<meta property="og:fb:app_id" content={`${FB_APP_ID}`} />
	// 	</Head>
	// );

	return (
		<React.Fragment>
			<Layout>
				{/* {head()} */}
				{/*  */}
				<h2>Client Profile</h2>
			</Layout>
		</React.Fragment>
	);
};

export default ClientProfile;
