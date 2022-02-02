import React, { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
// import createCache from "@emotion/cache";
import createEmotionCache from "../styles/createEmotionCache";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import * as Types from "../state/Types";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import mainTheme from "../themes/mainTheme";
import Appbar from "../components/app/Appbar";
import MobileAppbar from "../components/app/MobileAppbar";
import LargeModal from "../components/app/ViewSubmissionLargeModal";
import { isMobile } from "mobile-device-detect";
import Drawer from "../components/app/Drawer";
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

	useEffect(() => {
		if (typeof window !== "undefined") {
			let mobileAppbarId = "mobile-appbar-outer-container";
			let standardAppbarId = "standard-appbar-outer-container";
			let navHeight = false;
			if (isMobile) {
				navHeight = document.getElementById(mobileAppbarId)?.height;
			}
			if (!isMobile) {
				navHeight = document.getElementById(standardAppbarId)?.height;
			}
			window.addEventListener("resize", () => {
				store.dispatch({
					type: Types.SET_VIEWPORT_DIMS,
					payload: {
						width: window.innerWidth,
						height: window.innerHeight,
						...(navHeight && { navHeight: navHeight }),
					},
				});
			});
		}
	}, []);

	return (
		<Fragment>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={mainTheme}>
					<Provider store={store}>
						{isMobile ? <MobileAppbar /> : <Appbar />}
						{isMobile && <Drawer />}
						<LargeModal />
						<Component {...pageProps} />
					</Provider>
				</ThemeProvider>
			</CacheProvider>
		</Fragment>
	);
}

export default MyApp;
