import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	submitButton: {
		height: "100%",
		width: "100%",
		marginTop: theme.spacing(2),
		background: "#80bdff",
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

const TwitterSearchField = ({ onSubmit }) => {
	const classes = useStyles();
	const [value, setValue] = useState("user");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submission, setSubmission] = useState("");
	const [helperText, setHelperText] = useState("");

	useEffect(() => {
		if (value === "user") {
			setHelperText(`Searching by user`);
		} else if (value === "tag") {
			setHelperText(`Searching by hashtag`);
		}
	}, [value]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await onSubmit(submission, value);
			setLoading(false);
		} catch (err) {
			console.log("Error when submitting. Check for valid username or hashtag");
			setLoading(false);
		}
	};

	const handleChangeTypeInput = (event) => {
		setValue(event.target.value);
	};

	const handleSubmissionChange = (event) => {
		setSubmission(event.target.value);
	};

	// const BootstrapInput = withStyles((theme) => ({
	// 	root: {
	// 		"label + &": {
	// 			marginTop: theme.spacing(3),
	// 		},
	// 	},
	// 	input: {
	// 		borderRadius: 4,
	// 		backgroundColor: theme.palette.background.paper,
	// 		border: "1px solid #ced4da",
	// 		padding: "10px 0px 10px 8px",
	// 		transition: theme.transitions.create(["border-color", "box-shadow"]),
	// 		// Use the system font instead of the default Roboto font.
	// 		fontFamily: [
	// 			"-apple-system",
	// 			"BlinkMacSystemFont",
	// 			'"Segoe UI"',
	// 			"Roboto",
	// 			'"Helvetica Neue"',
	// 			"Arial",
	// 			"sans-serif",
	// 			'"Apple Color Emoji"',
	// 			'"Segoe UI Emoji"',
	// 			'"Segoe UI Symbol"',
	// 		].join(","),
	// 		"&:focus": {
	// 			borderRadius: 4,
	// 			borderColor: "#80bdff",
	// 			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
	// 		},
	// 	},
	// }))(InputBase);

	const theme = createMuiTheme({
		palette: {
			secondary: { main: "#00acee" },
		},
		overrides: {
			// Style sheet name ⚛️
			MuiFormControlLabel: {
				root: {
					color: "#00acee",
				},
			},
		},
	});

	return (
		<MuiThemeProvider theme={theme}>
			<FormControl component='fieldset' error={error}>
				<FormLabel component='legend'>{helperText}</FormLabel>
				<RadioGroup
					style={{ display: "flex", flexDirection: "row" }}
					aria-label='searchtype'
					name='searchtype'
					value={value}
					onChange={handleChangeTypeInput}
				>
					<FormControlLabel
						style={{ display: "inline-block" }}
						value='user'
						control={<Radio />}
						label='User'
					/>
					<FormControlLabel
						style={{ display: "inline-block" }}
						value='tag'
						control={<Radio />}
						label='Hashtag'
					/>
				</RadioGroup>

				<TextField
					className={classes.submissionField}
					variant='outlined'
					value={submission}
					name='submission'
					onChange={handleSubmissionChange}
				/>
				<Button
					variant='contained'
					color='primary'
					startIcon={<TwitterIcon />}
					className={classes.submitButton}
					onClick={handleSubmit}
					disabled={submission === ""}
				>
					{loading ? <CircularProgress /> : "Analyze"}
				</Button>
			</FormControl>
		</MuiThemeProvider>
	);
};

export default TwitterSearchField;
