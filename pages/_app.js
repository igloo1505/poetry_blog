import React, { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import mainTheme from "../themes/mainTheme";
import Appbar from "../components/app/Appbar";
import LargeModal from "../components/app/ViewSubmissionLargeModal";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
		<Fragment>
			<Provider store={store}>
				<ThemeProvider theme={mainTheme}>
					<Appbar />
					<LargeModal />
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		</Fragment>
	);
}

export default MyApp;
