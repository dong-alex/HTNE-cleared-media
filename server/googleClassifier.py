from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.protobuf.json_format import MessageToJson
from string import punctuation

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

import re

# Instantiates a client
client = language.LanguageServiceClient()

# The text to analyze
text = u"They are rolling in their graves at the hatred that still exists."
document = types.Document(content=text, type=enums.Document.Type.PLAIN_TEXT)

"""
Guidelines
____
Clearly Positive*	"score": 0.8, "magnitude": 3.0
Clearly Negative*	"score": -0.6, "magnitude": 4.0
Neutral	"score": 0.1, "magnitude": 0.0
Mixed	"score": 0.0, "magnitude": 4.0
"""


class GoogleNLClient(object):
    def __init__(self):
        print("Initializing Google NLP Client")
        self.client = language.LanguageServiceClient()
        self.stopWords = set(
            stopwords.words("english") + list(punctuation) + ["AT_USER", "URL"]
        )

    def analyzeTweets(self, tweets):
        # sanitize the tweets of unnecessary words
        print("Analyzing tweets")
        cleanTweetContent = self.cleanTweets(tweets)

        # collect them into one whole document - minimize request usage
        print(
            "Analyzing overall content for",
            cleanTweetContent,
            "which is",
            len(cleanTweetContent),
            "words",
        )

        document = types.Document(
            content=cleanTweetContent, type=enums.Document.Type.PLAIN_TEXT
        )

        response = client.analyze_sentiment(document=document)

        # Sent to logger - but not needed
        # for entity in response.entities:
        #     print(u"Representative name for the entity: {}".format(entity.name))
        #     # Get entity type, e.g. PERSON, LOCATION, ADDRESS, NUMBER, et al
        #     print(u"Entity type: {}".format(enums.Entity.Type(entity.type).name))
        #     # Get the salience score associated with the entity in the [0, 1.0] range
        #     print(u"Salience score: {}".format(entity.salience))
        #     # Get the aggregate sentiment expressed for this entity in the provided document.
        #     sentiment = entity.sentiment
        #     print(u"Entity sentiment score: {}".format(sentiment.score))
        #     print(u"Entity sentiment magnitude: {}".format(sentiment.magnitude))
        #     # Loop over the metadata associated with entity. For many known entities,
        #     # the metadata is a Wikipedia URL (wikipedia_url) and Knowledge Graph MID (mid).
        #     # Some entity types may have additional metadata, e.g. ADDRESS entities
        #     # may have metadata for the address street_name, postal_code, et al.
        #     for metadata_name, metadata_value in entity.metadata.items():
        #         print(u"{} = {}".format(metadata_name, metadata_value))

        #     # Loop over the mentions of this entity in the input document.
        #     # The API currently supports proper noun mentions.
        #     for mention in entity.mentions:
        #         print(u"Mention text: {}".format(mention.text.content))
        #         # Get the mention type, e.g. PROPER for proper noun
        #         print(
        #             u"Mention type: {}".format(
        #                 enums.EntityMention.Type(mention.type).name
        #             )
        #         )

        payload = {
            "document_sentiment": response.document_sentiment.score,
            "document_magnitude": response.document_sentiment.magnitude,
        }
        # more analysis ? word clouding
        return payload

    def cleanTweets(self, tweetTexts):
        textContent = ""
        for text in tweetTexts:
            textContent += text + " "
        # list of lists
        return " ".join(self.processTweet(textContent))

    def processTweet(self, tweet):
        tweet = tweet.lower()
        tweet = re.sub("((www\.[^\s]+)|(https?://[^\s]+))", "URL", tweet)
        tweet = re.sub("@[^\s]+", "AT_USER", tweet)
        tweet = re.sub(r"#([^\s]+)", r"\1", tweet)
        tweet = word_tokenize(tweet)
        return [word for word in tweet if word not in self.stopWords]
