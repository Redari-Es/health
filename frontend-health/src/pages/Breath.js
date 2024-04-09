import React, { useState, useEffect } from 'react';
import { PageForm, Title } from "../components/Pages"
import { MenuBtn2 } from "../components/Btn"

// 呼吸记录
const data = [
	{ id: 1, name: '张三', respiratory_rate: 20 },
	{ id: 2, name: '李四', respiratory_rate: 50 },
	{ id: 3, name: '王五', respiratory_rate: 20 },
	// More records can be added here...
]
const initData =
	{ id: 0, name: '', respiratory: 20 }
const textLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	respiratory_rate: '呼吸 次/分',
	recorded_at: '记录时间',
}

const form = [
	{ current: 'Breath', api: 'breath', title: '呼吸', label: "查看呼吸", textLabels: "breathLabels" },
];

export default function Breath() {
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
