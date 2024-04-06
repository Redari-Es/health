import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { States } from "../layouts/States";
import { Drawers } from "./Drawers";
import { AppBar } from "./BarStyles";

// const drawerWidth = 240;
const navItems = ["Home", "About", "Contact", "User"];

const DrawerAppBar = (props) => {
	// Appbar效果
	// 1
	const { window } = props;
	const { open, toggleOpen } = useContext(States);

	// 工具栏
	const container =
		window !== undefined ? () => window().document.body : undefined;

	// 页面渲染
	return (
		<Container>
			<Box className="h-[60px]" sx={{ display: "flex" }}>
				<AppBar
					sx={{ bgcolor: "#002fa7" }}
					position="fixed"
					open={open}
					component="nav"
				>
					<Toolbar>
						<IconButton
							className="drawer"
							color="inherit"
							aria-label="open drawer"
							edge="start"
							// onClick={handleDrawerToggle}
							onClick={toggleOpen}
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							noWrap
							sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
						>
							Health
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "block" } }}>
							{navItems.map((item) => (
								<Button
									key={item}
									component={Link}
									activeclassname="acitve"
									to={item.toLowerCase()}
									sx={{ color: "#fff" }}
								>
									{item}
								</Button>
							))}
						</Box>
					</Toolbar>
				</AppBar>
				<Drawers />
			</Box>
		</Container>
	);
};

DrawerAppBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default DrawerAppBar;
/*
	// 手机大小时抽屉
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Health
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton
							component={NavLink}
							to={item.toLowerCase()}
							activeClassName="active"
							sx={{ textAlign: "center" }}
						>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	*/
