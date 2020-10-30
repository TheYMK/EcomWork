import Layout from '../../../components/Layout';
import Freelancer from '../../../components/auth/Freelancer';
import Link from 'next/link';
import FreelancerProfileUpdate from '../../../components/auth/FreelancerProfileUpdate';

const FreelancerUpdate = () => {
	return (
		<Layout>
			<Freelancer>
				<div className="container mt-4">
					<div className="row">
						<FreelancerProfileUpdate />
					</div>
				</div>
			</Freelancer>
		</Layout>
	);
};

export default FreelancerUpdate;
