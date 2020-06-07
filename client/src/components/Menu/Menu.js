import React from "react";
import { Link } from "react-router-dom";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const Menu = ({ open, ...props }) => {
	const isHidden = open ? true : false;
	const tabIndex = isHidden ? 0 : -1;

	const [value, setValue] = React.useState("");
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState("Search by...");
	const [radioText, setRadioText] = React.useState("Search by");

	const handleChangeTypeInput = (event) => {
		setValue(event.target.value);
		if (value === "@") {
			setHelperText(`Searching by user`);
		} else if (value === "#") {
			setHelperText(`Searching by hashtag`);
		}
		setError(false);
		console.log(`Changed the type: ${value}`);
		console.log(`This is helpertext: ${helperText}`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Submit?!");
		if (value === "@") {
			console.log("searching by user");
		} else if (value === "#") {
			console.log("searching by hashtag");
		} else {
			setRadioText("Please select an option below.");
			setError(true);
		}
	};

	const BootstrapInput = withStyles((theme) => ({
		root: {
			"label + &": {
				marginTop: theme.spacing(3),
			},
		},
		input: {
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: "1px solid #ced4da",
			fontSize: 16,
			padding: "10px 0px 10px 8px",
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
			"&:focus": {
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	}))(InputBase);

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
		<StyledMenu open={open} aria-hidden={!isHidden} {...props}>
			<Button component={Link} to='/twitter' tabIndex={tabIndex}>
				<span aria-hidden='true'></span>
				Twitter
			</Button>
			<Button component={Link} to='/cnn' disabled tabIndex={tabIndex}>
				<span aria-hidden='true'></span>
				CNN
			</Button>
			<Button component={Link} to='/fox' disabled tabIndex={tabIndex}>
				<span aria-hidden='true'></span>
				FOX
			</Button>
		</StyledMenu>
	);
};

Menu.propTypes = {
	open: bool.isRequired,
};

export default Menu;
