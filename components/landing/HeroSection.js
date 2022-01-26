import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Image from "next/image";
import HeroImage from "../../public/penWithCoffeeAndRoses.jpg";

const useStyles = makeStyles((theme) => ({
	heroContainer: {
		backgroundColor: "#fafafa",
		height: "100vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		zIndex: 1,
		// border: "5px solid red",
	},
}));

const HeroSection = () => {
	const styles = useStyles();
	return (
		<div className={styles.heroContainer}>
			<Image
				src={HeroImage}
				alt="Dramatic Poetry with Roses"
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	...props,
});

export default connect(mapStateToProps)(HeroSection);
