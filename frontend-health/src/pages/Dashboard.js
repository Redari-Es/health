import React from 'react';
import { Outlet } from 'react-router-dom'
import { Title } from '../components/Pages'
import { useTranslation } from 'react-i18next'


const Dashboard = ({ children }) => {
	const { t } = useTranslation()
	return (
		<>
			<Title text={t("welcome.title")} />
			{children}
			< Outlet />
		</>
	);
};

export default Dashboard;
