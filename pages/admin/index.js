import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

function AdminIndex() {
	return (
		<Layout>
			<Admin>
				<h3>Admin Dashboard</h3>
			</Admin>
		</Layout>
	);
}

export default AdminIndex;
