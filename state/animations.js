import gsap from "gsap";
import store from "./store";
import * as Types from "./Types";
import { isMobile } from "mobile-device-detect";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const featuredCardClass = "pop-up-card-featured";
const searchResultContainerClass = "landing-search-results-container";
const searchResultContentContainerClass =
	"landing-search-results-content-container";
const searchNoResultContainerClass = "landing-search-no-results-container";
const searchNoResultContentContainerClass =
	"landing-search-no-results-content-container";
const popUpCardSearchResultClass = "popup-card-container-animated-searchResult";
const clearButtonId = "landingSearchClearButton";
const mainSearchInputId = "main-search-input-id";
const overlayTimeout = 800;
const overlayId = "hero-overlay-id";
const imageId = "hero-image-id";

export const animateLandingWithoutCards = () => {
	console.log("ANIMATION: animateLandingWithoutCards");
	let tl = gsap.timeline();
	tl.fromTo(
		`#${overlayId}`,
		{ backgroundColor: "rgba(0, 0, 0, 0)" },
		{ backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1, duration: 1 }
	);
	tl.fromTo(
		"#landing-page-title-text",
		{
			y: "-100px",
			opacity: 0.0,
		},
		{
			y: "0px",
			opacity: 1,
			duration: 0.7,
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
		}
	);
	tl.fromTo(
		`#${mainSearchInputId}`,
		{ y: "-100px", opacity: 0.0 },
		{
			y: "0px",
			opacity: 1,
			duration: 0.5,
			onComplete: () => {
				if (!isMobile) {
					store.dispatch({
						type: Types.SET_NAVBAR_HIDDEN,
						payload: true,
					});
				}
			},
		},
		">-=0.3"
	);
};
export const animateLandingWithFeatured = () => {
	console.log("ANIMATION: animateLandingWithFeatured");
	let tl = gsap.timeline();
	tl.fromTo(
		`#${overlayId}`,
		{ backgroundColor: "rgba(0, 0, 0, 0)" },
		{ backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1, duration: 1 }
	);
	tl.fromTo(
		"#landing-page-title-text",
		{
			y: "-100px",
			opacity: 0.0,
		},
		{
			y: "0px",
			opacity: 1,
			duration: 0.7,
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
		}
	);
	tl.fromTo(
		`#${mainSearchInputId}`,
		{ y: "-100px", opacity: 0.0 },
		{
			y: "0px",
			opacity: 1,
			duration: 0.5,
			onComplete: () => {
				if (!isMobile) {
					store.dispatch({
						type: Types.SET_NAVBAR_HIDDEN,
						payload: true,
					});
				}
			},
		},
		">-=0.3"
	);

	tl.fromTo(
		`.popup-card-container-animated`,
		{
			opacity: 0.0,
			transform: "translateY(100%)",
			transformOrigin: "top center",
		},
		{
			transform: "translateY(0)",
			opacity: 1,
			visibility: "visible",
			duration: 1,
			// ease: "back.out(1.7)",
			ease: "elastic.out(1, 0.7)",
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
			stagger: 0.2,
		}
	);
	tl.fromTo(
		`.popup-card-container-animated`,
		{
			boxShadow: "0px 0px 8px #bebebe",
		},
		{
			boxShadow: "0px -5px 8px #bebebe",
			ease: "elastic.out(1, 0.7)",
			// onComplete: () => {
			// 	if (!isMobile) {
			// 		dispatch({
			// 			type: Types.SET_NAVBAR_HIDDEN,
			// 			payload: true,
			// 		});
			// 	}
			// },
			stagger: 0.2,
		},
		">-=0.5"
	);
};

