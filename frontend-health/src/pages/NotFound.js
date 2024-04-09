import React from 'react';
import { Link } from 'react-router-dom'


export const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-custom0">
			<div className="flex flex-col items-center justify-center animate__animated animate__fadeInDown ">
				<h1 className="text-6xl text-custom6 font-bold mb-4 hover:scale-125">404 - Page Not Found</h1>
				<p className="text-3xl text-white mb-8">The page you are looking for does not exist.</p>
				<a href="/" className=" text-2xl text-custom8 hover:scale-125 hover:font-bold">Go back to Home</a>
			</div>
		</div>
	);
};

export const NotFoundPage = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-200">
			<div className="text-center">
				<h1 className="text-9xl font-bold mb-4">404</h1>
				<p className="text-xl font-medium mb-8">页面未找到</p>
				<Link to="/admin" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out">
					返回后台首页
				</Link>
			</div>
		</div>
	);
};
