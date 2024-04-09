import React, { useContext } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BedIcon from '@mui/icons-material/Bed';
import GroupIcon from '@mui/icons-material/Group';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Vision from "../assets/img/vision.png";
import Breath from "../assets/img/breath.png";
import Blood from "../assets/img/blood.png";
import ExerciseRecord from "../assets/img/eRecord.png";

import { DrawerHeader } from "./BarStyles";
import { States, useAuth } from "../layouts/States";
import { Link } from 'react-router-dom';
import CopyRight from './CopyRight'

const icons = (iconSrc) => {
	return (
		<img src={iconSrc} alt="Icon" className="fill-white-600 size-6" />
	);
}

const drawerWidth = 240;
const userItems = ["Summary", "Family", "Hearts", "Body", "Breath", "Sleep"]
const userItems2 = ["Vision", "ERecord", "Blood"]
const adminItems = ["Log", "Users", "Count"]
const adminItems2 = ["Log", "Users", "Count"]

const itemMap = {
	"Summary": "摘要",
	"Family": "家人",
	"Hearts": "心脏",
	"Body": "身体",
	"Breath": "呼吸",
	"Sleep": "睡眠",
	"Vision": '视力',
	"ERecord": "健身记录",
	"Blood": "血糖血压",
	"Log": "日志",
	"Users": "用户管理"
}

const userIcons = { FavoriteIcon, MonitorHeartIcon, FavoriteBorderIcon }

const coloredIcon = (Icon, color) => {
	return () => <Icon sx={{ color }} />;
};
// 创建一个映射表，将字符串映射到对应的图标组件
const iconMap = {
	Summary: coloredIcon(FavoriteBorderIcon, 'lightblue'),
	Family: coloredIcon(GroupIcon, 'purple'),
	Hearts: coloredIcon(MonitorHeartIcon, '#ff69b4'),
	Body: coloredIcon(EmojiPeopleIcon, '#00bcd4'),
	Sleep: coloredIcon(BedIcon, '#4caf50'),
	// Breath: BreathIcon,
	Vision: () => icons(Vision),
	Breath: () => icons(Breath),
	ERecord: () => icons(ExerciseRecord),
	Blood: () => icons(Blood),
};

const renderIcons = (text) => {
	const IconComponent = iconMap[text]
	return IconComponent ? <ListItemIcon aria-label={text}>{IconComponent()}</ListItemIcon> : null;
};
// 组件
export const Drawers = () => {

	const { open, toggleOpen } = useContext(States);
	const { user } = useAuth()
	const username = user ? user.username : null

	const theme = useTheme();

	return (
		<>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						border: "solid 1px white",
						bgcolor: "#002fa7",
						color: "white",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<div className="flex flex-shrink-0">
					<span className="flex grow ml-4 items-center justify-center text-2xl font-bold text-custom6 hover:scale-125 ">Health</span>
					<DrawerHeader>
						<IconButton className="drawer" onClick={toggleOpen}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon className="stroke-white stroke-1 fill-white" />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
				</div>
				<Divider sx={{ bgcolor: "white" }} />
				<List>
					{userItems.map((text, index) => (
						<div
							className="transition ease-linear my-3 items-center justify-center self-center hoverOn2"
						>
							<ListItem key={text} disablePadding >
								<ListItemButton
									component={Link}
									to={`/dashboard/${username}/${text.toLowerCase()}`}
									activeclassname="active"
									sx={{ color: "#fff" }}
								>
									<div className="flex px-4 items-center justify-center space-x">
										{renderIcons(text)}
										<ListItemText className="text-center" primary={itemMap[text]} />
									</div>
								</ListItemButton>
							</ListItem>
						</div>
					))}
				</List>
				<Divider sx={{ bgcolor: "white" }} />
				<List>
					{userItems2.map((text, index) => (
						<div
							className="transition ease-linear my-3 items-center justify-center self-center hoverOn2"
						>
							<ListItem key={text} disablePadding>
								<ListItemButton
									component={Link}
									to={`/dashboard/${username}/${text.toLowerCase()}`}
									activeclassname="active"
									className sx={{ color: "#fff" }}
								>
									<div className="flex px-2 items-center justify-center space-x">
										{renderIcons(text)}
										<ListItemText className="text-center" primary={itemMap[text]} />
									</div>
								</ListItemButton>
							</ListItem>
						</div>
					))}
				</List>
				<div className="absolute bottom-0 flex items-center text-2xl w-auto font-bold h-auto text-wrap justify-end text-center 
		hover:bg-sky-800 hover:brightness-150 hover:scale:125
	 m-2"
				>
					<CopyRight />
				</div>
			</Drawer>
		</>
	);
};
