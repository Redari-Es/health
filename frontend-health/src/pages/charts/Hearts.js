import React, { useContext } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Themes } from "../../layouts/States";
/*
const Chart = () => {
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



//箱型图数据
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const textColor0 = "#f9a647"

// 定义时间单位的范围
const timeUnits = {
	hour: { count: 60, format: 'm' }, // 表示一个小时内的分钟
	day: { count: 24, format: 'H' }, // 表示一天内的小时
	week: { count: 7, format: 'd' }, // 表示一周内的天
	month: { count: 31, format: 'D' }, // 表示一个月内的天，简化处理为30天
	year: { count: 12, format: 'Y' }, // 表示一个月内的天，简化处理为30天
	// 可以继续添加其他时间单位
};

// 静息心率表
export const Rhr = () => {
	var option = {
		title: {
			text: '静息心率表',
			textStyle: {
				color: textColor0
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
		},
		legend: {
			data: ['静息心率']
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
			boundaryGap: true,
			data: [],
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [
			{
				name: '静息心率',
				type: 'line',
				symbol: 'emptyCircle',
				symbolSize: 8,
				stack: 'Total',
				data: [],
				lineStyle: {
					color: 'red'
				}
			},
		]
	}

	const { currentETheme, timeUnit } = useContext(Themes)
	// 准备箱型图数据
	// 根据不同的时间单位生成数据和x轴标签
	const generateChartData = (unit) => {
		const data = [];
		const xAxisData = [];
		const unitInfo = timeUnits[unit];

		for (let i = 1; i <= unitInfo.count; i++) {
			const value =
				getRandomInt(30, 100) // 最小值
			let label;
			switch (unit) {
				case 'hour':
					label = `${i}`; // 分钟
					break;
				case 'day':
					label = `${i}`; // 小时
					break;
				case 'week':
					label = `Day ${i}`; // 天
					break;
				case 'month':
					label = `Day ${i}`; // 月份中的天
					break;
				case 'year':
					label = `Month ${i}`; // 月份中的天
					break;
				default:
					label = `${i}`;
			}
			data.push({ name: label, value });
			xAxisData.push(label);
		}

		option.xAxis.data = xAxisData;
		option.series[0].data = data.map(item => item.value);
	};
	generateChartData(timeUnit);

	return (
		<>
			<div className="flex justify-center items-center h-96 w-full">
				<ReactEcharts
					option={option}
					theme={currentETheme}
					style={{ height: '100%', width: '100%' }}
					className="rounded-lg shadow pt-1"
				/>
			</div>
		</>
	)
}
// 心率变异性表
export const Hrv = () => {
	var option = {
		title: {
			text: '心率变异性表',
			textStyle: {
				color: textColor0
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
		},
		legend: {
			data: ['心率变异性']
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
			boundaryGap: true,
			data: [],
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [
			{
				name: '心率变异性',
				type: 'line',
				symbol: 'emptyCircle',
				symbolSize: 8,
				// stack: 'Total',
				// smooth: 'false',
				data: [],
				lineStyle: {
					color: 'red'
				}
			},
		]

	}

	const { currentETheme, timeUnit } = useContext(Themes)
	// 准备箱型图数据
	// 根据不同的时间单位生成数据和x轴标签
	const generateChartData = (unit) => {
		const data = [];
		const xAxisData = [];
		const unitInfo = timeUnits[unit];

		for (let i = 1; i <= unitInfo.count; i++) {
			const value =
				getRandomInt(30, 200) // 最小值
			let label;
			switch (unit) {
				case 'hour':
					label = `${i}`; // 分钟
					break;
				case 'day':
					label = `${i}`; // 小时
					break;
				case 'week':
					label = `Day ${i}`; // 天
					break;
				case 'month':
					label = `Day ${i}`; // 月份中的天
					break;
				case 'year':
					label = `Month ${i}`; // 月份中的天
					break;
				default:
					label = `${i}`;
			}
			data.push({ name: label, value });
			xAxisData.push(label);
		}

		option.xAxis.data = xAxisData;
		option.series[0].data = data.map(item => item.value);
	};
	generateChartData(timeUnit);

	return (
		<>
			<div className="flex justify-center items-center h-96 w-full">
				<ReactEcharts
					option={option}
					theme={currentETheme}
					style={{ height: '100%', width: '100%' }}
					className="rounded-lg shadow pt-1"
				/>
			</div>
		</>
	)
}

// 心率表
export const Rates = () => {
	var option = {
		title: {
			text: '心率表',
			textStyle: {
				color: textColor0
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
		},
		legend: {
			data: ['心率', '静息心率', '心率变异性']
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
			boundaryGap: true,
			data: [],
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [
			{
				name: '心率',
				type: 'line',
				symbol: 'emptyCircle', // 设置为空心圆点
				symbolSize: 8, // 设置点的大小
				data: [],
				lineStyle: {
					color: 'red'
				}
			},
			{
				name: '静息心率',
				type: 'line',
				symbol: 'emptyCircle', // 设置为空心圆点
				symbolSize: 8, // 设置点的大小
				data: [],
				lineStyle: {
					color: '#f9a647'
				}
			},
			{
				name: '心率变异性',
				type: 'line',
				symbol: 'emptyCircle', // 设置为空心圆点
				symbolSize: 8, // 设置点的大小
				data: [],
				lineStyle: {
					color: 'blue'
				}
			},
		]
	}
	const { currentETheme, timeUnit } = useContext(Themes)
	// 根据不同的时间单位生成数据和x轴标签
	const generateChartData = (unit) => {
		const data = [];
		const xAxisData = [];
		const unitInfo = timeUnits[unit];


		for (let i = 1; i <= unitInfo.count; i++) {
			const hr = getRandomInt(30, 200); // 心率数据
			const rhr = getRandomInt(30, 120); // 静息心率数据
			const hrv = getRandomInt(30, 200); // 心率变异性数据			
			let label;
			switch (unit) {
				case 'hour':
					label = `${i}`; // 分钟
					break;
				case 'day':
					label = `${i}`; // 小时
					break;
				case 'week':
					label = `Day ${i}`; // 天
					break;
				case 'month':
					label = `Day ${i}`; // 月份中的天
					break;
				case 'year':
					label = `Month ${i}`; // 月份中的天
					break;
				default:
					label = `${i}`;
			}
			// 更新对应的数据系列
			option.series[0].data.push({ name: label, value: hr });
			option.series[1].data.push({ name: label, value: rhr });
			option.series[2].data.push({ name: label, value: hrv });
			xAxisData.push(label);
		}

		option.xAxis.data = xAxisData;
	};
	generateChartData(timeUnit);

	return (
		<>
			<div className="flex justify-center items-center h-96 w-full">
				<ReactEcharts
					option={option}
					theme={currentETheme}
					style={{ height: '100%', width: '100%' }}
					className="rounded-lg shadow pt-1"
				/>
			</div>
		</>
	)
}


// 子组件 Heart
export const Heart = () => {

	// 设置图表配置项
	var option = {
		title: {
			text: '心率范围',
			textStyle: {
				color: textColor0
			}
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
			formatter: function(params) {
				const data = params[0].data;
				const time = params[0].name;
				const min = data[1];
				const max = data[5];
				const q1 = data[2];
				const q3 = data[4];
				return `<div class="text-base">范围<br/>
					<span class="font-bold">${q1} - ${q3}</span> 次/分<br/>
					时间：${time}<br/>
					</div>
				`;
			}
		},
		xAxis: {
			type: 'category',
			name: '',
			boundaryGap: true,
			nameGap: 30,
			data: []
			// data: Array.from({ length: 60 }, (_, i) => (i + 1) + '分钟') // 生成每分钟的时间标签
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [{
			type: 'boxplot',
			data: [],
			datasetIndex: 0,
			outliers: [],
			itemStyle: {
				color: 'red', // 盒子颜色设置为透明
				borderWidth: 0,
				borderColor: 'red', // 盒子边框颜色设置为红色
			},
			emphasis: {
				itemStyle: {
					focus: 'none',
					borderWidth: 0, // 强调时隐藏盒须
				}
			}
		}]
	};
	const { currentETheme, timeUnit } = useContext(Themes)
	// 准备箱型图数据
	// 根据不同的时间单位生成数据和x轴标签
	const generateChartData = (unit) => {
		const data = [];
		const xAxisData = [];
		const unitInfo = timeUnits[unit];

		for (let i = 1; i <= unitInfo.count; i++) {
			const value = [
				getRandomInt(30, 200), // 最小值
				getRandomInt(30, 170), // 第一四分位数
				getRandomInt(30, 200), // 中位数
				getRandomInt(30, 170), // 第三四分位数
				getRandomInt(30, 200)  // 最大值
			];
			let label;
			switch (unit) {
				case 'hour':
					label = `${i}`; // 分钟
					break;
				case 'day':
					label = `${i}`; // 小时
					break;
				case 'week':
					label = `Day ${i}`; // 天
					break;
				case 'month':
					label = `Day ${i}`; // 月份中的天
					break;
				case 'year':
					label = `Month ${i}`; // 月份中的天
					break;
				default:
					label = `${i}`;
			}
			data.push({ name: label, value });
			xAxisData.push(label);
		}

		option.xAxis.data = xAxisData;
		option.series[0].data = data.map(item => item.value);
	};
	generateChartData(timeUnit);


	return (
		<div className="flex justify-center items-center h-96 w-full">
			<ReactEcharts
				option={option}
				theme={currentETheme}
				style={{ height: '100%', width: '100%' }}
				className="rounded-lg shadow pt-1"
			/>
		</div>
	);
};



/*
const themes = {
	light: '亮色模式',
	dark: '深色模式'
}
// 该用于获取用户最后的测试 目前数据随机
// 让min和max替换成q1和q3
const Heart = () => {
	// 定义状态来切换主题
	const [currentTheme, setCurrentTheme] = useState('dark'); // 默认为亮色主题

	const toggleTheme = () => {
		const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
		setCurrentTheme(nextTheme);
	};

	const themeDescription = themes[currentTheme]; // 获取当前主题的描述
	// 准备箱型图数据
	// const data = [
	// 	{ name: '1分钟', value: [60, 70, 80, 90, 100] }, // 示例数据，替换为您的实际数据
	// ];
	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const data = [];
	for (let i = 1; i <= 60; i++) {
		const value = [getRandomInt(30, 200), getRandomInt(30, 170), getRandomInt(30, 200), getRandomInt(30, 170), getRandomInt(30, 200)];
		data.push({ name: `${i}`, value });
	}
	// 设置图表配置项
	var option = {
		title: {
			text: '每小时心率范围'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
			formatter: function(params) {
				const data = params[0].data;
				const time = params[0].name;
				const min = data[1];
				const max = data[5];
				const q1 = data[2];
				const q3 = data[4];
				return `<div class="text-base">范围<br/>
					<span class="font-bold">${q1} - ${q3}</span> 次/分<br/>
					时间：${time}分钟<br/>
					</div>
				`;
			}
		},
		xAxis: {
			type: 'category',
			name: '分钟',
			boundaryGap: true,
			nameGap: 30,
			data: Array.from({ length: 60 }, (_, i) => (i + 1)) // 生成每分钟的时间标签
			// data: Array.from({ length: 60 }, (_, i) => (i + 1) + '分钟') // 生成每分钟的时间标签
		},
		yAxis: {
			type: 'value',
			name: '心率范围',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [{
			type: 'boxplot',
			data: data.map(item => item.value),
			datasetIndex: 0,
			outliers: [],
			itemStyle: {
				color: 'red', // 盒子颜色设置为透明
				borderWidth: 0,
				borderColor: 'red', // 盒子边框颜色设置为红色
			},
			emphasis: {
				itemStyle: {
					focus: 'none',
					borderWidth: 0, // 强调时隐藏盒须
				}
			}
		}]
	};
	return (
		<>
			<button className='text-white  bg-custom0 min-w-20 rounded-lg' onClick={toggleTheme}>{themeDescription}</button>
			<div className="flex justify-center items-center h-96 w-full">
				<ReactEcharts
					option={option}
					theme={currentTheme}
					style={{ height: '100%', width: '100%' }}
					className="rounded-lg shadow pt-1"
				/>
			</div>
		</>
	);
};
*/


