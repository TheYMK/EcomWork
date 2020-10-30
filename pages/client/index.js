import Layout from '../../components/Layout';
import Client from '../../components/auth/Client';
import ClientDashboard from '../../components/dashboard/ClientDashboard';
function ClientIndex() {
	return (
		<Layout>
			<Client>
				<ClientDashboard />
			</Client>
		</Layout>
	);
}

export default ClientIndex;
