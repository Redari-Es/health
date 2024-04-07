import React, { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile'
import { Title } from "../components/Pages"
import { getVision } from "../databus/FrontApi"


export default function Vision() {

	return (
		<div className="animate__animated animate__fadeInDown">
			<Title text="视力" />
			<UserProfile />
			<VisionTable />
			<EyesightTable2 />
		</div>
	)

}

export function VisionTable() {
	const [visionData, setVisionData] = useState([]);

	useEffect(() => {
		const fetchVisionData = async () => {
			try {
				const response = await fetch('http://127.0.0.1:5001/api/vision');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				console.log("success:", data)
				setVisionData(data);
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchVisionData();
	}, []); // Empty dependency array to ensure effect only runs once


	return (
		<div className="container mx-auto px-4 py-8">
			<table className="min-w-full table-auto">
				<thead>
					<tr>
						<th className="border px-4 py-2">索引</th>
						<th className="border px-4 py-2">用户ID</th>
						<th className="border px-4 py-2">左眼视力</th>
						<th className="border px-4 py-2">右眼视力</th>
						<th className="border px-4 py-2">记录时间</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{visionData.map((record) => (
						<tr key={record.id}>
							<td className="border px-4 py-2">{record.id}</td>
							<td className="border px-4 py-2">{record.user_id}</td>
							<td className="border px-4 py-2">{record.left_eye}</td>
							<td className="border px-4 py-2">{record.right_eye}</td>
							<td className="border px-4 py-2">{record.recorded_at}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}


export function EyesightTable() {
	const [eyesightRecords, setEyesightRecords] = useState([
		{ id: 1, name: '张三', left_eye: '5.0', right_eye: '5.0' },
		{ id: 2, name: '李四', left_eye: '4.5', right_eye: '4.5' },
		{ id: 3, name: '王五', left_eye: '4.0', right_eye: '4.0' },
		// 添加更多的记录...
	]);

	const [editingRecord, setEditingRecord] = useState(null);
	const [editingRecordId, setEditingRecordId] = useState(null);
	const addRecord = () => {
		const newId = eyesightRecords.length + 1;
		const newRecord = { id: newId, name: '', left_eye: '', right_eye: '' };
		setEyesightRecords([...eyesightRecords, newRecord]);
		setEditingRecordId(newId);
	};

	const deleteRecord = (id) => {
		setEyesightRecords(eyesightRecords.filter(record => record.id !== id));
	};

	const modifyRecord = (record) => {
		setEditingRecord(record);
	};

	const submitRecord = (id) => {
		const updatedRecords = eyesightRecords.map(record =>
			record.id === id ? editingRecord : record
		);
		setEyesightRecords(updatedRecords);
		setEditingRecord(null);
	};

	const handleInputChange = (e, field) => {
		const value = e.target.value;
		setEditingRecord(prevState => ({
			...prevState,
			[field]: value
		}));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
				onClick={addRecord}
			>
				添加记录
			</button>
			<table className="min-w-full table-auto">
				<thead>
					<tr>
						<th className="border px-4 py-2">索引</th>
						<th className="border px-4 py-2">姓名</th>
						<th className="border px-4 py-2">左眼视力</th>
						<th className="border px-4 py-2">右眼视力</th>
						<th className="border px-4 py-2">操作</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{eyesightRecords.map(record => (
						<tr key={record.id}>
							<td className="border px-4 py-2">{record.id}</td>
							<td className="border px-4 py-2">
								{editingRecord && editingRecord.id === record.id ?
									<input
										type="text"
										value={editingRecord.name}
										onChange={(e) => handleInputChange(e, 'name')}
									/>
									:
									record.name
								}
							</td>
							<td className="border px-4 py-2">
								{editingRecord && editingRecord.id === record.id ?
									<input
										type="text"
										value={editingRecord.left_eye}
										onChange={(e) => handleInputChange(e, 'left_eye')}
									/>
									:
									record.left_eye
								}
							</td>
							<td className="border px-4 py-2">
								{editingRecord && editingRecord.id === record.id ?
									<input
										type="text"
										value={editingRecord.right_eye}
										onChange={(e) => handleInputChange(e, 'right_eye')}
									/>
									:
									record.right_eye
								}
							</td>
							<td className="border px-4 py-2 flex items-center justify-center">
								{editingRecord && editingRecord.id === record.id ?
									<CrudBt
										record={record}
										deleteRecord={deleteRecord}
										modifyRecord={modifyRecord}
										submitRecord={submitRecord}
									/>
									:
									<CrudBt
										record={record}
										deleteRecord={deleteRecord}
										modifyRecord={() => modifyRecord(record)}
										submitRecord={submitRecord}
									/>
								}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const CrudBt = ({ record, deleteRecord, modifyRecord, submitRecord }) => {
	return (
		<div>
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
				onClick={() => deleteRecord(record.id)}
			>
				删除
			</button>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
				onClick={modifyRecord}
			>
				修改
			</button>
			<button
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
				onClick={() => submitRecord(record.id)}
			>
				提交
			</button>
		</div>
	);
};

// CrudBt 组件接收 record、deleteRecord、modifyRecord 和 submitRecord 四个 props
const Crud = ({ record, deleteRecord, modifyRecord, submitRecord }) => {
	return (
		<div>
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
				onClick={() => deleteRecord(record.id)}
			>
				删除
			</button>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
				onClick={() => modifyRecord(record.id)}
			>
				修改
			</button>
			<button
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
				onClick={() => submitRecord(record.id)}
			>
				提交
			</button>
		</div>
	);
}


function EyesightTable2() {
	const [eyesightRecords, setEyesightRecords] = useState([
		{ id: 1, name: '张三', left_eye: '5.0', right_eye: '5.0' },
		{ id: 2, name: '李四', left_eye: '4.5', right_eye: '4.5' },
		{ id: 3, name: '王五', left_eye: '4.0', right_eye: '4.0' },
		// More records can be added here...
	]);

	const [editingRecordId, setEditingRecordId] = useState(null);

	const addRecord = () => {
		const newId = eyesightRecords.length + 1;
		const newRecord = { id: newId, name: '', left_eye: '', right_eye: '' };
		setEyesightRecords([...eyesightRecords, newRecord]);
		setEditingRecordId(newId);
	};

	const deleteRecord = (id) => {
		setEyesightRecords(eyesightRecords.filter(record => record.id !== id));
	};

	const startEditingRecord = (id) => {
		setEditingRecordId(id);
	};

	const saveRecord = (record) => {
		const updatedRecords = eyesightRecords.map(r =>
			r.id === record.id ? { ...r, ...record } : r
		);
		setEyesightRecords(updatedRecords);
		setEditingRecordId(null);
	};

	const handleInputChange = (e, field, record) => {
		// Update the record's field value
		const { value } = e.target;
		const updatedRecord = { ...record, [field]: value };

		// Update the record in state, but don't save immediately
		saveRecord(updatedRecord);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
				onClick={addRecord}
			>
				添加记录
			</button>
			<table className="min-w-full table-auto">
				<thead>
					<tr>
						<th className="border px-4 py-2">索引</th>
						<th className="border px-4 py-2">姓名</th>
						<th className="border px-4 py-2">左眼视力</th>
						<th className="border px-4 py-2">右眼视力</th>
						<th className="border px-4 py-2">操作</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{eyesightRecords.map(record => (
						<RecordRow
							key={record.id}
							record={record}
							isEditing={editingRecordId === record.id}
							onDelete={deleteRecord}
							onEdit={startEditingRecord}
							onSave={saveRecord}
							onInputChange={handleInputChange}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

function EditableField({ value, isEditing, onChange, onBlur }) {
	return isEditing ? (
		<input
			type="text"
			value={value}
			onChange={onChange}
			onBlur={onBlur} // Save the record when the input field loses focus
			className="w-2/6"
		/>
	) : (
		value
	);
}

function ActionButtons({ isEditing, record, onEdit, onDelete, onSave, onSubmit }) {
	return isEditing ? (
		<button
			className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-1"
			onClick={() => onSave(record)}
		>
			保存
		</button>
	) : (
		<>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1"
				onClick={() => onEdit(record.id)}
			>
				编辑
			</button>
			<button
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-1"
				onClick={() => onDelete(record.id)}
			>
				删除
			</button>
			<button
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-1"
				onClick={() => onSubmit(record.id)}
			>
				提交
			</button>

		</>
	);
}

function RecordRow({ record, isEditing, onDelete, onEdit, onSave, onInputChange }) {
	return (
		<tr>
			<td className="border px-4 py-2">{record.id}</td>
			<td className="border px-4 py-2">
				<EditableField
					value={record.name}
					isEditing={isEditing}
					onChange={(e) => onInputChange(e, 'name', record)}
					onBlur={() => onSave(record)} // Save the record when the input field loses focus
				/>
			</td>
			<td className="border px-4 py-2">
				<EditableField
					value={record.left_eye}
					isEditing={isEditing}
					onChange={(e) => onInputChange(e, 'left_eye', record)}
					onBlur={() => onSave(record)} // Save the record when the input field loses focus
				/>
			</td>
			<td className="border px-4 py-2">
				<EditableField
					value={record.right_eye}
					isEditing={isEditing}
					onChange={(e) => onInputChange(e, 'right_eye', record)}
					onBlur={() => onSave(record)} // Save the record when the input field loses focus
				/>
			</td>
			<td className="border px-4 py-2">
				<ActionButtons
					isEditing={isEditing}
					record={record}
					onEdit={onEdit}
					onDelete={onDelete}
					onSave={onSave}
				/>
			</td>
		</tr>
	);
}