const Hearts = () => {
	// 模拟生成一小时内的心率数据，假设每分钟有 60 个数据点
	const heartRates = [];
	for (let i = 0; i < 60; i++) {
		// 模拟生成每分钟的心率数据，这里使用随机数
		const minuteData = [];
		for (let j = 0; j < 100; j++) {
			// 生成每分钟内的 100 个心率数据点
			// minuteData.push(Math.floor(Math.random() * 61) + 60); // 假设心率范围在 60 到 120 之间
			// minuteData.push(Math.floor(Math.random() * (200 - 30 + 1)) + 30); // 心率范围在 30 到 200 之间
			minuteData.push(Math.floor(Math.random() * (200 - 30 + 1)) + 30); // 心率范围在 30 到 200 之间
		}
		heartRates.push(minuteData);
	}

	// 统计每分钟心率数据的最大值、最小值、中位数、上四分位数和下四分位数
	const boxplotData = heartRates.map(minuteData => {
		minuteData.sort((a, b) => a - b); // 将数据排序
		const n = minuteData.length;
		const min = minuteData[0]; // 最小值
		const max = minuteData[n - 1]; // 最大值
		const medianIndex = n % 2 === 0 ? (n / 2 - 1) : Math.floor(n / 2); // 中位数索引
		const q1Index = n % 4 === 0 ? (n / 4 - 1) : Math.floor(n / 4); // 下四分位数索引
		const q3Index = n % 4 === 0 ? (3 * n / 4 - 1) : Math.floor(3 * n / 4); // 上四分位数索引
		const median = minuteData[medianIndex]; // 中位数
		const q1 = minuteData[q1Index]; // 下四分位数
		const q3 = minuteData[q3Index]; // 上四分位数
		return [min, q1, median, q3, max].map(value => Math.ceil(value)); // 确保心脏跳动次数为整数
	});
	const datas = [
		{ name: '' }
	]
	//测试

	// 使用 console.table 输出数组中的每个子数组
	console.table(boxplotData);

	// 查看特定索引处的子数组内容
	// console.log("Data at index 2:", boxplotData[2]);

	// 设置图表配置项
	var option = {
		title: {
			text: '每小时心率范围'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'blue'
				}
			},
			formatter: function(params) {
				const data = params[0].data;
				const time = params[0].name;
				const min = data[1];
				const max = data[5];
				const q1 = data[2];
				const q3 = data[4];
				return `<div class="text-base">范围<br/>
					<span class="font-bold">${q1} - ${q3}</span> 次/分<br/>
					时间：${time}<br/>
					</div>
				`;
			}
		},
		xAxis: {
			type: 'category',
			data: Array.from({ length: 60 }, (_, i) => (i + 1) + '分钟') // 生成每分钟的时间标签
		},
		yAxis: {
			type: 'value',
			name: '心率',
			min: 0,
			max: 200 // 根据实际情况设置心率范围的最大值
		},
		series: [{
			type: 'boxplot',
			data: boxplotData,
			itemStyle: {
				color: 'red', // 盒子颜色设置为透明
				borderWidth: 0,
				borderType: 'solid',
				borderCap: 'round',
				borderJoin: 'round',
				borderColor: 'red', // 盒子边框颜色设置为红色
			},
			emphasis: {
				itemStyle: {
					focus: 'none',
					borderWidth: 0, // 强调时隐藏盒须
				}
			}
		}]
	};
	return (
		<div className="flex justify-center items-center h-96 w-full" >
			<ReactEcharts
				option={option}
				style={{ height: '100%', width: '100%' }}
				className="rounded-lg shadow"
			/>
		</div >
	);
};



