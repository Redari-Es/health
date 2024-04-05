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

const MainLayout = ({ children }) => {
	const theme = useTheme();

	//open
	const { open } = useContext(States);

	// showFooter 设置页面滚动底部显示footer
	const [showFooter, setShowFooter] = useState(true);
	useEffect(() => {
		const handleScroll = () => {
			const { scrollHeight, scrollTop, clientHeight } =
				document.documentElement;
			// 表示页面滚动到底部
			if (scrollTop === 0) {
				setShowFooter(true);
			}
			if (scrollTop + clientHeight >= scrollHeight) {
				setShowFooter(true);
			} else {
				setShowFooter(false);
			}
		};

		const hasScrolled = window.scrollY > 0;
		if (hasScrolled) {
			handleScroll();
		}

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="flex flex-col h-4/5">
			<header>
				<DrawerAppBar />
				{/* 导航栏 */}
			</header>
			{/* 主页 */}
			<Main
				className=" flex flex-col items-center justify-center mt-8 mb-20 scroll-smooth focus:scroll-auto "
				open={open}
			>
				<Box
					component="main"
					className=" w-3/4 flex-grow bg-gray-100 box-border border-2 border-solid border-custom0 rounded-lg shadow-lg hover:shadow-2xl"
					sx={{ p: 3 }}
				>
					<CssBaseline />
					{children}
					<Outlet />
				</Box>
			</Main>
			{/* 页脚 */}
			{showFooter && (
				<Footers className="fixed bottom-0" open={open}>
					<Footer />
				</Footers>
			)}{" "}
		</div>
	);
};

export default MainLayout;
