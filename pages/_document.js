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

					<script
						defer
						src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
						integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
						crossorigin="anonymous"
					/>
					<script
						defer
						src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
						integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
						crossorigin="anonymous"
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
