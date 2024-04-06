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
const healthItems = ["Summary", "Group", "Hearts", "Body", "Breath", "Sleep"]
const healthItems2 = ["Vision", "ExerciseRecord", "Blood"]

const itemMap = {
	"Summary": "摘要",
	"Group": "家人",
	"Hearts": "心脏",
	"Body": "身体",
	"Breath": "呼吸",
	"Sleep": "睡眠",
	"Vision": '视力',
	"ExerciseRecord": "健身记录",
	"Blood": "血糖血压"
}

const healthIcons = { FavoriteIcon, MonitorHeartIcon, FavoriteBorderIcon }

const coloredIcon = (Icon, color) => {
	return () => <Icon sx={{ color }} />;
};
// 创建一个映射表，将字符串映射到对应的图标组件
const iconMap = {
	Summary: coloredIcon(FavoriteBorderIcon, 'lightblue'),
	Group: coloredIcon(GroupIcon, 'purple'),
	Hearts: coloredIcon(MonitorHeartIcon, '#ff69b4'),
	Body: coloredIcon(EmojiPeopleIcon, '#00bcd4'),
	Sleep: coloredIcon(BedIcon, '#4caf50'),
	// Breath: BreathIcon,
	Vision: () => icons(Vision),
	Breath: () => icons(Breath),
	ExerciseRecord: () => icons(ExerciseRecord),
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
				<div className="flex flex-shrink">
					<span className="flex grow items-center justify-center font-bold text-custom6 ">Health</span>
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
					{healthItems.map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton
								component={Link}
								to={`/${username}/${text.toLowerCase()}`}
								activeclassname="active"
								sx={{ color: "#fff" }}
							>
								{renderIcons(text)}
								<ListItemText primary={itemMap[text]} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider sx={{ bgcolor: "white" }} />
				<List>
					{healthItems2.map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton
								component={Link}
								to={`/${username}/${text.toLowerCase()}`}
								activeclassname="active"
								sx={{ color: "#fff" }}
							>
								{renderIcons(text)}
								<ListItemText primary={itemMap[text]} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<div className=" flex flex-col items-center  text-sm h-full text-wrap justify-end text-center">
					<CopyRight />
				</div>
			</Drawer>
		</>
	);
};
