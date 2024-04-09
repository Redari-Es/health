import React, { useState, useEffect } from 'react';

// 分析数据模型
const AnalyticsData = {
	visits: 0,
	uniqueVisitors: 0,
	pageViews: 0,
	popularPages: [],
	errorCount: 0,
};

// 模拟的分析服务API
const mockAnalyticsAPI = {
	getAnalyticsData: () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					visits: Math.floor(Math.random() * 1000),
					uniqueVisitors: Math.floor(Math.random() * 100),
					pageViews: Math.floor(Math.random() * 5000),
					popularPages: ['Home', 'About', 'Contact'],
					errorCount: Math.floor(Math.random() * 100),
				});
			}, 1000);
		});
	},
};

// 分析仪表板组件
const AnalyticsDashboard = () => {
	const [analyticsData, setAnalyticsData] = useState(AnalyticsData);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const data = await mockAnalyticsAPI.getAnalyticsData();
				setAnalyticsData(data);
			} catch (error) {
				console.error('Failed to fetch analytics data:', error);
			}
		};

		fetchAnalyticsData();
	}, []);

	return (
		<div className="flex justify-center items-center  h-screen">
			<div className="container mx-auto  p-4 bg-white shadow-lg rounded-lg">
				<h1 className="text-3xl font-bold mb-4 text-center">Analytics Dashboard</h1>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h2 className="text-xl font-bold mb-2">Visits</h2>
						<p className="text-gray-700 text-center">{analyticsData.visits}</p>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-2">Unique Visitors</h2>
						<p className="text-gray-700 text-center">{analyticsData.uniqueVisitors}</p>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-2">Page Views</h2>
						<p className="text-gray-700 text-center">{analyticsData.pageViews}</p>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-2">Error Count</h2>
						<p className="text-gray-700 text-center">{analyticsData.errorCount}</p>
					</div>
				</div>
				<div className="mt-4">
					<h2 className="text-xl font-bold mb-2 text-center">Popular Pages</h2>
					<ul className="list-disc pl-4">
						{analyticsData.popularPages.map((page, index) => (
							<li key={index} className="text-center">
								{page}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default AnalyticsDashboard;
