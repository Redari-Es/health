import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (event, page) => {
		onPageChange(page);
	};

	return (
		<div className="flex justify-center items-center">
			<Stack spacing={2}>
				<Pagination
					count={totalPages} // 总页数
					color="secondary"
					page={currentPage} // 当前页码
					onChange={handlePageChange} // 点击分页时的回调函数
					className="text-xl"
				/>
			</Stack>
		</div >
	);
}

export default BasicPagination;
