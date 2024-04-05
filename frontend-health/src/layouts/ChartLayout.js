import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import { Heart, Rates } from "../pages/charts/Hearts";
import { Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { Themes } from "./States";
import { useParams } from "react-router-dom"
import { States, useAuth } from "./States";


// 菜单
const heartItems = ["Heart", "Hrv", "Rhr", "Rates"];
const itemmap = {
	"Open": "点击Menu",
	"Heart": "心率",
	"Hrv": "心率变异性",
	"Rhr": "静息心率",
	"Rates": "心率图",
}
const themes = {
	light: '亮色模式',
	dark: '深色模式'
}
const timeUnits = [
	{ label: "时", value: "hour" },
	{ label: "天", value: "day" },
	{ label: "周", value: "week" },
	{ label: "月", value: "month" },
	{ label: "年", value: "year" },
];


// 父组件 ChartLayout
export const ChartsLayout = ({ children }) => {
	const { user } = useAuth()
	const username = user ? user.username : null
	// 对 children 进行处理，传递 currentETheme 给每个子组件
	//Theme
	const { themeDescription, toggleETheme, handleTimeClick } = useContext(Themes);
	// 菜单按钮
	const [showMenu, setShowMenu] = useState(false); // 控制菜单显示的状态
	const [showMode, setShowMode] = useState(false); // 控制菜单显示的状态
	const [showChart, setShowChart] = useState("Click Menu");

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const toggleMode = () => {
		setShowMode(!showMode);
	};
	const toggleChart = (unit) => {
		unit = itemmap[unit]
		setShowChart(unit)
	};

	return (
		<>
			<main>
				<div className='flex flex-col animate__animated animate__bounceIn'>
					< span className='font-bold text-4xl self-center text-custom0' >{showChart}</span>
					<Button sx={{
						fontSize: "2rem",
						color: '#061d75'

					}}
						className="self-start"
						onClick={toggleMenu}>Menu</Button> {/* 菜单切换按钮 */}
					{
						showMenu && (
							<Box sx={{ display: { xs: "none", sm: "block" } }}>
								{heartItems.map((item) => (
									<Button
										key={item}
										component={Link}
										to={`/${username}/hearts/${item.toLowerCase()}`}
										activeclassname="active"
										onClick={() => toggleChart(item)}
										sx={{
											color: '#fff',
											backgroundColor: '#061D75',
											border: '1px solid #007bff',
											borderRadius: '8px',
											padding: '12px 16px',
											cursor: 'pointer',
											margin: '6px', // 添加一些外边距，使按钮不会紧挨着
											'&:hover': {
												backgroundColor: '#0056b3',
												borderColor: '#0056b3',
											},

										}}
									>
										{item}
									</Button>
								))
								}

							</Box>

						)
					}
					<Button sx={{
						fontSize: "1.5rem",
						color: '#061d75'

					}}
						className="self-start"
						onClick={toggleMode}>Mode</Button> {/* 菜单切换按钮 */}
					{
						showMode && (
							<div className='flex'>
								<Button
									sx={{
										color: '#fff',
										backgroundColor: '#061D75',
										border: '1px solid #007bff',
										borderRadius: '8px',
										padding: '12px 16px',
										cursor: 'pointer',
										margin: '6px', // 添加一些外边距，使按钮不会紧挨着
										'&:hover': {
											backgroundColor: '#0056b3',
											borderColor: '#0056b3',
										},
									}}
									onClick={toggleETheme}
								>
									{themeDescription}
								</Button>
								{timeUnits.map((unit, index) => (
									<Button
										key={index}
										sx={{
											backgroundColor: '#061D75',
											color: '#fff',
											border: '1px solid #007bff',
											borderRadius: '8px',
											padding: '12px 16px',
											cursor: 'pointer',
											margin: '6px', // 添加一些外边距，使按钮不会紧挨着
											'&:hover': {
												backgroundColor: '#0056b3',
												borderColor: '#0056b3',
											},
										}}
										onClick={() => handleTimeClick(unit.value)}
									>
										{unit.label}
									</Button>
								))}
							</div>
						)
					}

				</div>
				{children}
				<Outlet />
			</main >
		</>
	)
};


export const HeartInfo = () => {

	return (
		<>

		</>
	)

}
