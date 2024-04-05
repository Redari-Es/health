import React, { createContext, useContext, useState } from "react";
import { useParams } from 'react-router'

// 创建一个全局上下文
export const States = createContext();
export const Themes = createContext();
export const AuthContext = createContext();
// 创建一个 AuthProvider 组件来提供登录状态
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		// 从本地存储中获取用户信息，如果存在的话
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	// 登录函数，将用户信息存储在全局状态中，并且持久化到本地存储中
	const login = (userData) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	// 登出函数，清除用户信息，并且从本地存储中移除
	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// 创建一个自定义钩子，方便在组件中访问登录状态和函数
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };


// 创建一个全局提供者组件
export const StatesProvider = ({ children }) => {


	const [open, setOpen] = useState(false);
	// 更新全局值的函数
	const toggleOpen = () => {
		setOpen((prevState) => !prevState);
	};

	return (
		<States.Provider value={{ open, toggleOpen }}>{children}</States.Provider>
	);
};

export const ThemesProvider = ({ children }) => {
	// 定义状态来切换主题
	const themes = {
		light: '亮色模式',
		dark: '深色模式'
	}
	const [currentETheme, setCurrentETheme] = useState('dark'); // 默认为深色主题

	const themeDescription = themes[currentETheme]; // 获取当前主题的描述
	const toggleETheme = () => {
		const nextTheme = currentETheme === 'light' ? 'dark' : 'light';
		setCurrentETheme(nextTheme);
	};
	// 时间状态
	const [timeUnit, setTimeUnit] = useState('hour'); // 初始时间单位为月

	const handleTimeClick = (unit) => {
		setTimeUnit(unit);
	};

	return (
		<Themes.Provider value={{ currentETheme, themeDescription, toggleETheme, timeUnit, handleTimeClick }}>{children}</Themes.Provider>
	);

}
