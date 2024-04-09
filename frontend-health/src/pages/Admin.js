
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";
import { Title } from "../components/Pages"
import { Link } from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";



export const Admin = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [sidebarWidth, setSidebarWidth] = useState(200);
	const [activePage, setActivePage] = useState('Dashboard');

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
		setSidebarWidth(isSidebarOpen ? 0 : 200);
	};

	return (
		<div className="relative flex bg-gray-100">

			{/* 切换侧边栏的按钮 */}
			<SidebarToggle isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			{/* 侧边栏 */}
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				sidebarWidth={sidebarWidth}
				toggleSidebar={toggleSidebar}
				activePage={activePage}
				setActivePage={setActivePage}
			/>
			{/* 主内容区域 */}
			<CssBaseline />
			<div className="flex flex-col p-10 m-2 min-h-screen mx-auto" style={{ width: '75%' }}>
				{children}
				<Outlet />
			</div>
		</div>

	);
};


//侧边栏切换按钮
const SidebarToggle = ({ isSidebarOpen, toggleSidebar }) => {
	return (
		<button
			onClick={toggleSidebar}
			className={`fixed left-${isSidebarOpen ? '200' : '0'} bg-gray-800 text-white px-4 py-2 z-10 transition-all duration-500 hover:bg-gray-700 ${isSidebarOpen ? '' : 'rounded-xl'}`}
			style={{ marginLeft: `${isSidebarOpen ? '200px' : '0'}` }}
		>
			{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
		</button>
	)
}

const sidebarItems = [
	{ name: 'Dashboard', link: '/admin' },
	// {name: 'Welcome', link: 'welcome' },
	{ name: 'OverView', link: 'overview' },
	{ name: 'Log', link: 'log' },
	{ name: 'Feedback', link: 'feedback' },
	{ name: 'Analytics', link: 'analytics' },
	{ name: 'Home', link: '/' },
	// 添加更多侧边栏条目
];


const Sidebar = ({ isSidebarOpen, sidebarWidth, toggleSidebar, activePage, setActivePage }) => {
	return (
		<div
			style={{ width: `${sidebarWidth}px`, position: 'fixed', top: 0, left: 0, bottom: 0 }}
			className="bg-gray-800 text-white flex-none transition-width duration-500 z-50 overflow-y-auto"
			onClick={toggleSidebar}
		>
			<div className="h-full">
				<div className="px-4 py-8">
					<h1 className="text-xl font-bold">Dashboard</h1>
				</div>
				<ul className="space-y-2">
					{sidebarItems.map((item) => (
						<li
							key={item.name}
							className={`px-4 py-2 hover:bg-gray-700 ${activePage === item.name ? 'bg-gray-700' : ''}`}
							onClick={() => setActivePage(item.name)}
						>
							<Link to={item.link}>{item.name}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
