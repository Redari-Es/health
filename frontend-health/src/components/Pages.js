import React, { useState, useEffect } from 'react';
import { fetchData, postData } from "../databus/FrontApi"

export const Title = ({ text }) => {
	return (
		<div className='flex'>
			<span className=' text-center items-center p-2 shadow-2xl shadow-gray-500 justify-center text-3xl font-bold text-custom6 w-screen mb-6 border border-solid rounded bg-custom0 transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-110 hover:bg-custom7'>{text}</span>
		</div>
	)
}


export function ActionButtons({ isEditing, record, onEdit, onDelete, onSave, onSubmit }) {
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

export function RecordRow({ record, isEditing, onDelete, onEdit, onSave, onInputChange, onSubmit }) {
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
					onSubmit={onSubmit}
				/>
			</td>
		</tr>
	);
}

export const RecordForm = ({ initialRecord, api, records, setRecords, textLabels }) => {
	const [editingRecordId, setEditingRecordId] = useState(null);
	const addRecord = () => {
		const newId = records.length > 0 ? Math.max(...records.map(record => record.id)) + 1 : 1;
		const newRecord = { ...initialRecord, id: newId }; // 使用 initialRecord 作为新记录的初始值
		setRecords([...records, newRecord]);
		setEditingRecordId(newId);
	};

	const deleteRecord = (id) => {
		setRecords(records.filter(record => record.id !== id));
	};

	const startEditingRecord = (id) => {
		setEditingRecordId(id);
	};

	const saveRecord = (record) => {
		const updatedRecords = records.map(r =>
			r.id === record.id ? { ...r, ...record } : r
		);
		setRecords(updatedRecords);
		setEditingRecordId(null);
	};


	const handleInputChange = (e, field, record) => {
		// Update the record's field value
		const { value } = e.target;
		const updatedRecord = { ...record, [field]: value };

		// Update the record in state, but don't save immediately
		saveRecord(updatedRecord);
		setEditingRecordId(record.id);
	};

	const submitRecord = async (id) => {
		// 找到具有指定 ID 的记录
		const recordToSubmit = records.find(record => record.id === id);

		try {
			// 调用 postData 函数将记录提交到服务器
			const response = await postData(api, recordToSubmit);
			console.log('Record submitted successfully:', response);

			// 删除提交成功的记录
			deleteRecord(id);
		} catch (error) {
			// 捕获和处理提交过程中的错误
			console.error('Error occurred while submitting record:', error);
		}
	};
	return (
		<div className="container mx-auto px-4 py-8">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
				onClick={addRecord}
			>
				添加记录
			</button>
			{records.length > 0 ? (
				<table className="min-w-full table-auto border border-collapse border-slate-500 shadow-lg hover:shadow-2xl ">
					<thead>
						<tr>
							{/* 通过遍历 record 的属性生成表头 */}
							{Object.keys(records[0]).map((key, index) => (
								<th key={index} className="border px-4 py-2">{textLabels[key]}</th>
							))}
							{/* 添加额外的操作列 */}
							<th className="border px-4 py-2">操作</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{records.map(record => (
							<RecordRow
								key={record.id}
								record={record}
								isEditing={editingRecordId === record.id}
								onDelete={deleteRecord}
								onEdit={startEditingRecord}
								onSave={saveRecord}
								onInputChange={handleInputChange}
								onSubmit={submitRecord}
							/>
						))}
					</tbody>
				</table>
			) : (
				<div className="flex items-center justify-center">
					<p className="text-xl font-bold shadow hover:scale-125">没有记录显示。</p>
				</div>

			)}
		</div>
	);
};


export function FetchDataTable({ api, textLabels }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchDataAndUpdate = async () => {
			try {
				const fetchedData = await fetchData(api, setData);
				setData(fetchedData);

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchDataAndUpdate();
	}, [data]); // 确保 useEffect 在 api 变化时重新运行



	return (
		<div className="container mx-auto px-4 py-8">
			{data && data.length > 0 ? (
				<table className="min-w-full table-auto border-collapse border border-slate-500 shadow-lg hover:shadow-2xl">
					<thead>
						<tr>
							{/* 通过遍历 Data 中第一个记录的属性生成表头，并使用中文替换原始字段 */}
							{Object.keys(data[0]).map((key, index) => (
								<th key={index} className="border px-4 py-2">{textLabels[key]}</th>
							))}
						</tr>
					</thead>
					<tbody className="text-center">
						{data.map((record) => (
							<tr key={record.id}>
								{/* 使用动态生成的td来显示每条记录的内容 */}
								{Object.keys(record).map((key, index) => (
									<td key={index} className="border px-4 py-2">{record[key]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

// 测试
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

//测试
// CrudBt 组件接收 record、deleteRecord、modifyRecord 和 submitRecord 四个 props
export const Crud = ({ record, deleteRecord, modifyRecord, submitRecord }) => {
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


export function EditableField({ value, isEditing, onChange, onBlur }) {
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






