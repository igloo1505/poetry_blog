import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
import { queryAllSubmissions } from "../../state/poemActions";

const useStyles = makeStyles((theme) => ({
	mainInput: {
		position: "relative",
		fontSize: "3rem !important",
		zIndex: 9999,
		borderRadius: "50px",
		padding: "0.75rem 1rem",
		border: "none",
		fontFamily: "'Roboto Condensed', sans-serif",
		transition: "all 0.3s ease-in-out",
		border: "8px solid #fff",
		"&:focus-visible": {
			outline: "none",
			border: `8px solid ${theme.palette.primary.main}`,
			boxShadow: "5px 5px 15px #7b7b7a, -5px -5px 15px #a3a3a2",
		},
	},
	innerContainer: {},
	outerContainer: {
		zIndex: 9999,
		transform: "translateY(-100px)",
		opacity: 0,
	},
}));

const mainSearchInputId = "main-search-input-id";

const MainSearchInput = ({
	props: { setEmphasizeOverlay },
	queryAllSubmissions,
}) => {
	const styles = useStyles();
	const [searchQuery, setSearchQuery] = useState({
		query: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("sending query all submissions request: ");
		let { success } = queryAllSubmissions({ searchQuery: searchQuery.query });
		console.log("success: ", success);
	};

	return (
		<div className={styles.outerContainer} id={mainSearchInputId}>
			<div className={styles.innerContainer}>
				<input
					type="text"
					placeholder="Search for a poem..."
					className={styles.mainInput}
					onFocus={() => setEmphasizeOverlay(true)}
					onBlur={() => setEmphasizeOverlay(false)}
					onChange={(e) => {
						setSearchQuery({ query: e.target.value });
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSubmit(e);
						}
					}}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	posts: state.posts,
	props: props,
});

export default connect(mapStateToProps, { queryAllSubmissions })(
	MainSearchInput
);
