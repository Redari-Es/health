import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import BasicPagination from "../components/BasicPagination";
import { Title } from "../components/Pages"
import { Link } from 'react-router-dom';
import { Banner } from './Banner'
import { BottomNavigation, ScrollSections } from '../components/Section'

const sectionIds = ['welcome', 'banner'];
const idTextMap = {
	welcome: '欢迎',
	banner: '标语',
};

// data.js
const content = {
	english: {
		title: 'Welcome to Health Management System',
		description: 'Start your journey towards a healthier lifestyle with our comprehensive Health Management System. Track your progress, set goals, and achieve optimal well-being.',
		button: 'Get Started'
	},
	chinese: {
		title: '欢迎使用健康管理系统',
		description: '从现在开始，让我们一起开始健康管理系统之旅，迈向更健康的生活方式。跟踪您的进展，设定目标，并实现最佳的健康状况。',
		button: '开始'
	}
};

const Home = () => {
	const [language, setLanguage] = useState('english');

	const toggleLanguage = () => {
		setLanguage(language === 'english' ? 'chinese' : 'english');
	};

	const { title, description, button } = content[language];

	return (
		<ScrollSections sectionIds={sectionIds}>
			<div className="min-h-screen bg-gradient-to-b from-custom6 to-purple-500">
				{/* 传递 language 属性给 Welcome 组件 */}
				<Welcome title={title} description={description} button={button} onToggleLanguage={toggleLanguage} language={language} />
				<Banner />
			</div>
			<BottomNavigation sectionIds={sectionIds} idTextMap={idTextMap} />
		</ScrollSections >
	);
};


// Welcome.js
const Welcome = ({ title, description, button, onToggleLanguage, language }) => {
	// 根据当前语言选择切换按钮的文本
	const toggleLanguageText = language === 'english' ? '切换到中文' : 'Switch to English';

	return (
		<section id="welcome" className="screen">
			<div className="p-4 flex flex-col gap-10 items-center justify-center text-center">
				<div className="flex flex-col gap-4">
					<h1 className="bigtitle title0">{title}</h1>
				</div>
				<p className="text-sm md:text-base font-light">{description}</p>
				{/* 添加 Link */}
				<Link to="/dashboard" className="bg-custom0 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">{button}</Link>
				{/* 切换语言按钮 */}
				<button className="text-xl mt-4 underline text-blue-600" onClick={onToggleLanguage}>
					{toggleLanguageText}
				</button>
			</div>
		</section >
	);
};


export default Home;
