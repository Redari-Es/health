import React from "react";
import GetAllRoutes from "./routes";
import { StatesProvider, ThemesProvider, AuthProvider } from "./layouts/States";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// 创建自定义主题
const theme = createTheme({
	typography: {
		h2: {
			fontSize: "2.5rem",
		},
	},
	palette: {
		secondary: {
			main: "#002fa7", // 修改次要配色的主色调
		},
	},
});

const App = () => {
	return (
		<>
			<StatesProvider>
				<ThemeProvider theme={theme}>
					<ThemesProvider>
						<AuthProvider>
							<GetAllRoutes />
						</AuthProvider>
					</ThemesProvider>
				</ThemeProvider>
			</StatesProvider>
		</>
	);
};

/*
const App = () => {
	return (
		<>
			<StatesProvider>
				<GetAllRoutes />
			</StatesProvider>
		</>
	);
};
*/

export default App;
