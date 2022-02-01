import React, { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
// import createCache from "@emotion/cache";
import createEmotionCache from "../styles/createEmotionCache";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import mainTheme from "../themes/mainTheme";
import Appbar from "../components/app/Appbar";
import MobileAppbar from "../components/app/MobileAppbar";
import LargeModal from "../components/app/ViewSubmissionLargeModal";
import { isMobile } from "mobile-device-detect";
import store from "../state/store";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
	console.log("myApp props: ", props);
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Fragment>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={mainTheme}>
					<Provider store={store}>
						{isMobile ? <MobileAppbar /> : <Appbar />}
						<LargeModal />
						<Component {...pageProps} />
					</Provider>
				</ThemeProvider>
			</CacheProvider>
		</Fragment>
	);
}

export default MyApp;
