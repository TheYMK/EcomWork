import React from 'react';

function FreelancerProfile() {
	return (
		<div>
			<h3>Freelancer profile</h3>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	// get freelancer profile here
}

export default FreelancerProfile;
