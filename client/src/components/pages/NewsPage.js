import React, { useState } from "react";
import Layout from "../layout";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	grid: {
		justifyContent: "center",
	},
	submitButton: {
		height: "100%",
		width: "100%",
		marginTop: theme.spacing(2),
		background: "#80bdff",
	},
	summary: {
		marginTop: theme.spacing(2),
	},
	header: {
		textAlign: "center",
		marginBottom: theme.spacing(2),
	},
	cnn: {
		margin: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		height: "100%",
	},
	fox: {
		margin: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		height: "100%",
	},
	submissionField: {
		borderRadius: 4,
		backgroundColor: theme.palette.background.paper,
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "green",
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	},
}));

const NewsPage = (props) => {
	const classes = useStyles();

	const [cnn, setCNN] = useState("");
	const [fox, setFox] = useState("");
	const [foxLoading, setFoxLoading] = useState(false);
	const [cnnLoading, setCnnLoading] = useState(false);
	const [foxSummary, setFoxSummary] = useState("");
	const [cnnSummary, setCnnSummary] = useState("");
	const [foxErrorMessage, setFoxErrorMessage] = useState("");
	const [cnnErrorMessage, setCnnErrorMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleCnnChange = (event) => {
		setCNN(event.target.value);
	};

	const handleFoxChange = (event) => {
		setFox(event.target.value);
	};

	const handleFoxSubmit = async (event) => {
		if (!fox.includes("foxnews.com")) {
			setFoxErrorMessage("URL must contain foxnews.com");
			return;
		}
		setFoxLoading(true);

		try {
			const { data } = await axios.post("/news", {
				url: fox,
			});
			setFoxSummary(data);
			setFoxLoading(false);
		} catch (err) {
			console.log(err);
			setErrorMessage(
				"There was an issue with scanning your CNN link. Please try again."
			);
			setFoxLoading(false);
		}
	};

	const handleCnnSubmit = async (event) => {
		if (!cnn.includes("cnn.com")) {
			setCnnErrorMessage("URL must contain cnn.com");
			return;
		}

		setCnnLoading(true);
		try {
			const { data } = await axios.post("/news", {
				url: cnn,
			});

			setCnnLoading(false);
			setCnnSummary(data);
		} catch (err) {
			console.log(err);
			setErrorMessage(
				"There was an issue with scanning your Fox News link. Please try again."
			);
			setCnnLoading(false);
		}
	};

	return (
		<Layout>
			<Grid container className={classes.grid}>
				<Grid item xs={12} className={classes.header}>
					<Typography variant='h1'>NEWS</Typography>
					<Typography variant='p'>
						Compare news sources in a short summary
					</Typography>
					{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
				</Grid>
				<Grid item xs={5} className={classes.cnn}>
					<Typography variant='h1'>CNN</Typography>
					<TextField
						fullWidth
						error={!!cnnErrorMessage}
						className={classes.submissionField}
						variant='outlined'
						value={cnn}
						helperText={
							cnnErrorMessage === ""
								? "Enter a url from CNN News"
								: cnnErrorMessage
						}
						name='cnn'
						onChange={handleCnnChange}
					/>
					<Button onClick={handleCnnSubmit} className={classes.submitButton}>
						{cnnLoading ? <CircularProgress /> : "Analyze"}
					</Button>
					<TextField
						fullWidth
						label='CNN Summary'
						multiline
						rows={20}
						variant='outlined'
						value={cnnSummary}
						className={classes.summary}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={5} className={classes.fox}>
					<Typography variant='h1'>FOX</Typography>
					<TextField
						fullWidth
						error={!!foxErrorMessage}
						className={classes.submissionField}
						variant='outlined'
						helperText={
							foxErrorMessage === ""
								? "Enter a url from Fox News"
								: foxErrorMessage
						}
						value={fox}
						name='fox'
						onChange={handleFoxChange}
					/>
					<Button onClick={handleFoxSubmit} className={classes.submitButton}>
						{foxLoading ? <CircularProgress /> : "Analyze"}
					</Button>
					<TextField
						fullWidth
						label='Fox Summary'
						multiline
						rows={20}
						value={foxSummary}
						variant='outlined'
						className={classes.summary}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default NewsPage;
