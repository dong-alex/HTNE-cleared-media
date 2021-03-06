import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import TwitterPage from "./components/pages/TwitterPage";
import NewsPage from "./components/pages/NewsPage";

import axios from "axios";

// axios.defaults.baseURL =
// 	process.env.NODE_ENV === "production"
// 		? "https://htne-cleared-media.uc.r.appspot.com"
// 		: "http://localhost:8080";
axios.defaults.baseURL = "https://htne-cleared-media.uc.r.appspot.com";

function App() {
	//useOnClickOutside(node, () => setOpen(false));
	return (
		// <ThemeProvider theme={theme}>
		// 	<GlobalStyles />
		<Router>
			<Switch>
				<Route path='/twitter' exact component={TwitterPage} />
				<Route path='/news' exact component={NewsPage} />
				<Route path='/' exact component={LandingPage} />
			</Switch>
		</Router>
		// </ThemeProvider>
	);
}
export default App;
