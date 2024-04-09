import React from "react";
import Typography from "@mui/material/Typography";
import { Title } from '../components/Pages'
import { ScrollSections, BottomNavigation, navItems, idToUrlMap, NavigationButtons } from '../components/Section'


const sectionIds = ['about1', 'about2', 'about3', 'about4'];
const idTextMap = {
	about1: '我们的愿景',
	about2: '系统特点',
	about3: '如何使用',
	about4: '联系我们',
};


export default function About() {
	return (
		<>
			<ScrollSections sectionIds={sectionIds}>
				<div className="min-h-screen bg-gradient-to-b from-custom6 to-purple-500">
					<AboutVision />
					<AboutFeatures />
					<HowToUse />
					<ContactUs />
					<BottomNavigation sectionIds={sectionIds} idTextMap={idTextMap} />
					<NavigationButtons
						items={navItems}
						mappingFunction={(name) => idToUrlMap[name]}
					/>
				</div>
			</ScrollSections>
		</>
	);
}

const AboutVision = () => {
	return (
		<section id="about1" className="flex items-center justify-center h-screen">
			<div className="max-w-6xl mx-auto px-4 py-16 text-center">
				<h1 className="text-5xl font-bold mb-8 text-custom0 hover:scale-110">我们的愿景</h1>
				<p className="text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
					我们的愿景是通过科技赋能，让每个人都能轻松管理自己的健康。我们相信，通过提供易于使用的工具和资源，人们可以更加主动地参与到自己健康的管理中来。
				</p>
				<div className="flex gap-4 justify-center">
					<a href="#about4" className="inline-block px-4 py-3 mt-4 rounded-md bg-custom0 text-white font-medium text-lg hover:scale-[1.05] transition duration-300 ease-in-out animate-pulse">
						加入我们
					</a>
				</div>
			</div>
		</section>
	);
};


const AboutFeatures = () => {
	const features = [
		{
			title: '个性化健康评估',
			description: '通过问卷调查和数据分析，为用户提供个性化的健康评估。',
		},
		{
			title: '定制化健康计划',
			description: '根据评估结果，系统会生成一份定制化的健康计划。',
		},
		{
			title: '专业健康指导',
			description: '我们的专家团队将为您提供专业的健康指导和建议。',
		},
		// ...可以继续添加更多特性项
	];

	return (
		<section id="about2" className="flex items-center justify-center h-screen">
			<div className="container text-center mx-auto">
				<h2 className="text-center text-5xl font-bold pb-6 mb-10 hover:scale-110">系统特点</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<div key={index} className="feature-item rounded-lg shadow-md p-6 transform transition hover:scale-110 duration-300 ease-in-out">
							<h3 className="text-xl font-medium mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};



// StepCard.js
const StepCard = ({ stepNumber, title, description }) => {
	return (
		<div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-3xl transform hover:scale-105 duration-300 ease-in-out">
			<span className="text-lg text-costom0 font-medium">Step {stepNumber}</span>
			<h3 className="text-xl font-bold my-2"> {title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
};

// HowToUse.js
const HowToUse = () => {
	const steps = [
		{
			stepNumber: 1,
			title: '注册账户',
			description: '创建您的个人账户，开始管理您的健康之旅。',
		},
		{
			stepNumber: 2,
			title: '完成健康评估',
			description: '通过我们的简短问卷，让我们了解您的健康状况。',
		},
		{
			stepNumber: 3,
			title: '查看健康计划',
			description: '根据您的评估结果，我们将为您定制个性化的健康计划。',
		},
		{
			stepNumber: 4,
			title: '开始跟踪进度',
			description: '使用我们的跟踪工具记录您的健康数据，见证您的进步。',
		},
		{
			stepNumber: 5,
			title: '参与社区交流',
			description: '加入我们的健康社区，分享经验，互相学习和支持。',
		},
	];

	return (
		<section id="about3" className="flex items-center justify-center h-screen">
			<div className="max-w-6xl mx-auto px-4 py-8 text-center">
				<h2 className=" uppercaes text-5xl font-bold mb-8 pb-5 hover:scale-110">如何使用我们的系统</h2>
				<div className="mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{steps.map((step, index) => (
						<StepCard key={index} {...step} />
					))}
				</div>
			</div>
		</section>
	);
};

const ContactUs = () => {
	// 定义联系信息数组
	const contactInfo = [
		{
			title: '电子邮件',
			detail: 'support@health管理系统.com',
			link: 'mailto:support@health管理系统.com',
		},
		{
			title: '客服热线',
			detail: '123-456-7890',
			link: 'tel:123-456-7890',
		},
		{
			title: '访问我们的网站',
			detail: 'www.健康管理系统.com',
			link: 'http://www.健康管理系统.com',
		},
		// ...可以添加更多的联系信息
	];


	// 遍历联系信息数组并生成联系卡片
	const contactCards = contactInfo.map((item, index) => (
		<div key={index} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:shadow-xl hover:transform hover:scale-105">
			<div className="flex flex-col h-full text-center gap-4">
				<h3 className="text-2xl font-bold mb-2 ">{item.title}</h3>
				<a href={item.link} className="text-blue-700 hover:text-blue-900 focus:outline-none">
					<span className="flex-1">{item.detail}</span>
				</a>
				<div className="mt-2">
					<a href={item.link} className="text-green-700 font-bold hover:text-blue-900 focus:outline-none">
						<span className="cursor-pointer">了解更多</span>
					</a>
				</div>
			</div>
		</div>
	));

	return (
		<section id="about4" className="min-h-screen flex items-center justify-center">
			<div className="max-w-6xl mx-auto">
				<h2 className=" uppercaes text-5xl font-bold text-center hover:scale-110 pb-5 mb-10">联系我们</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{contactCards}
				</div>
			</div>
		</section>
	);
};
