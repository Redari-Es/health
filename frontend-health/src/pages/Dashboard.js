import React from 'react';
import { Outlet } from 'react-router-dom'
import { Title } from '../components/Pages'

const Dashboard = ({ children }) => {
	return (
		<>
			<Title text="欢迎使用健康管理系统" />
			{children}
			< Outlet />
		</>
	);
};

export default Dashboard;
