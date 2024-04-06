import React, { useState, useEffect } from 'react';
import BasicPagination from '../components/BasicPagination'

const LogsComponent = () => {
	const [logs, setLogs] = useState({});
	const [selectedLogFile, setSelectedLogFile] = useState('mysql.log');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
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
					console.log(logsForSelectedFile)

					const totalLogsCount = logsForSelectedFile
						.split('\n')
						.filter(logEntry => logEntry.trim() !== '')
						.length;

					console.log("Total logs count:", totalLogsCount);
					const totalPagesCount = Math.ceil(totalLogsCount / logsPerPage);
					setTotalPages(totalPagesCount)

					console.log("Total pages count:", totalPagesCount); // 打印总页数，确保计算正确
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

	const logFileButtons = [
		{ label: 'Mysql Log', fileName: 'mysql.log' },
		{ label: 'Server 5001 Log', fileName: 'server_5001.log' },
		{ label: 'Server 5002 Log', fileName: 'server_5002.log' }
	];

	const logButtons = (
		<div className="log-buttons flex items-center justify-center m-4">
			{logFileButtons.map((button, index) => (
				<button
					key={index}
					className={`space-x mx-4 p-2 w-1/5 button-wrapper border rounded-xl bg-custom0 text-white ${selectedLogFile === button.fileName ? 'bg-custom7 scale-125' : ''}`}
					onClick={() => setSelectedLogFile(button.fileName)}
				>
					{button.label}
				</button>
			))}
		</div>
	);

	const renderLogs = () => {
		if (loading) return <div>Loading logs...</div>;
		if (error) return <div>{error}</div>;
		// 在尝试访问filteredLogs之前，检查selectedLogFile是否存在于logs对象中
		if (!logs[selectedLogFile]) {
			return <div>No logs found for the selected log file.</div>;
		}

		// 计算当前页应该显示的日志条目的起始和结束索引
		const startIndex = (currentPage - 1) * logsPerPage;
		const endIndex = startIndex + logsPerPage;
		const currentLogs = filteredLogs[selectedLogFile]
			.split('\n')
			.filter(logEntry => logEntry.trim() !== '')
			.slice(startIndex, endIndex); // 仅保留当前页的日志条目

		return (
			<table className="table-auto border-collapse border border-slate-400">
				<thead key={selectedLogFile} className="bg-custom0 py-2">
					<tr className="text-white">
						<th className="p-4 text-xl font-bold uppercase">{selectedLogFile}</th>
						<th className="text-xl font-bold uppercase">Log Entry</th>
					</tr>
				</thead>
				<tbody>
					{currentLogs.map((logEntry, index) => (
						<tr key={startIndex + index} className="log-row border border-gray-300 text-gray-600 p-2 hover:bg-custom0 hover:text-white">
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
			<h2 className="text-4xl text-center font-bold mb-4">Logs</h2>
			{logButtons}
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
