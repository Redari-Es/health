import React, { useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import { Heart, Rates } from "../pages/charts/Hearts";
import { Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { Themes } from "./States";
import { useParams } from "react-router-dom"
import { States, useAuth } from "./States";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grow from '@mui/material/Grow';


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


	const renderMenu = (checked) => {
		return heartItems.map((item, index) => (
			<Grow
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 1000 + index * 200 } : {})} // 增加延迟时间
			>
				<Button
					key={item}
					component={Link}
					to={`${item.toLowerCase()}`}
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
			</Grow>
		))
	}
	const renderMode = (checked) => {
		return (
			<>
				<Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})}>
					<Button
						sx={{
							color: '#fff',
							backgroundColor: '#061D75',
							border: '1px solid #007bff',
							borderRadius: '8px',
							padding: '12px 16px',
							cursor: 'pointer',
							margin: '6px',
							'&:hover': {
								backgroundColor: '#0056b3',
								borderColor: '#0056b3',
							},
						}}
						onClick={toggleETheme}
					>
						{themeDescription}
					</Button>
				</Grow>
				{timeUnits.map((unit, index) => (
					<Grow
						key={index}
						in={checked}
						style={{ transformOrigin: '0 0 0' }}
						{...(checked ? { timeout: 1000 + (index + 1) * 200 } : {})}
					>
						<Button
							sx={{
								backgroundColor: '#061D75',
								color: '#fff',
								border: '1px solid #007bff',
								borderRadius: '8px',
								padding: '12px 16px',
								cursor: 'pointer',
								margin: '6px',
								'&:hover': {
									backgroundColor: '#0056b3',
									borderColor: '#0056b3',
								},
							}}
							onClick={() => handleTimeClick(unit.value)}
						>
							{unit.label}
						</Button>
					</Grow>
				))}
			</>)
	}

	return (
		<>
			<main>
				<div className='flex flex-col animate__animated animate__bounceIn'>
					< span className='font-bold text-4xl self-center text-custom0' >{showChart}</span>
					<ControlSwitch checked={showMenu} onChange={toggleMenu} label='Menu' />
					{
						showMenu && (
							<div className="flex">
								{renderMenu(showMenu)}
							</div>
						)
					}
					<ControlSwitch checked={showMode} onChange={toggleMode} label='Mode' />
					{
						showMode && (
							<div className="flex">
								{renderMode(showMode)}
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

export const ControlSwitch = ({ checked, onChange, label }) => {
	return (
		<FormControlLabel
			control={<Switch checked={checked} onChange={onChange} />}
			label={<span className="text-3xl font-bold">{label}</span>}
			sx={{
				color: '#061d75',
			}}
			className="size-2 p-2 m-2"
		/>
	)
}


export const RenderMenu = (checked, onClick, dataItems) => {
	const handleClick = (item) => {
		onClick(item);
	};
	return dataItems.map((item, index) => (
		<Grow
			in={checked}
			style={{ transformOrigin: '0 0 0' }}
			{...(checked ? { timeout: 1000 + index * 200 } : {})} // 增加延迟时间
		>
			<Button
				key={item}
				component={Link}
				to={`${item.toLowerCase()}`}
				activeclassname="active"
				onClick={() => handleClick(item)}
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
		</Grow>
	))
}

