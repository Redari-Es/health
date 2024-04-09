
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { LatestNews, newsList } from './LatestNews'

export const AdminDashboard = () => {
	const [showWelcome, setShowWelcome] = useState(true);

	const handleStartWork = () => {
		setShowWelcome(false);
	};

	return (
		<div className="flex  justify-center items-center">
			{showWelcome ? (
				<AdminWelcome onButtonClick={handleStartWork} />
			) : (
				<div>
					<MainContent widgetsCount={10} />
					<LatestNews newsList={newsList} />
				</div>
			)}
		</div>
	);
};


export const AdminWelcome = ({ onButtonClick }) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<section className="w-screen flex items-center justify-center">
				<div className="bg-white shadow-md rounded-lg p-8">
					<h1 className="text-4xl font-bold mb-4">欢迎，管理员！</h1>
					<p className="text-gray-700 text-sm mb-4">
						您已成功登录，现在可以开始管理您的网站了。
					</p>
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out animate__animated animate__heartBeat animate__infinite"
						onClick={onButtonClick}
					>
						开始工作
					</button>
				</div>
			</section>
		</div>
	);
};


// 主内容区域组件
// 
const MainContent = ({ widgetsCount = 2 }) => {
	const handleWidgetClick = (index, actionType) => {
		switch (actionType) {
			case '增加':
				console.log(`增加操作：对小部件 ${index + 1} 进行增加操作`);
				break;
			case '删除':
				console.log(`删除操作：对小部件 ${index + 1} 进行删除操作`);
				break;
			case '修改':
				console.log(`修改操作：对小部件 ${index + 1} 进行修改操作`);
				break;
			case '查看':
				console.log(`查看操作：对小部件 ${index + 1} 进行查看操作`);
				break;
			default:
				console.log(`未知操作类型`);
		}
	};

	return (
		<div className="flex flex-col pt-10 m-2 min-h-screen mx-auto">
			<h1 className="text-5xl font-bold mb-6 text-center">Welcome to Dashboard</h1>
			<div className="grid grid-cols-2 gap-4">
				{Array(widgetsCount).fill(null).map((_, index) => (
					<div key={index} className="bg-white p-4 shadow rounded-lg" onClick={() => handleWidgetClick(index, '查看')}>
						Widget {index + 1}
					</div>
				))}
			</div>
			{/* 可以继续添加其他小部件 */}
			<QuickActions actions={actions.map(action => ({ ...action, onClick: () => action.onClick(handleWidgetClick) }))} />
		</div>
	);
};

// 快速操作按钮组件
const QuickActions = ({ actions }) => {
	return (
		<div className="grid grid-cols-4 pt-10 gap-2 bg-gray-200 rounded-lg">
			{actions.map((action, index) => (
				<button
					key={index}
					className={`bg-${action.color}-500 text-white py-2 px-4 rounded-lg hover:bg-${action.color}-600 transition duration-200 ease-in-out`}
					onClick={action.onClick}
				>
					{action.label}
				</button>
			))}
		</div>
	);
};

// 导出可用的操作列表
const actions = [
	{ label: '增加', color: 'blue', onClick: (handleWidgetClick) => { return () => handleWidgetClick(0, '增加'); } },
	{ label: '删除', color: 'red', onClick: (handleWidgetClick) => { return () => handleWidgetClick(1, '删除'); } },
	{ label: '修改', color: 'green', onClick: (handleWidgetClick) => { return () => handleWidgetClick(2, '修改'); } },
	{ label: '查看', color: 'yellow', onClick: (handleWidgetClick) => { return () => handleWidgetClick(3, '查看'); } },
];