export const animateSearchResult = () => {
	console.log("ANIMATION: animateSearchResult");
	store.dispatch({
		type: Types.SET_ANIMATE_SEARCH_RESULT,
		payload: true,
	});
	if (typeof window !== "undefined") {
		gsap.to("#index-container-main", {
			duration: 0,
			immediateRender: true,
			overflow: "visible",
			maxHeight: "unset",
		});
		// gsap.fromTo(
		// 	`#${mainSearchInputId}`,
		// 	{
		// 		opacity: 0,
		// 	},
		// 	{
		// 		opacity: 1,
		// 		duration: 0,
		// 		immediateRender: true,
		// 	}
		// );

		let tl = gsap.timeline({
			onComplete: () => {
				store.dispatch({
					type: Types.SET_ANIMATE_SEARCH_RESULT,
					payload: false,
				});
			},
		});

		tl.to(
			`#${mainSearchInputId}`,
			{
				opacity: 1,
				duration: 0.5,
			},
			">-=0.3"
		);
		// tl.to(`#${clearButtonId}`, {
		// 	opacity: 1,
		// 	scale: 1,
		// 	duration: 0.5,
		// 	ease: "elastic.out(1, 0.7)",
		// });
		tl.fromTo(
			`#${clearButtonId}`,
			{
				opacity: 0,
			},
			{
				visibility: "visible",
				opacity: 1,
				scale: 1,
				duration: 0.5,
				ease: "elastic.out(1, 0.7)",
				// immediateRender: true,
			}
		);
		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			x: "-100vw",
			stagger: 0.1,
			ease: "power3.inOut",
		});

		// tl.fromTo(
		// 	`.${searchResultContainerClass}`,
		// 	{
		// 		opacity: 0,
		// 		scaleY: 0,
		// 		transformOrigin: "bottom",
		// 		display: "flex",
		// 		flexDirection: "row",
		// 		flexWrap: "wrap",
		// 		duration: 0.5,
		// 		ease: "power3.inOut",
		// 	},
		// 	{
		// 		opacity: 1,
		// 		scaleY: 1,
		// 		display: "flex",
		// 		flexDirection: "row",
		// 		flexWrap: "wrap",
		// 		duration: 0.5,
		// 		ease: "power3.inOut",
		// 	},
		// 	"+=0.2"
		// );
		tl.to(
			`.${searchResultContainerClass}`,
			{
				opacity: 1,
				scaleY: 1,
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				duration: 0.5,
				ease: "power3.inOut",
			},
			"+=0.2"
		);
		tl.fromTo(
			`.${popUpCardSearchResultClass}`,
			{
				opacity: 0,
				x: "100vw",
			},
			{
				opacity: 1,
				visibility: "visible",
				x: 0,
				stagger: 0.2,
				scale: 1,
				duration: 1,
				ease: "power3.inOut",
			}
		);
		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			x: "0",
			y: "100%",
			visibility: "hidden",
			duration: 0,
			// immediateRender: true,
			stagger: 0.1,
			ease: "power3.inOut",
			// onComplete: () => {
			// 	store.dispatch({
			// 		type: Types.SET_ANIMATE_SEARCH_RESULT,
			// 		payload: false,
			// 	});
			// },
		});
	}
};

export const animateSearchNoResult = () => {
	console.log("ANIMATION: animateSearchNoResult");
	if (typeof window !== "undefined") {
		gsap.to(`#${mainSearchInputId}`, {
			opacity: 1,
			duration: 0,
			immediateRender: true,
		});
		let tl = gsap.timeline();
		gsap.to(`.${searchNoResultContainerClass}`, {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			opacity: 1,
			duration: 0,
			immediateRender: true,
		});

		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			ease: "power3.inOut",
		});

		tl.fromTo(
			`.${searchNoResultContainerClass}`,
			{
				opacity: 0,
				y: "100%",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				duration: 0,
			},
			{
				opacity: 1,
				y: 0,
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				duration: 0.5,
				ease: "elastic.out(1, 0.7)",
			}
		);
		// tl.fromTo(
		// 	`.${featuredCardClass}`,
		// 	{
		// 		opacity: 1,
		// 	},
		// 	{
		// 		opacity: 0,
		// 		ease: "power3.inOut",
		// 	}
		// );
	}
};

export const animateSearchReset = () => {
	console.log("ANIMATION: animateSearchReset");
	if (typeof window !== "undefined") {
		// window.scrollTo(0, 0);
		gsap.to(window, {
			scrollTo: 0,
			duration: 0.3,
		});
	}
	let tl = gsap.timeline();

	tl.to(`#${clearButtonId}`, {
		// opacity: 0,
		scaleY: 0,
		duration: 0.3,
		transformOrigin: "bottom",
		// ease: "elastic.out(1, 0.7)",
		ease: "power3.inOut",
	});

	tl.to(`.${popUpCardSearchResultClass}`, {
		// opacity: 0,
		scaleY: 0,
		duration: 0.3,
		stagger: 0.1,
		// ease: "elastic.out(1, 0.7)",
		ease: "power3.inOut",
	});
	tl.to(`.${searchResultContainerClass}`, {
		// opacity: 0,
		scaleY: 0,
		transformOrigin: "bottom",
		duration: 0.3,
		stagger: 0.1,
		// ease: "elastic.out(1, 0.7)",
		ease: "power3.inOut",
	});

	tl.fromTo(
		`.${featuredCardClass}`,
		{
			opacity: 0,
			y: "100%",
			x: 0,
			// transformOrigin: "bottom",
		},
		{
			opacity: 1,
			visibility: "visible",
			y: 0,
			x: 0,
			duration: 0.5,
			stagger: 0.1,
			ease: "elastic.out(1, 0.7)",
			// ease: "power3.inOut",
		}
	);

	// animateLandingWithFeatured();
	tl.to(`.${popUpCardSearchResultClass}`, {
		visibility: "hidden",
		scaleY: 1,
		duration: 0,
	});
	store.dispatch({
		type: Types.CLEAR_ALL_QUERY_RESULTS,
	});
};

export const animateAdditionalSearchResults = ({ indexRange }) => {
	console.log("ANIMATION: animateAdditionalSearchResults");
	let tl = gsap.timeline();
	for (let index = indexRange.min; index < indexRange.max; index++) {
		tl.fromTo(
			`#popUpCardSearchResult-${index}`,
			{
				opacity: 0,
				// x: "100vw",
				scaleY: 0,
			},
			{
				opacity: 1,
				scaleY: 1,
				duration: 0.5,
				ease: "elastic.out(1, 0.7)",
			}
		);
	}
};
