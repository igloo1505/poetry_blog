import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

export default function PaginationRounded({
	totalPages,
	activePage,
	updatePage,
}) {
	const handlePaginate = (e) => {
		updatePage(parseInt(e.target.innerText) - 1);
	};
	return (
		<Stack spacing={2}>
			<Pagination
				count={totalPages}
				variant="outlined"
				shape="rounded"
				page={activePage + 1}
				onChange={handlePaginate}
			/>
		</Stack>
	);
}

const Link = ({ item }) => {
	return <Link>{item}</Link>;
};
