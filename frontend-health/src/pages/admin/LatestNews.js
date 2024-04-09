
import React from 'react';

export const newsList = [
	{
		type: '系统更新',
		message: '我们刚刚发布了新的系统版本，包含多项性能改进。',
		color: 'blue'
	},
	{
		type: '重要通知',
		message: '请注意，下周一将进行系统维护，届时服务可能会暂时中断。',
		color: 'green'
	},
	{
		type: '紧急健康警告',
		message: '由于近期流感疫情，请大家注意个人卫生，如有不适请及时就医。',
		color: 'red'
	},
	// ... 更多消息
];

export const LatestNews = ({ newsList }) => {
	return (
		<section className="flex flex-col items-center justify-center h-sreen pt-8 p-4 bg-white rounded-lg shadow-md space-y-4">
			<div className="max-w-md">
				<h2 className="text-xl font-semibold mb-4">最新消息</h2>
				{newsList.map((newsItem, index) => (
					<div key={index} className={`border-l-4 pl-4 py-2 border-${newsItem.color}-500 bg-${newsItem.color}-100 text-${newsItem.color}-800`}>
						<strong className={`text-${newsItem.color}-700`}>{newsItem.type}:</strong> {newsItem.message}
					</div>
				))}
			</div>
		</section>
	);
};
