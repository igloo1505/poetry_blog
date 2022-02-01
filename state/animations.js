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
	console.log("animateSearchNoResult");
	if (typeof window !== "undefined") {
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

export const animateSearchReset = () => {};
