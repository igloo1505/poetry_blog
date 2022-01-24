import React, { useEffect, useState } from "react";
import LoginCard from "../components/authentication/LoginCard";
import RegisterCard from "../components/authentication/RegisterCard";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const login = ({
	user: {
		isAuthenticated,
		user: { _id },
	},
}) => {
	const [shouldShowLogin, setShouldShowLogin] = useState(true);
	const router = useRouter();
	useEffect(() => {
		if (isAuthenticated && _id) {
			router.push("/");
		}
	}, [isAuthenticated, _id, router]);

	return (
		<div>
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
