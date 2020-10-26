import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/Homepage.module.css';

export default function Home() {
	return (
		<Layout>
			<h1 className={styles.title}>Home Page</h1>
		</Layout>
	);
}
