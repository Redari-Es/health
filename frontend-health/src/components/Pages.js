import React, { useState, useEffect } from 'react';
import { fetchData, postData } from "../databus/FrontApi"
import BasicPagination from './BasicPagination'

export const Title = ({ text }) => {
	return (
		<div className='flex'>
			<span className=' text-center items-center py-4 shadow-2xl shadow-gray-500 justify-center text-3xl font-bold text-custom6 w-screen mb-6 border border-solid rounded-3xl bg-custom0 transition ease-in-out duration-150 hover:-translate-y-1 hover:scale-110 hover:bg-custom7'>{text}</span>
		</div>
	)
}
export const Loading = ({ text }) => {
	return (
		<div className="flex justify-center items-center hover:scale-125 transition-transform animate__animated animate__fadIn ">
			{/* 使用动画效果 */}
			<div className="m-4 loader ease-linear rounded-full border-8 border-t-8 border-custom0 h-6 w-6 animate__animated animate__tada animate__fast animate__infinite"></div>
			{/* 使用过渡效果 */}
			<span className='text-2xl text-custom0 font-bold transition ease-in-out hover:shadow-2xl'>{text}</span>
		</div>
	);
};

export const ShowErro = ({ text }) => {
	return (
		<div className="flex justify-center items-center hover:scale-125 transition-transform animate__animated animate__fadIn ">
			{/* 使用动画效果 */}
			<div className="m-4 loader ease-linear rounded-full border-8 border-t-8 border-custom9 h-6 w-6 animate__animated animate__tada animate__fast animate__infinite"></div>
			{/* 使用过渡效果 */}
			<span className='text-2xl text-custom9 font-bold transition ease-in-out hover:shadow-2xl'>{text}</span>
		</div>
	)
}

export function PageForm({ api, textLabels, initData, data, }) {
	const [records, setRecords] = useState(data);
	return (
		<div>
			<div className="transition delay-300 animate__animated animate__fadeIn">
				<FetchDataTable api={api} textLabels={textLabels} />
			</div>
			<RecordForm api={api} initialRecord={initData} records={records} setRecords={setRecords} textLabels={textLabels} />
		</div>
	)
}



export function ActionButtons({ isEditing, record, onEdit, onDelete, onSave, onSubmit, onUpdate }) {
	return isEditing ? (
		<button
			className="bg-green-500 actionBtn"
			onClick={() => onSave(record)}
		>
			保存
		</button>
	) : (
		<>
			<button
				className="bg-blue-500 actionBtn"
				onClick={() => onEdit(record.id)}
			>
				编辑
			</button>
			<button
				className="bg-red-500 actionBtn"
				onClick={() => onDelete(record.id)}
			>
				删除
			</button>
			<button
				className="bg-green-500 actionBtn "
				onClick={() => onSubmit(record.id)}
			>
				提交
			</button>
			{/*
							<button
								className="bg-yellow-500 actionBtn "
								onClick={() => onUpdate(record.id)}
							>
								更新
							</button>
				
							*/}

		</>
	);
}

//输入框
export function EditableField({ value, isEditing, onChange, onBlur }) {
	return isEditing ? (
		<div className="flex items-center justify-center h-20"> {/* 使用 div 作为 flex 容器，并设置高度 */}
			{/* <textarea*/}
			<input
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onClick={onChange}
				className="w-3/4 h-3/4 mx-1/6 px-3 text-ellipsis overflow-auto transition ease-linear rounded-2xl content-center text-white align-center justify-center text-center font-bold shadow-2xl shadow-custom2 scale-110 border-custom7 bg-custom5 hover:brightness-200 hover:scale-125 focus:brightness-200 focus:scale-125 resize"
				rows={1} // 设置 rows 为 1 来开始时单行显示
				placeholder="Edit..." // 添加占位符以便在非编辑状态下显示
			/>
		</div>
	) : (
		<div className="text-center">{value}</div>
	);
}
export function RecordRow({ record, isEditing, onDelete, onEdit, onSave, onInputChange, onSubmit }) {
	return (
		<tr className="hoverOn0">
			{Object.keys(record).map((key) => (
				<td key={key} className="border px-4 py-2">
					<EditableField
						value={record[key]}
						isEditing={isEditing}
						onChange={(e) => onInputChange(e, key, record)}
						onBlur={() => onSave(record)} // Save the record when the input field loses focus
					/>
				</td>
			))}
			<td className="border space-x px-4 py-3 mx-auto">
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
		<div className="max-h-auto p-4">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
				onClick={addRecord}
			>
				添加记录
			</button>
			{records.length > 0 ? (
				<table className="min-w-full table-auto border border-collapse border-slate-500 shadow-lg hover:shadow-2xl ">
					<thead>
						<tr className="hoverOn1">
							{/* 通过遍历 record 的属性生成表头 */}
							{Object.keys(records[0]).map((key, index) => (
								<th key={index} className="w-auto text-center border px-4 py-2">{textLabels[key]}</th>
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
				<Loading text="没有记录显示" />
			)}
		</div>
	);
};


export function FetchDataTable({ api, textLabels }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const perPage = 10;


	useEffect(() => {
		const fetchDataAndUpdate = async () => {
			try {
				const fetchedData = await fetchData(api, setData);
				setData(fetchedData);
				setLoading(false)
				if (data.length > 0) {
					const totalDataCount = data.length
					const totalPagesCount = Math.ceil(totalDataCount / perPage)
					setTotalPages(totalPagesCount)
				} else {
					setTotalPages(1);
				}

			} catch (error) {
				setError('Error fetching data.')
				setLoading(false);
				setTotalPages(1);
				console.error('Error fetching data:', error);
			}
		};
		fetchDataAndUpdate();
	}, [data, api, error]); // 确保 useEffect 在 api 变化时重新运行

	const renderData = () => {

		if (loading) {
			const text = "Loading logs..."
			return <Loading text={text} />

		} if (error) return <div><ShowErro text={error} /></div>;
		// 在尝试访问filteredLogs之前，检查selectedLogFile是否存在于logs对象中
		if (!data) {
			const text = "No logs found for the selected log file."
			return <Loading text={text} />
		}

		// 计算当前页应该显示的日志条目的起始和结束索引
		const startIndex = (currentPage - 1) * perPage;
		const endIndex = startIndex + perPage;
		const currentData = data.slice(startIndex, endIndex)
		return (

			<div className="max-h-auto p-4">
				<table className="min-w-full table-auto border-collapse border border-slate-500 shadow-lg hover:shadow-2xl">
					<thead>
						<tr className="hoverOn1">
							{/* 通过遍历 Data 中第一个记录的属性生成表头，并使用中文替换原始字段 */}
							{Object.keys(data[0]).map((key, index) => (
								<th key={index} className="border px-4 py-2">{textLabels[key]}</th>
							))}
						</tr>
					</thead>
					<tbody className="text-center">
						{currentData.map((record) => (
							<tr key={record.id} className="hoverOn0">
								{/* 使用动态生成的td来显示每条记录的内容 */}
								{Object.keys(record).map((key, index) => (
									<td key={index} className="border px-4 py-2">{record[key]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<div className="m-6">
					<BasicPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="transition ease-in-out">
			{renderData()}

		</div >
	)
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




