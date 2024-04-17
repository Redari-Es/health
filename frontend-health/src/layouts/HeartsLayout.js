import React, { useEffect, useState, useContext } from 'react';
import { Outlet } from "react-router-dom";
import { Heart, Rates } from "../pages/charts/Hearts";
import { Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { Themes, useLanguage } from "./States";
import { useParams } from "react-router-dom"
import { States, useAuth } from "./States";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grow from '@mui/material/Grow';
import { useTranslation } from 'react-i18next'
import { FileUpload, FileMultiUpload, FileUploadDialog } from "../components/FileUpload"


// 菜单
const heartItems = ["heart", "hrv", "rhr", "rates"];


// 父组件 ChartLayout
export const HeartsLayout = ({ children }) => {
	const { t } = useTranslation();

	const { user } = useAuth()
	const username = user ? user.username : null
	// 对 children 进行处理，传递 currentETheme 给每个子组件
	//Theme
	const { themeDescription, toggleETheme, handleTimeClick, timeUnit } = useContext(Themes);
	// 菜单按钮
	const [showMenu, setShowMenu] = useState(false); // 控制菜单显示的状态
	const [activeMenu, setActiveMenu] = useState(null);
	const [activeMode, setActiveMode] = useState(timeUnit);
	const [showMode, setShowMode] = useState(false); // 控制菜单显示的状态
	const [showChart, setShowChart] = useState(t("hearts.menu.open"));
	const [file, setFile] = useState(false)
	const content = t(`hearts.${activeMenu}`)
	const openFile = () => {
		setFile(true)
	}
	const closeFile = () => {
		setFile(false)
	}


	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const toggleChart = (unit) => {
		setActiveMenu(unit)
		// const title = itemmap[unit]
		const title = t(`hearts.menu.${unit}`)
		setShowChart(title)
	};

	const timeUnits = t(`hearts.timeUnits`)

	const toggleMode = () => {
		setShowMode(!showMode);
	};
	useEffect(() => {
		setActiveMode(timeUnit)
	}, [timeUnit])


	// 图表菜单
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
						backgroundColor: activeMenu === item ? '#0056b3' : '#061D75',
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
					{t(`hearts.menu.${item}`)}
				</Button>
			</Grow >
		))
	}
	// 图表状态
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
								backgroundColor: activeMode === unit.value ? '#0056b3' : '#061D75',
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
				))
				}
			</>)
	}

	return (
		<>
			<main>
				<div className='flex flex-col gap-4 animate__animated animate__bounceIn'>
					<ControlSwitch checked={showMenu} onChange={toggleMenu} label={t("hearts.menu.title")} />
					{
						showMenu && (
							<div className="flex">
								{renderMenu(showMenu)}
							</div>
						)
					}
					<ControlSwitch checked={showMode} onChange={toggleMode} label={t('mode.title')} />
					{
						showMode && (
							<div className="flex">
								{renderMode(showMode)}
							</div>
						)
					}
					<div className="">

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
							onClick={openFile}
						>
							<span>{t("upload.title")}</span>
						</Button>
						<FileUploadDialog open={file} onClose={closeFile} />
					</div>
					<span className='font-bold mb-4 text-4xl self-center text-custom0' >{showChart}</span>
				</div>
				{children}
				<Outlet />
				{
					activeMenu && (
						<RenderContent content={content} />
					)

				}
			</main >
		</>
	)
};

// 子组件
export const ControlSwitch = ({ checked, onChange, label }) => {
	return (
		<FormControlLabel
			control={<Switch checked={checked} onChange={onChange} />}
			label={<span className="text-3xl text-nowrap font-bold">{label}</span>}
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



const RenderContent = ({ content, active }) => {
	return (
		<div className="py-8">
			<h2 className="text-4xl font-bold mb-4 text-center">{content.title}</h2>
			{content.def && (
				<Card title={content.def.title}>
					<p className="text-xl text-center">{content.def.detail}</p>
				</Card>
			)
			}
			{
				content.factors && (
					<Card title={content.factors.title}>
						<div className="mx-auto ">
							<ul className="list-disc flex space-x-4 text-lg">
								{content.factors.detail.map((factor, index) => (
									<li key={index} className="flex items-center">
										<span className="text-yellow-500 mr-2">•</span> {/* 项目符号颜色 */}
										{factor}
									</li>
								))}
							</ul>
						</div>
					</Card>
				)
			}
			{
				content.status && (
					<Card title={content.status.title}>
						<div className="grid grid-cols-2 gap-4 text-white">
							{Object.keys(content.status.content).map((key) => (
								<div key={key} className="flex flex-col gap-4">
									<div className="flex items-center">
										<h4 className="text-lg text-custom6 font-semibold mb-1">{content.status.content[key].title}</h4>
									</div>
									<div className="flex flex-col gap-4">
										<p className="text-base">{content.status.content[key].detail}</p>
										<p className="text-sm text-red-300">{content.status.content[key].other}</p>
									</div>
								</div>
							))}
						</div>
					</Card>
				)
			}
			{
				content.formula && (
					<Card title={content.formula.title}>
						{Object.keys(content.formula.content).map((formulaKey) => (
							<div key={formulaKey} className="mb-4">
								<h4 className="text-lg text-custom6 font-semibold mb-2">{content.formula.content[formulaKey].title}</h4>
								<p>{content.formula.content[formulaKey].detail}</p>
							</div>
						))}
					</Card>
				)
			}
			{
				content.advice && (
					<Card title={content.advice.title}>
						<ul>
							{content.advice.detail.map((advice, index) => (
								<li key={index}>{advice}</li>
							))}
						</ul>
					</Card>
				)
			}
		</div >
	);
};



const Card = ({ title, children, className = '', ...props }) => {

	return (
		<div
			className={`rounded-md bg-gradient-to-r from-custom0 to-custom7 p-4 mb-6 shadow-md hover:shadow-2xl transition duration-300 ease-in-out ${className}`}
			{...props}
		>
			<div className="relative z-10 p-4">
				{title && (
					<h3 className="text-2xl text-custom4 font-semibold mb-4 text-center leading-tight">
						{title}
					</h3>
				)}
				<div className="leading-relaxed text-white">
					{children}
				</div>
			</div>
		</div>
	);
};
