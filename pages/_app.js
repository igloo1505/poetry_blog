import React, { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import mainTheme from "../themes/mainTheme";
import Appbar from "../components/app/Appbar";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<ThemeProvider theme={mainTheme}>
			<Appbar />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
