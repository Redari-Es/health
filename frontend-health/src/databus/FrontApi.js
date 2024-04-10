// 在这里执行提交逻辑，比如发送请求给服务器
// Login
export const submitForm = async (api, formDataToSubmit, navigate, login) => {

	try {
		// 从 formDataToSubmit 对象中获取表单数据
		const { formFields } = formDataToSubmit;
		const user_name = formFields.user_name
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
			const data = await response.json();    // 假设服务器返回的用户对象中包含id和username    
			const userData = {
				id: data.id,
				uuid: data.uuid,
				user_name: data.user_name,
				// state:1,
			}
			login(userData)
			console.log("login userData:", userData);
			// localStorage.setItem('users', JSON.stringify({ uuid, user_name }))
			navigate(`/dashboard/${user_name}`);
			//后端200才执行
			console.log("navigate:", `${user_name}`, 'uuid:', data.uuid)
			//还需要处理注册
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

//GET
// Vision
// 定义一个函数，用于获取数据并设置状态

export const fetchData = async (api) => {
	try {
		const response = await fetch(`http://127.0.0.1:5001/api/${api}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		// console.log("success:", data);
		return data; // 返回从 API 获取的数据
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
		throw error; // 将错误抛出，以便在组件中捕获和处理
	}
};

//POST
export const postData = async (api, data) => {
	console.log("data:", data);

	try {
		const response = await fetch(`http://127.0.0.1:5001/api/${api}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // 声明请求体的内容类型为 JSON
			},
			body: JSON.stringify(data), // 将数据对象转换为 JSON 字符串
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const responseData = await response.json(); // 解析响应数据为 JSON 格式
		console.log("success:", responseData);
		return responseData; // 返回从 API 获取的数据
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
		throw error; // 将错误抛出，以便在组件中捕获和处理
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
