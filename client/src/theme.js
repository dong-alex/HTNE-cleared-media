// export const theme = {
//   primaryDark: '#0D0C1D',
//   primaryLight: '#EFFFFA',
//   primaryHover: '#343078',
//   mobile: '576px',
// }

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
	typography: {
		h1: {
			fontSize: "3rem",
			textAlign: "center",
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
