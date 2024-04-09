import React, {
	useState,
	useRef,
	createContext,
	useContext,
	useEffect,
} from "react";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DrawerAppBar from "../components/Bar";
import { Main, Footers, DrawerHeader } from "../components/BarStyles";
import { Footer } from "../components/Footer";
import { styled, useTheme } from "@mui/material/styles";
import { States } from "./States";

const BaseLayout = ({ children }) => {
	return (
		<div className="min-h-screen" >
			<CssBaseline />
			{children}
			<Outlet />
		</div >
	);
};

export default BaseLayout;


