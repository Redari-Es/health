import React from "react";

//Layout
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes, { UserLayout } from "./layouts/UserLayout";
//Pages
import Home from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Summary } from "./pages/Summary";
import Users from "./pages/user/Users";
import Admin from "./pages/Admin";
// Component
import UserProfile from "./components/UserProfile"
// logs
import Logs from "./pages/logs";
// Echart
import ChartLayout, { ChartsLayout } from "./layouts/ChartLayout"
import { useRoutes, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from './layouts/States'
import { Heart, Hrv, Rhr, Rates } from "./pages/charts/Hearts";
import { Outlet } from "react-router-dom";



// 前台路由
const GetRecRoutes = () => {
	const { user } = useAuth();

	const routes = useRoutes([
		{
			path: "",
			element: <MainLayout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "home",
					element: <Home />,
				},
				{
					path: "about",
					element: <About />,
				},
				{
					path: "contact",
					element: <Contact />,
				},
				{
					path: "user",
					element: <Users />,
				},
				{
					path: ':username',
					element: <PrivateRoutes />,

					children: [
						{
							path: "",
							element: <UserLayout />,
						},
						{
							path: "summary",
							element: <Summary />,
						},
						{
							path: "hearts",
							element: <ChartsLayout />,
							children: [
								{
									path: "heart",
									element: <Heart />
								},
								{
									path: "hrv",
									element: <Hrv />
								},
								{
									path: "rhr",
									element: <Rhr />
								},
								{
									path: "rates",
									element: <Rates />
								},
							]
						},
					]
				},
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return routes;
};

// 后台路由
const GetAdminRoutes = () => {
	const routes = useRoutes([
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					path: "/admin",
					element: <Admin />,
				},
				{
					path: "/a",
					element: <div>admin-shon</div>,
				},
			],
		},
		{
			path: "*",
			element: <div>后台404</div>,
		},
	]);
	return routes;
};

const GetAllRoutes = () => {
	const routes = useRoutes([
		{
			path: "/*",
			element: <GetRecRoutes />,
		},
		{
			path: "/admin/*",
			element: <GetAdminRoutes />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
	return routes;
};


export default GetAllRoutes;

// const SetRoutes=()=>{
//   return((
//
//     <Router>
//       <GetAllRoutes/>
//     </Router>
//   ))
// }
