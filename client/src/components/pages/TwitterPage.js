import React, { useState } from "react";
import Layout from "../layout";
import { makeStyles } from "@material-ui/core/styles";
import TwitterSearchField from "../twitterSearchField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	submitButton: {
		height: "100%",
		marginLeft: theme.spacing(2),
	},
}));

const TwitterPage = (props) => {
	const classes = useStyles();
	const [sentiment, setSentiment] = useState(0);
	const [twitterUser, setTwitterUser] = useState(null);

	const handleSubmit = async (submission, type) => {
		try {
			// results will contain the NLP reponse and user associated to it
			const { data } = await axios.get(`/tweets/${type}/${submission}`);

			const { analysis, user } = data;
			console.log(analysis, user, data);

			if (!analysis && !user) {
				console.log(
					"There was an issue with obtaining the scores for the user. Please try again"
				);
				return false;
			}

			setTwitterUser(user);

			return true;
		} catch (err) {
			console.log(err);
			console.log("There was an error. Please try again.");
		}
	};

	return (
		<Layout>
			<TwitterSearchField onSubmit={handleSubmit} />
		</Layout>
	);
};

export default TwitterPage;

/***
 * entities
 */
