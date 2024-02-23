import React, { useContext } from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { DrawerHeader } from "./BarStyles";
import { States } from "../layouts/States";

const drawerWidth = 240;
export const Drawers = () => {
	const { open, toggleOpen } = useContext(States);
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
					<span className="flex grow items-center justify-center ">Health</span>
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
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon className="stroke-white">
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider sx={{ bgcolor: "white" }} />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon className="stroke-white">
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<div className=" flex flex-col items-center  text-sm h-full text-wrap justify-end text-center">
					<p>
						Copyright &copy; 2024
						<br /> <a href="http://redaries.xyz/">All Rights Reserved.</a>
					</p>
					<p>
						<a href="https://beian.miit.gov.cn" target="_top">
							粤ICP备2021174112号
						</a>
					</p>
				</div>
			</Drawer>
		</>
	);
};
