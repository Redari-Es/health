import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

// 创建一个全局上下文
export const States = createContext();
export const Themes = createContext();
export const AuthContext = createContext();

// 创建一个 AuthContext 来提供登录状态


// 假设您有一个函数来验证JWT令牌

const AuthProvider = ({ children }) => {
	// 初始状态为一个空数组，用于存储用户信息
	const [users, setUsers] = useState([]);

	// 在组件挂载时从本地存储中获取用户信息
	useEffect(() => {
		const storedUsers = localStorage.getItem('users');
		if (storedUsers) {
			try {
				// 尝试解析本地存储中的用户信息
				const parsedUsers = JSON.parse(storedUsers);
				// 检查解析后的对象是否为数组
				if (Array.isArray(parsedUsers)) {
					// 过滤掉那些没有'uuid'字段的对象
					const filteredUsers = parsedUsers.filter(user => user && user.hasOwnProperty('uuid'));
					// 设置用户状态
					setUsers(filteredUsers);
				} else {
					// 如果解析后的结果不是数组，设置用户状态为空数组
					setUsers([]);
				}
			} catch (error) {
				// 如果解析过程中出现错误（例如，存储的数据不是有效的JSON），也设置用户状态为空数组
				console.error('Error parsing stored users:', error);
				setUsers([]);
			}
		}
	}, []);
	// 假设您有一个函数来获取当前用户
	const getCurrentUser = () => {
		const storedUsers = localStorage.getItem('users');
		const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
		const currentUserId = localStorage.getItem('current_user_id');
		return usersArray.find(user => user.id === currentUserId);
	};


	// 登录函数，将用户信息存储在全局状态中，并且持久化到本地存储中
	const login = (userData) => {
		// 检查用户是否已经存在
		const existingUser = users.find(user => user.uuid === userData.uuid);
		if (existingUser) {
			// 如果用户已存在，更新用户信息
			setUsers(users.map(user => user.uuid === userData.uuid ? userData : user));
		} else {
			// 如果用户不存在，添加新用户信息
			setUsers([...users, userData]);
		}
		// 持久化到本地存储
		localStorage.setItem('users', JSON.stringify(users));
		console.log(users);

	};

	// 登出函数，根据用户名清除对应用户信息，并且更新本地存储中的用户信息
	const logout = (user_name) => {
		// 过滤掉要删除的用户信息
		const updatedUsers = users.filter(user => user.user_name !== user_name);
		setUsers(updatedUsers);
		// 持久化到本地存储
		localStorage.setItem('users', JSON.stringify(updatedUsers));
	};

	return (
		<AuthContext.Provider value={{ users, login, logout }}>
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
	const { t } = useTranslation(); // Use useTranslation to get t
	// 定义状态来切换主题

	const themes = {
		light: t("mode.light"),
		dark: t("mode.dark")
	}
	/*
	const themes = {
		light: '来到黑夜',
		dark: '迎来白天'
	}
		*/
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

// 创建一个语言上下文
const LanguageContext = createContext();

// 提供一个自定义 hook 以方便在组件中使用语言上下文
// 提供一个自定义 hook 以方便在组件中使用语言上下文
export const useLanguage = () => {
	const { t } = useTranslation(); // Use useTranslation to get t
	const languageContext = useContext(LanguageContext); // Get language context from LanguageContext
	return { ...languageContext, t }; // Return language context along with t
};
// LanguageProvider 组件，用于提供语言上下文给整个应用
export const LanguageProvider = ({ children }) => {
	const { t } = useTranslation();
	const [language, setLanguage] = useState(() => {
		// 从本地存储中读取语言设置，如果没有则默认为英文
		return localStorage.getItem('language') || 'en';
	});

	useEffect(() => {
		// 设置 i18n 的语言设置
		i18n.changeLanguage(language);
		// 将当前语言设置保存到本地存储
		localStorage.setItem('language', language);
	}, [language]);

	const toggleLanguage = () => {
		const newLanguage = language === 'en' ? 'zh' : 'en';
		setLanguage(newLanguage);
	};

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
