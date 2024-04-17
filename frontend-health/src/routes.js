import React from "react";

//Layout
import MainLayout from "./layouts/MainLayout";
import BaseLayout from "./layouts/BaseLayout";
import PrivateRoutes, { UserLayout } from "./layouts/UserLayout";
//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound, NotFoundPage } from "./pages/NotFound";
import { Summary } from "./pages/Summary";
import Dashboard from "./pages/Dashboard"
import Users from "./pages/user/Users";
import Body from "./pages/Body";
import Family from "./pages/Family";
import Breath from "./pages/Breath";
import ERecord from "./pages/ERecord";
import Blood from "./pages/Blood";
import Vision from "./pages/Vision";
import Sleep from "./pages/Sleep";
// Component
// import UserProfile from "./components/UserProfile"
import Logs from "./pages/Logs";
// Echart
import { HeartsLayout } from "./layouts/HeartsLayout"
import { useRoutes } from "react-router-dom";
import { useAuth } from './layouts/States'
import { Heart, Hrv, Rhr, Rates } from "./pages/charts/Hearts";
//Admin
import { Admin } from "./pages/Admin"
import { OverView } from "./pages/admin/OverView"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import FeedBack from './pages/admin/FeedBack'
import AnalyticsDashboard from './pages/admin/Analytics'



// 前台路由

const GetRecRoutes = () => {
	const { user } = useAuth();

	const routes = useRoutes([
		{
			path: "",
			element: <BaseLayout />,
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
					path: "dashboard",
					element: <MainLayout />, // MainLayout 应用在 /dashboard 路径下
					children: [
						{
							path: "", // 空路径，因为 /dashboard 已经在 MainLayout 中定义了
							element: <Dashboard />, // Dashboard 是 MainLayout 下的默认子路由
						},
						{
							path: "user",
							element: <Users />,
						},
						{
							path: '/dashboard/:username',
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
									path: "family",
									element: <Family />,
								},
								{
									path: "hearts",
									element: <HeartsLayout />,
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
								{
									path: "body",
									element: <Body />,
								},
								{
									path: "breath",
									element: <Breath />,
								},
								{
									path: "sleep",
									element: <Sleep />,
								},
								{
									path: "vision",
									element: <Vision />,
								},
								{
									path: "erecord",
									element: <ERecord />,
								},
								{
									path: "blood",
									element: <Blood />,
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
			path: "",
			element: <Admin />,
			children: [
				{
					path: "/",
					element: <AdminDashboard />,
				},
				{
					path: 'log', element: <Logs />
				},
				{
					path: 'overview', element: <OverView />
				},
				{
					path: 'analytics', element: <AnalyticsDashboard />
				},
				{
					path: 'feedback', element: <FeedBack />
				},
				{
					path: "user",
					element: <Users />,
				},
				{
					path: '/admin/:username',
					element: <PrivateRoutes />,
					children: [
						{
							path: "",
							element: <UserLayout />,
						},
					]
				}
			]
			// 如果访问的路径不是上述任何一个，导航至 admin 页面的 Home 组件
			// { path: "*", element: <Navigate to="/admin" replace /> },
		},
		// 如果访问的路径不是 /admin 下的任何路径，则显示后台404页面
		{
			path: "*", element: <NotFoundPage />,
		}
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

