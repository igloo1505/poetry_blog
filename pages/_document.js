import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { ServerStyleSheet } from "styled-components";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../styles/createEmotionCache";

export default class MyDocument extends Document {
	render() {
		console.log("this.props", this.props.emotionStyleTags);
		return (
			<Html lang="en">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
						rel="stylesheet"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/radish-icons/apple-touch-icon.png"
					/>
					{this.props.emotionStyleTags}
				</Head>
				<body>
					<div id="topLevelPortalContainer" />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// MyDocument.getInitialProps = async (ctx) => {
// 	const sheets = new ServerStyleSheets();
// 	const originalRenderPage = ctx.renderPage;
// 	const cache = createEmotionCache();
// 	// const cache = getCache();
// 	const { extractCriticalToChunks } = createEmotionServer(cache);

// 	// ctx.renderPage = () =>
// 	// 	originalRenderPage({
// 	// 		enhanceApp: (App) => (props) =>
// 	// 			sheets.collect(<App {...props} emotionCache={cache} />),
// 	// 	});

// 	ctx.renderPage = () =>
// 		originalRenderPage({
// 			enhanceApp: (App) =>
// 				function EnhanceApp(props) {
// 					return <App emotionCache={cache} {...props} />;
// 				},
// 		});

// 	//
// 	const initialProps = await Document.getInitialProps(ctx);
// 	// This is important. It prevents emotion to render invalid HTML.
// 	// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
// 	const emotionStyles = extractCriticalToChunks(initialProps.html);
// 	const emotionStyleTags = emotionStyles.styles.map((style) => (
// 		<style
// 			data-emotion={`${style.key} ${style.ids.join(" ")}`}
// 			key={style.key}
// 			// eslint-disable-next-line react/no-danger
// 			dangerouslySetInnerHTML={{ __html: style.css }}
// 		/>
// 	));

// 	return {
// 		...initialProps,
// 		styles: [
// 			...React.Children.toArray(initialProps.styles),
// 			sheets.getStyleElement(),
// 		],
// 		emotionStyleTags,
// 	};
// };

MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};
