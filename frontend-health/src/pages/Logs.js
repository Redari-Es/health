import React, { useState, useEffect } from 'react';
import BasicPagination from '../components/BasicPagination'
import { Title, Loading } from '../components/Pages'
import { MenuBtn } from '../components/Btn'


const GoToPage = ({ current, setCurrentPage, itemsPerPage, totalItems }) => {
	const [targetItem, setTargetItem] = useState(''); // 用于存储用户输入的目标条目数字

	// 处理输入框变化的函数
	const handleInputChange = (event) => {
		setTargetItem(event.target.value);
	};

	// 处理跳转到指定条目的函数
	const goToItem = () => {
		const itemNumber = parseInt(targetItem, 10); // 将用户输入的字符串转换为整数
		if (itemNumber >= 1 && itemNumber <= totalItems) {
			const targetPage = Math.ceil(itemNumber / itemsPerPage); // 计算目标条目所在的页数
			setCurrentPage(targetPage); // 设置当前页数为目标页数
		} else {
			alert('请输入有效的条目数字！'); // 输入无效条目数字时弹出警告
		}
	};

	return (
		<div className="flex items-center justify-center mb-4">
			{/* 输入框 */}
			<input
				type="number"
				value={targetItem}
				onChange={handleInputChange}
				placeholder="输入条目数字"
				className="border border-custom0 rounded p-2 mr-2 hover:scale-110 focus:font-bold focus:scale-110"
			/>
			{/* 按钮 */}
			<button onClick={goToItem} className="bg-blue-600 hover:bg-custom5 transition ease-linear duration-300 active:-translate-y-3 text-white ml-2 font-bold py-2 px-4 rounded">
				跳转到指定条目
			</button>
		</div>
	);
};


const LogsComponent = () => {
	const [logs, setLogs] = useState({});
	const [selectedLogFile, setSelectedLogFile] = useState('mysql.log');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalLogsCount, setLogsCount] = useState(0);
	const logsPerPage = 10;

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const response = await fetch('http://127.0.0.1:5002/admin/logs');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setLogs(data.logs);
				setLoading(false);
				// 检查选定的日志文件是否存在
				if (data.logs[selectedLogFile]) {
					// 计算选定日志文件的总页数并更新状态
					const logsForSelectedFile = data.logs[selectedLogFile]; // 获取当前选择的日志文件
					// console.log(logsForSelectedFile)

					const totalLogsCount = logsForSelectedFile
						.split('\n')
						.filter(logEntry => logEntry.trim() !== '')
						.length;
					setLogsCount(totalLogsCount)

					// console.log("Total logs count:", totalLogsCount);
					const totalPagesCount = Math.ceil(totalLogsCount / logsPerPage);
					setTotalPages(totalPagesCount)

					// console.log("Total pages count:", totalPagesCount); // 打印总页数，确保计算正确
				} else {
					// 如果选定的日志文件不存在，则将总页数设置为 1
					setTotalPages(1);
				}


			} catch (error) {
				setError('There was a problem fetching the logs.');
				setLoading(false);
				setTotalPages(1);
				console.error('Error fetching logs:', error);
			}
		};

		fetchLogs();
	}, [selectedLogFile]);

	const filteredLogs = Object.keys(logs).reduce((filtered, key) => {
		if (key !== '.gitkeep') {
			filtered[key] = logs[key];
		}
		return filtered;
	}, {});

	const logFileMenu = [
		{ label: 'Mysql Log', current: 'mysql.log' },
		{ label: 'Server 5001 Log', current: 'server_5001.log' },
		{ label: 'Server 5002 Log', current: 'server_5002.log' }
	];

	const renderLogs = () => {
		if (loading) return <><Loading text="正在加载中" /></>;
		if (error) return <div>{error}</div>;
		// 在尝试访问filteredLogs之前，检查selectedLogFile是否存在于logs对象中
		if (!logs[selectedLogFile]) {
			const text = "No logs found for the selected log file."
			return <Title text={text} />
		}

		// 计算当前页应该显示的日志条目的起始和结束索引
		const startIndex = (currentPage - 1) * logsPerPage;
		const endIndex = startIndex + logsPerPage;
		const currentLogs = filteredLogs[selectedLogFile]
			.split('\n')
			.filter(logEntry => logEntry.trim() !== '')
			.slice(startIndex, endIndex); // 仅保留当前页的日志条目

		return (
			<table className="table-auto mx-auto animate__animated animate__fadeInUp border-collapse border border-slate-400">
				<thead key={selectedLogFile} className="bg-custom0 py-2 hoverOn1 ">
					<tr className="text-white">
						<th className="p-4 text-xl font-bold uppercase">{selectedLogFile}</th>
						<th className="text-xl font-bold uppercase">Log Entry</th>
					</tr>
				</thead>
				<tbody className="">
					{currentLogs.map((logEntry, index) => (
						<tr key={startIndex + index} className="log-row border border-gray-300 text-gray-600 p-2 hoverOn0 ">
							<td className="table-cell p-4 text-center text-lg">{startIndex + index + 1}</td>
							<td className="table-cell p-4 text-sm hover:text-lg">{logEntry}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="logs-container">
			<Title text='日志' />
			<div className="flex items-center justify-center m-4 p-2">
				<p className="text-3xl self-center">
					<span className="mr-3">当前日志共有</span><span className="rounded-2xl hover:bg-custom0 hover:text-white hover:shadow-2xl hover:-translate-y-2 transition ease-in-out animate__animated animate__fadeIn hover:scale-125 algn-center font-bold px-4 text-5xl">{totalLogsCount}</span><span className="ml-3">条</span>
				</p>
			</div>
			<MenuBtn Menu={logFileMenu} current={selectedLogFile} onClick={setSelectedLogFile} />
			<GoToPage current={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={logsPerPage} totalItems={totalLogsCount} />
			{renderLogs()}
			<div className="m-4">
				<BasicPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}


export default LogsComponent;


