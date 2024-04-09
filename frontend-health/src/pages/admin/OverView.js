
import React, { useContext } from 'react';
import ReactEcharts from 'echarts-for-react';
import { chartData } from './ChartData'
import { ScrollSections, BottomNavigation, navItems, idToUrlMap, NavigationButtons } from '../../components/Section'

const sectionIds = ['overView1', 'overView2', 'overView3', 'overView4'];
const idTextMap = {
	about1: '系统概览',
	about2: '健康事件处理趋势',
	about3: '最新健康提示',
	about4: '联系我们',
};
export const OverView = () => {
	return (
		<div className="container mx-auto p-4">
			<div className="grid gap-4">
				{/* 统计信息卡片 */}
				<div className="mt-8">
					<h2 className="title2">系统概览</h2>
				</div>
			</div>
			<CardsList data={statsData} />
			{/* 健康事件处理趋势图表 */}
			<div className="mt-3">
				<h2 className="title2 mt-8">健康事件处理趋势</h2>
				<Chart />
			</div>
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4 text-center">最新健康提示</h2>
				<LatestHealthTips />
			</div>
		</div>


	);
};

const LatestHealthTips = () => {
	return (
		<div className="bg-yellow-200 p-4 rounded-lg shadow-md flex justify-center items-center">
			<p className="text-gray-800 text-sm">保持适当的运动和健康的饮食是维持健康的关键。</p>
			<button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400 ml-4">了解更多</button>
		</div>
	);
};

const statsData = [
	{ title: '用户总数', value: '5,200', backgroundColor: 'blue' },
	{ title: '本周新增用户', value: '120', backgroundColor: 'green' },
	{ title: '今日活跃用户', value: '3,500', backgroundColor: 'yellow' },
	// 更多统计数据...  
];
const CardsList = ({ data }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{data.map((item, index) => (
				<Card key={index} title={item.title} value={item.value} backgroundColor={item.backgroundColor} />
			))}
		</div>
	);
};

const Card = ({ title, value, backgroundColor }) => {
	const cardStyle = `bg-${backgroundColor}-500 text-white p-6 rounded-lg shadow-md`;
	return (
		<div className={cardStyle}>
			<h3 className="text-xl font-bold">{title}</h3>
			<p className="text-2xl">{value}</p>
		</div>
	);
};
const Card1 = ({ title, value, cardCss, animateClass }) => {
	const cardStyle = `cardCss text-white p-6 rounded-lg shadow-md`;
	return (<div className={`${cardStyle} ${animateClass || ''}`}>
		<h3 className="text-xl font-bold">{title}</h3>
		<p className="text-2xl">{value}</p>
	</div>);
}




const Chart = () => {
	// 在这里设置ECharts选项
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		legend: {
			data: [chartData.datasets[0].label],
		},
		xAxis: {
			type: 'category',
			data: chartData.labels,
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: chartData.datasets[0].label,
				type: 'line',
				data: chartData.datasets[0].data,
				itemStyle: {
					normal: {
						color: chartData.datasets[0].borderColor,
					},
				},
				areaStyle: {},
			},
		],
	};

	return (
		<div className="p-4">
			<ReactEcharts
				option={option}
				style={{ height: '300px', width: '100%' }}
				className="rounded-lg shadow-md"
			/>
		</div>
	);
};
