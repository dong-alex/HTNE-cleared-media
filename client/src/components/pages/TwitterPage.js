import React, { useState } from "react";
import Layout from "../layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TwitterSearchField from "../twitterSearchField";
import TwitterSentiment from "../twitterSentiment";
import axios from "axios";
import UserCard from "../userCard";

const useStyles = makeStyles((theme) => ({
	submitButton: {
		height: "100%",
		marginLeft: theme.spacing(2),
	},
}));

const TwitterPage = (props) => {
	const classes = useStyles();
	const [documentAnalysis, setDocumentAnalysis] = useState(null);
	const [twitterUser, setTwitterUser] = useState({
		description: "45th President of the United States of America🇺🇸",
		location: "Washington, DC",
		screen_name: "realDonaldTrump",
		user_id: "25073877",
		user_image_url:
			"https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg",
		user_name: "Donald J. Trump",
	});

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
			setDocumentAnalysis(analysis);

			return true;
		} catch (err) {
			console.log(err);
			console.log("There was an error. Please try again.");
		}
	};

	return (
		<Layout>
			<TwitterSearchField onSubmit={handleSubmit} />
			{/* {documentAnalysis && (
				<>
					<Paper>{documentAnalysis.document_magnitude}</Paper>
					<Paper>{documentAnalysis.document_score}</Paper>
				</>
			)} */}
			{<TwitterSentiment score={0} magnitude={0} />}
			{twitterUser && <UserCard user={twitterUser} />}
		</Layout>
	);
};

export default TwitterPage;

/***
 * entities
 */
