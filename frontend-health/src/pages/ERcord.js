import React, { useState, useEffect } from 'react';
import { Title, RecordForm, FetchDataTable } from "../components/Pages"

const bloodSugarData = [
	{ id: 1, name: '张三', value: 5.0 },
	{ id: 2, name: '李四', value: 8.0 },
	{ id: 3, name: '王五', value: 14.3 },
	// More records can be added here...
]
const bloodSugarLabels = {
	id: 'ID',
	user_id: "用户ID",
	name: '姓名',
	value: '值 mmol/L',
	status: '血糖状态',
	recorded_at: '记录时间',
}


export default function ERcord() {

	const [bloodSugarRecords, setBloodSugarRecords] = useState(bloodSugarData);

	// 定义新记录对象
	const initialRecord = { id: 0, name: '', value: 7.0 }

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="血糖" />
			<FetchDataTable api="bloodSugar" textLabels={bloodSugarLabels} />
			<RecordForm api="bloodSugar" initialRecord={initialRecord} records={bloodSugarRecords} setRecords={setBloodSugarRecords} textLabels={bloodSugarLabels} />
		</div>
	)

}

