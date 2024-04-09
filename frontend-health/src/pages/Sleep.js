import React, { useState, useEffect } from 'react';
import { PageForm, Title } from "../components/Pages"
import { MenuBtn2 } from "../components/Btn"

// 健身记录
const data = [
	{ id: 1, name: '张三', start_time: "2024-04-08 22:22:22", end_time: "2024-04-08 22:33:22", duration: 500, quality: 1 },
	{ id: 2, name: '张三', start_time: "2024-04-08 22:22:22", end_time: "2024-04-08 22:33:22", duration: 500, quality: 2 },
	{ id: 3, name: '张三', start_time: "2024-04-08 22:22:22", end_time: "2024-04-08 22:33:22", duration: 500, quality: 3 },
	// More records can be added here...
]
const initData =
	{ id: 0, name: 'ShonH', start_time: "2024-04-08 22:22:22", end_time: "2024-04-08 22:33:22", duration: 500, quality: 1 }
const textLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	start_time: '开始时间',
	end_time: '结束时间',
	duration: '持续时间 分钟',
	quality: '睡眠质量状态',
	quality_des: '睡眠质量描述',
	recorded_at: '记录时间',
}



const form = [
	{ current: 'Sleep', api: 'sleep', title: '睡眠记录', label: "查看睡眠记录" },
];

export default function Sleep() {
	const [currentForm, setCurrentForm] = useState(0); // 初始表单索引

	const toggleForm = (formIndex) => {
		setCurrentForm(formIndex);
	};

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text={form[currentForm].title} /> {/* 获取当前表单的标题 */}
			<PageForm api={form[currentForm].api} textLabels={textLabels} initData={initData} data={data} />
		</div>
	);
}
