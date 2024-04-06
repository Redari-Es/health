// 在这里执行提交逻辑，比如发送请求给服务器
// Login
export const submitForm = async (api, formDataToSubmit, navigate) => {

	try {
		// 从 formDataToSubmit 对象中获取表单数据
		const { formFields } = formDataToSubmit;
		const username = formFields.user_name
		// console.log("username", username)
		// 发送 POST 请求给服务器
		const response = await fetch(`http://127.0.0.1:5001/${api}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formFields)
		});

		// 检查响应状态
		if (response.ok) {
			// 提交成功处理逻辑
			console.log('Form submitted successfully!');

			navigate(`/${username}`);
			// console.log("navigate",
			// 	`/${username}`
			// )

		} else {
			// 提交失败处理逻辑
			console.error('Failed to submit form:', response.statusText);
			// 可以在此处更新 UI，显示错误消息等
		}
	} catch (error) {
		// 捕获并处理网络错误等异常
		console.error('Error submitting form:', error.message);
		// 可以在此处更新 UI，显示错误消息等
	}
};


export const fetchWithProxy = async (url, proxyUrl) => {
	try {
		const response = await fetch(url, {
			// 设置代理
			proxy: {
				host: proxyUrl,
				port: 5002, // 代理端口
				protocol: 'http' // 代理协议
			}
		});

		// 检查响应状态
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		// 解析 JSON 响应
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

// 调用 fetchWithProxy 函数并指定多个代理
// fetchWithProxy('http://example.com/api/data', 'proxy1.example.com');
// fetchWithProxy('http://example.com/api/data', 'proxy2.example.com');
