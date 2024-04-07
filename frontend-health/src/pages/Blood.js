import React, { useState, useEffect } from 'react';
import { PageForm, Title } from "../components/Pages"
import { MenuBtn2 } from "../components/Btn"

// 血糖
const bloodSugarData = [
	{ id: 1, name: '张三', value: 5.0 },
	{ id: 2, name: '李四', value: 8.0 },
	{ id: 3, name: '王五', value: 14.3 },
	// More records can be added here...
]
const initSugarData =
	{ id: 0, name: '', value: 0.0, }
const bloodSugarLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	value: '值 mmol/L',
	status: '血糖状态',
	recorded_at: '记录时间',
}
const initPressureData =
	{ id: 0, name: '', systolic: 0, diastolic: 0, pulse: 0 }

// 血压
const bloodPressureData = [
	{ id: 1, name: '张三', systolic: 120, diastolic: 60, pulse: 60 },
	{ id: 2, name: '李四', systolic: 110, diastolic: 80, pulse: 70 },
	{ id: 3, name: '王五', systolic: 150, diastolic: 50, pulse: 50 },
	// More records can be added here...
]
const bloodPressureLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	systolic: '收缩压 mmHg',
	diastolic: '舒张压 mmHg',
	pulse: '脉搏 次/分',
	status: '血压状态',
	recorded_at: '记录时间',
}
const form = {
	Sugar: ["血糖", "查看血糖"],
	Pressure: ["血压", '查看血压'],
}
const form2 = [
	{ current: 'Sugar', title: '血糖', label: "查看血糖" },
	{ current: 'Pressure', title: '血压', label: "查看血压" },
];


export default function Blood() {
	const [currentForm, setCurrentForm] = useState("Sugar");
	const [title, setTitle] = useState(form[currentForm])
	const toggleForm = (formName) => {
		setCurrentForm(formName);
		setTitle(form[formName][0]);
	};



	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text={title} />
			<MenuBtn2 Menu={form} current={currentForm} onClick={toggleForm} />
			{
				currentForm === "Sugar" &&
				<PageForm api='bloodSugar' textLabels={bloodSugarLabels} initData={initSugarData} data={bloodSugarData} />
			}
			{
				currentForm === "Pressure" &&
				<PageForm api='bloodPressure' textLabels={bloodPressureLabels} initData={initPressureData} data={bloodPressureData} />
			}
		</div >
	);
}

