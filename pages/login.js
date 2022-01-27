import React, { useEffect, useState } from "react";
import LoginCard from "../components/authentication/LoginCard";
import RegisterCard from "../components/authentication/RegisterCard";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
	},
}));

const login = ({
	user: {
		isAuthenticated,
		user: { _id },
	},
}) => {
	const [shouldShowLogin, setShouldShowLogin] = useState(true);
	const router = useRouter();
	const styles = useStyles();
	useEffect(() => {
		if (isAuthenticated && _id) {
			router.push("/");
		}
	}, [isAuthenticated, _id, router]);

	return (
		<div className={styles.container}>
			{shouldShowLogin ? (
				<LoginCard
					shouldShowLogin={shouldShowLogin}
					setShouldShowLogin={setShouldShowLogin}
				/>
			) : (
				<RegisterCard
					shouldShowLogin={shouldShowLogin}
					setShouldShowLogin={setShouldShowLogin}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	props: props,
});

export default connect(mapStateToProps)(login);
