
import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";

const Admin = () => {
	return (
		<>
			<Container>
				<h1>Admin Page</h1>
				<div className="text-base p-1 border border-black border-solid ">
					Welcome to the Admin page!
				</div>
				<BasicPagination />
			</Container>

			<Outlet />
		</>
	);
};

export default Admin;

