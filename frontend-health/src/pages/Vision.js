import React, { useState, useEffect } from 'react';
import { Title, RecordForm, FetchDataTable } from "../components/Pages"

const visionData = [
	{ id: 1, name: '张三', left_eye: 5.0, right_eye: 5.0 },
	{ id: 2, name: '李四', left_eye: 4.5, right_eye: 4.5 },
	{ id: 3, name: '王五', left_eye: 4.0, right_eye: 4.0 },
	// More records can be added here...
]
const visionLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	left_eye: '左眼视力',
	right_eye: '右眼视力',
	recorded_at: '记录时间',
}


export default function Vision() {

	const [eyesightRecords, setEyesightRecords] = useState(visionData);

	// 定义新记录对象
	const initialRecord = { id: 0, name: '', left_eye: 0.0, right_eye: 0.0 }

	return (
		<div className="animate__animated animate__fadeInDown ">
			<Title text="视力" />
			<FetchDataTable api="vision" textLabels={visionLabels} />
			<RecordForm api="vision" initialRecord={initialRecord} records={eyesightRecords} setRecords={setEyesightRecords} textLabels={visionLabels} />
		</div>
	)

}

