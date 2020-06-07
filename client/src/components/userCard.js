import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		userSelect: "none",
		padding: theme.spacing(2),
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		background: theme.palette.background.paper,
	},
	image: {
		float: "left",
		width: "48px",
		height: "48px",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));

const UserCard = ({ user }) => {
	const classes = useStyles();
	console.log(user);
	const {
		user_id,
		user_name,
		screen_name,
		description,
		location,
		user_image_url,
	} = user;

	return (
		<Paper className={classes.root} elevation={5}>
			<img src={user_image_url} className={classes.image} />
			<div>
				<Typography variant='h5'>{user_name}</Typography>
				<Typography>{`@${screen_name}`}</Typography>
				<Typography variant='p'>{description}</Typography>
			</div>
		</Paper>
	);
};

export default UserCard;
