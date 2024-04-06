/*
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api', {
		target: 'http://127.0.0.1:5001',
		changeOrigin: true,
		pathRewrite: {
			'^/api': '', // 将/api替换为空字符串，这样代理的请求路径中不再包含/api
		}
	}));

	app.use(proxy('/api2', {
		target: 'http://127.0.0.1:5002',
		secure: false,
		changeOrigin: true,
		pathRewrite: {
			'^/api2': '', // 同理，将/api2替换为空字符串
		}
	}));
};

// 修改后的fetch请求
const fetch = require('node-fetch');

function getOrder(data) {
	return fetch('http://127.0.0.1:5001/getOrder', { // 完整URL
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => response.json());
}

module.exports = { getOrder };

*/
