import React, { useState, useEffect } from 'react';
import { PageForm, Title } from "../components/Pages"
import { MenuBtn2 } from "../components/Btn"

// 健身记录
const data = [
	{ id: 1, name: '张三', sport: 1, duration: 1, },
	{ id: 2, name: '李四', sport: 2, duration: 1, },
	{ id: 3, name: '王五', sport: 3, duration: 2, },
	// More records can be added here...
]
const initData =
	{ id: 0, name: '', sport: 1, duration: 1 }
const textLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	sport: '运动种类',
	duration: '运动时间',
	exercise_type: '运动类型',
	calories: '消耗卡路里量 卡',
	recorded_at: '记录时间',
}



const form = [
	{ current: 'ERecord', api: 'eRecord', title: '健身记录', label: "查看健身记录" },
];

export default function ERecord() {
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
