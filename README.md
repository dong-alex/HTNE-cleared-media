# HTNE-cleared-media
HackTheNorthEast Project using NLP to analyze media content

Our client uses the following technologies:
- React
- Material-UI

This client will be used to handle searching for tweets from users or tags. If given time, an interface to compare Fox and CNN news articles and examine their viewpoints. Fox is known to have conservative bias, so it would be interesting to see how these news networks portray their ideas on the same issue.

### Twitter

Tweets are short posts and straight to the point. Popular figures express their thoughts online to their followers, but what kind of image are they trying to portray? Social media is the primary form of communication and sharing important events.

Natural Language Processing is a growing field in AI where machines try to learn and understand human language and extract important details about it. In this example, we practice **Opinion Mining**, or **Entity-Sentiment analysis**. Using Google's Natural Language API to extract information about a user's tweets, we can analyze their stance online. Based on their scores, we can classify this user or tag to be generally positive, negative, or neutral online.

With this information, we would be able to attempt to extrapolate different aspects of the users given their information. For example, if one user was overly negative towards their current state of government, AI could determine their position in the political compass given enough training to classify what is left or right.

This program is setup in a way the following technologies are used in the server:
- GCP App Engine: Host online to process tweets and the AI
- GCP Natural Language API: Determine sentiment
- Flask: Handling requests
- NLTK: Collection of data to help pre-process tweets

The following is required to host your own server:
- Twitter Developer Key
- GCP Account and a GCP project
- Service Account Key to allow administrative tasks to be done in the server
- Optional: If you do not use GCP App Engine or GCP Compute Engine to run your server securely, you will require an API key to allow usage of GCP Natural Language API

As the data is sent back to the client, it will display the user's general sentiment score and details in regards to it.

# DISCLAIMER: The sentiment analysis DOES NOT confirm any bias or views towards political issues or current events.

### CNN / FOX

If given time. We intend to provide a text summarization program between two CNN/FOX links to determine viewpoints.
