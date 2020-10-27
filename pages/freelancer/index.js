import Layout from '../../components/Layout';
import Freelancer from '../../components/auth/Freelancer';
import FreelancerDashboard from '../../components/dashboard/FreelancerDashboard';
function FreelancerIndex() {
	return (
		<Layout>
			<Freelancer>
				<FreelancerDashboard />
			</Freelancer>
		</Layout>
	);
}

export default FreelancerIndex;
