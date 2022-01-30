import React, { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import mainTheme from "../themes/mainTheme";
import Appbar from "../components/app/Appbar";
import MobileAppbar from "../components/app/MobileAppbar";
import LargeModal from "../components/app/ViewSubmissionLargeModal";
import { isMobile } from "mobile-device-detect";
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
			<ThemeProvider theme={mainTheme}>
				<Provider store={store}>
					{isMobile ? <MobileAppbar /> : <Appbar />}
					<LargeModal />
					<Component {...pageProps} />
				</Provider>
			</ThemeProvider>
		</Fragment>
	);
}

export default MyApp;
