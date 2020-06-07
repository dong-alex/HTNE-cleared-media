import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useOnClickOutside } from "./hooks";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { Sidebar, Menu } from "./components";
import LandingPage from "./components/pages/LandingPage";
import TwitterPage from "./components/pages/TwitterPage";
import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "production"
		? "https://htne-cleared-media.uc.r.appspot.com"
		: "http://localhost:8080";

function App() {
	//useOnClickOutside(node, () => setOpen(false));
	return (
		// <ThemeProvider theme={theme}>
		// 	<GlobalStyles />
		<Router>
			<Switch>
				<Route path='/twitter' exact component={TwitterPage} />
				<Route path='/' component={LandingPage} />
			</Switch>
		</Router>
		// </ThemeProvider>
	);
}
export default App;
