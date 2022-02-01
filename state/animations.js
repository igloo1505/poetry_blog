import gsap from "gsap";

const featuredCardClass = "pop-up-card-featured";
const searchResultContainerClass = "landing-search-results-container";
const searchResultContentContainerClass =
	"landing-search-results-content-container";
const searchNoResultContainerClass = "landing-search-no-results-container";
const searchNoResultContentContainerClass =
	"landing-search-no-results-content-container";

export const animateSearchResult = () => {
	console.log("animateSearchResult: ");
	if (typeof window !== "undefined") {
		let tl = gsap.timeline();
		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			ease: "power3.inOut",
		});
		tl.to(`.${searchResultContainerClass}`, {
			opacity: 1,
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			duration: 0,
		});
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

export const animateSearchNoResult = () => {
	console.log(animateSearchNoResult);
	if (typeof window !== "undefined") {
		let tl = gsap.timeline();
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
		tl.to(`.${featuredCardClass}`, {
			opacity: 0,
			ease: "power3.inOut",
		});
		tl.fromTo(
			`.${searchNoResultContainerClass}`,
			{
				opacity: 0,
				x: "100vw",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				duration: 0,
			},
			{
				opacity: 1,
				x: 0,
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				duration: 1,
				ease: "power3.inOut",
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

export const animateSearchReset = () => {};
