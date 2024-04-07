import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";
import { Title } from "../components/Pages"

const Home = () => {
	return (
		<>
			<Container>
				<Title text="Health" />
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
