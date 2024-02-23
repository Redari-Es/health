import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";

const Home = () => {
	return (
		<>
			<Container>
				<h1>Home Page</h1>
				<div className="text-base p-1 border border-black border-solid ">
					Welcome to the home page!
				</div>
				<BasicPagination />
			</Container>

			<Outlet />
		</>
	);
};

export default Home;
