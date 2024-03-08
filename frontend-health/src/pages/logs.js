import React, { useState, useEffect } from 'react';

const LogsComponent = () => {
	const [logs, setLogs] = useState({});

	useEffect(() => {
		// 假设您的后端API端点是 '/api/logs'
		const fetchLogs = async () => {
			try {
				const response = await fetch('http://127.0.0.1:5002/admin/logs');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setLogs(data.logs);
			} catch (error) {
				console.error('There was a problem fetching the logs:', error);
			}
		};

		fetchLogs();
	}, []);


	// 过滤方法一
	// 过滤掉不需要渲染的日志文件
	const filteredLogs = Object.keys(logs).reduce((filtered, key) => {
		if (key !== '.gitkeep') {
			filtered[key] = logs[key];
		}
		return filtered;
	}, {});
	// 过滤方法二
	/*
	const filteredLogs = logs ? Object.keys(logs).filter(key => key !== '.gitkeep').reduce((obj, key) => {
		obj[key] = logs[key];
		return obj;
	}, {}) : {};
	*/

	// 渲染过滤
	if (filteredLogs) {
		const logTables = Object.keys(filteredLogs).map((fileName, index) => {
			return (
				<div key={fileName} className="log-table">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{fileName}</th>
								<th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Log Entry</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredLogs[fileName].split('\n').map((logEntry, entryIndex) => (
								<tr key={entryIndex} className="log-row">
									<td className="px-6 py-4 text-sm text-gray-500">{entryIndex + 1}</td>
									<td className="px-6 py-4 text-sm text-gray-900">{logEntry}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)
		})
		return (
			<div className="logs-container">
				<h2 className="text-2xl font-bold mb-4">Logs</h2>
				{logTables}
			</div>
		);
	} else {
		return <div>Loading logs...</div>;
	}
}

export default LogsComponent;
