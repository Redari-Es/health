import React from 'react';
import ReactEcharts from 'echarts-for-react';

/*
const HeartRateChart = () => {
	const getOption = () => {
		// 在这里设置ECharts选项
		const option = {
			title: {
				text: '心率折线图',
			},
			xAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {
				type: 'value',
			},
			series: [{
				data: [120, 130, 125, 140, 135, 130, 125],
				type: 'line',
				smooth: true,
			}],
		};
		return option;
	};

	return (
		<ReactEcharts option={getOption()} />
	);
};
*/



const HeartRateChart = () => {
	// 定义图表数据

	const chartData = {
		xAxis: {
			type: 'category',
			data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [72, 75, 70, 68, 73, 77, 74, 71, 76, 73, 72, 75, 70, 69],
			type: 'line'
		}]
	};

	// ECharts 配置项
	const option = {
		color: '#f77',
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: chartData.xAxis,
		yAxis: chartData.yAxis,
		series: chartData.series
	};

	return (
		<div className="flex justify-center items-center h-96 w-full">
			<ReactEcharts
				option={option}
				style={{ height: '100%', width: '100%' }}
				className="rounded-lg shadow"
			/>
		</div>
	);
};

export default HeartRateChart;

export function Rates() {
	const getOption = () => {
		let option = {
			title: {
				text: 'Stacked Line'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: 'Email',
					type: 'line',
					stack: 'Total',
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: 'Union Ads',
					type: 'line',
					stack: 'Total',
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: 'Video Ads',
					type: 'line',
					stack: 'Total',
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: 'Direct',
					type: 'line',
					stack: 'Total',
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: 'Search Engine',
					type: 'line',
					stack: 'Total',
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}
			]

		}
		return option
	}
	return (
		<div className="flex justify-center items-center h-96 w-full">
			<ReactEcharts
				option={getOption()}
				style={{ height: '100%', width: '100%' }}
				className="rounded-lg shadow"
			/>
		</div>
	)

}


