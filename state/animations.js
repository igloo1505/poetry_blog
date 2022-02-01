import gsap from "gsap";
import store from "./store";
import * as Types from "./Types";

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

export const animateSearchResult = () => {
	console.log("animateSearchResult: ");
	if (typeof window !== "undefined") {
		gsap.to(`#${mainSearchInputId}`, {
			opacity: 1,
			duration: 0,
			immediateRender: true,
		});
		gsap.to(`#${clearButtonId}`, {
			visibility: "visible",
			duration: 0,
			immediateRender: true,
		});
		let tl = gsap.timeline();

		tl.to(`#${clearButtonId}`, {
			opacity: 1,

			scale: 1,
			duration: 0.3,
			ease: "elastic.out(1, 0.7)",
		});
		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			ease: "power3.inOut",
		});
		tl.to(`.${searchResultContainerClass}`, {
			opacity: 1,
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			duration: 0.5,
		});
		tl.fromTo(
			`.${popUpCardSearchResultClass}`,
			{
				opacity: 0,
				x: "100vw",
			},
			{
				opacity: 1,
				x: 0,
				stagger: 0.2,
				duration: 1,
				ease: "power3.inOut",
			}
		);
	}
};

export const animateSearchNoResult = () => {
	console.log("animateSearchNoResult");
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

	store.dispatch({
		type: Types.CLEAR_ALL_QUERY_RESULTS,
	});
};
