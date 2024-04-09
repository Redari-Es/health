import React, { useState, useEffect } from 'react';
import { Title, PageForm } from "../components/Pages"

const data = [
	{ id: 1, name: '张三', left_eye: 5.0, right_eye: 5.0 },
	{ id: 2, name: '李四', left_eye: 4.5, right_eye: 4.5 },
	{ id: 3, name: '王五', left_eye: 4.0, right_eye: 4.0 },
	// More records can be added here...
]
const textLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	left_eye: '左眼视力',
	right_eye: '右眼视力',
	recorded_at: '记录时间',
}

const initData = { id: 0, name: '', left_eye: 0.0, right_eye: 0.0 }

const form = [
	{ current: 'Vision', api: 'vision', title: '视力', label: "查看视力", textLabels: "visionLabels" },
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


