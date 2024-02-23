import React, { createContext, useState } from "react";

// 创建一个全局上下文
export const States = createContext();

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
