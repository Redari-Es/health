import React from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import Users from "./pages/user/Users";
import Admin from "./pages/Admin";
// logs
import Logs from "./pages/logs";
// Echart
import HeartRateChart from "./pages/heart/HeartRateChart";
import { Rates } from "./pages/heart/HeartRateChart";
import { useRoutes } from "react-router-dom";
// 前台路由
const GetRecRoutes = () => {
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
					path: "/home",

					element: <Home />,
				},
				{
					path: "/about",
					// element: <Rates />,
					element: <Logs />,
				},
				{
					path: "/contact",
					// element: <Contact />,
					element: <HeartRateChart />
				},
				{
					path: "/user",
					element: <Users />,
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
