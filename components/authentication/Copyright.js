import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
const Copyright = ({ props }) => {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
			style={{
				margin: "1rem 0",
			}}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://www.igloodevelopment.dev">
				IglooDevelopment.dev
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Copyright;
