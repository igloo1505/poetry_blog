import React, { useEffect, useState } from "react";
import LoginCard from "../components/authentication/LoginCard";
import RegisterCard from "../components/authentication/RegisterCard";

const login = () => {
	const [shouldShowLogin, setShouldShowLogin] = useState(true);
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

export default login;
