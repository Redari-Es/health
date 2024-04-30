import React, { useState, useEffect } from 'react';
import { PageForm, Title } from "../components/Pages"
import { MenuBtn2 } from "../components/Btn"

// 呼吸记录
const data = [
	{ id: 1, name: '张三', height: 120, weight: 120, waist: 40, hip: 50, chest: 40, blood_type: "A" },
	{ id: 2, name: '张三', height: 190, weight: 110, waist: 50, hip: 90, chest: 80, blood_type: "B" },
	{ id: 3, name: '张三', height: 170, weight: 170, waist: 49, hip: 70, chest: 60, blood_type: "O" },
	// More records can be added here...
]
const initData =
	{ id: 0, name: '', height: 170, weight: 170, waist: 49, hip: 70, chest: 60, blood_type: "O" }
const textLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	height: '身高cm',
	weight: '体重kg',
	bmi: "BMI值",
	bmi_status: "质量状态",
	waist: '腰围',
	hip: '臀围',
	chest: '胸围',
	blood: '血型',
	blood_type: '血型',
	recorded_at: '记录时间',
}

const form = [
	{ current: 'BodyInfo', api: 'bodyInfo', title: '身体数据', label: "查看身体", textLabels: "bodyInfoLabels" },
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
