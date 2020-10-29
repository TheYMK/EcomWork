import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config'; // So we can access configuration variables

const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
