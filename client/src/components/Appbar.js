import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: theme.spacing(2),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	bar: {
		boxShadow: "none",
		backgroundColor: "#000000",
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.bar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Cleared Media
					</Typography>
					<Button component={Link} to='/' color='inherit'>
						Home
					</Button>
					<Button component={Link} to='/twitter' color='inherit'>
						Twitter
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
