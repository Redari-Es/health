import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useParams } from "react-router"
import { useAuth } from './States'
import { useRoutes, Route, Routes, Navigate } from "react-router-dom";
import UserProfile from '../components/UserProfile'


const PrivateRoutes = ({ children }) => {
	const { user } = useAuth();


	// 检查用户信息是否存在，然后再访问用户名
	// 如果用户未登录，则导航至登录页面
	if (!user) {
		return <Navigate to="/user" />;
	}


	// 检查当前路由中的用户名参数是否与登录用户的用户名匹配
	const isCurrentUserRoute = window.location.pathname.split('/')[1] === user.username;
	// 如果当前路由不是用户的个人信息页面，则导航至用户个人信息页面
	if (!isCurrentUserRoute) {
		return <Navigate to={`/${user.username}`} />;
	}
	return (
		<>
			{children}
			< Outlet />
		</>
	)
};


// 父组件 ChartLayout
export const UserLayout = ({ children }) => {
	const { logout } = useAuth()
	// useEffect(() => {
	// 	// 模拟退出登录后的操作，例如清除用户信息并重定向到登录页面
	// 	logout();
	// 	<Navigate to="/usr" />;
	// }, []);
	return (
		<>
			<UserProfile />
			<div className='flex flex-col items-center justify-center'>
				<span className="border rounded-2xl bg-custom0 p-2 font-bold text-2xl text-custom6 hover:scale-125 hover:cursor-pointer shadow-xl" onClick={logout}>Log Out</span>
			</div>
		</>
	)
};

export default PrivateRoutes
