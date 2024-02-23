import { Box, Grid } from "@mui/material";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
	return (
		<Box className="w-screen h-[60px] mb-0 pb-0 grow flex flex-row items-center justify-start bg-custom0 ">
			<img
				className=" basis-1/6 px-2 h-[30px] w-[30px]"
				src={logo}
				alt="Logo"
			/>
			<div className="social-icon flex-shrink basis-1/4 align-middle">
				<NavLink to="/contact">
					<img src={navIcon1} alt="Icon" />
				</NavLink>
				<NavLink to="/contact">
					<img src={navIcon2} alt="Icon" />
				</NavLink>
				<NavLink to="/contact">
					<img src={navIcon3} alt="Icon" />
				</NavLink>
			</div>
			{/*
			<p className="text-white text-xl flex-1 text-justify m-0 p-0 ">
				Copyright 2024. All Rights Reserved
			</p>
			*/}
		</Box>
	);
};
