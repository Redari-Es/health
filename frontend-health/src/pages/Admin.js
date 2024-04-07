
import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";
import { Title } from "../components/Pages"

const Admin = () => {
	return (
		<>
			<Container>
				<Title text="Admin" />
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

