import React, { useState, useRef } from "react";
import { Sidebar, Menu } from "./";
import Appbar from "./Appbar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
	root: {},
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const Layout = ({ children }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const node = useRef();

	return (
		// <div ref={node}>
		// 	<Sidebar open={open} setOpen={setOpen} />
		// 	<Menu open={open} setOpen={setOpen} />
		// 	<Container>{children}</Container>
		// </div>
		<>
			<CssBaseline />
			<Appbar className={classes.bar} />
			<Container className={classes.container}>{children}</Container>
		</>
	);
};

export default Layout;
