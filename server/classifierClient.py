import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from string import punctuation
from os import path
import pandas as pd
import pickle
import re

# NOTE: Ensure the stopwords and punkt are available for the server via python3 -m nltk.downloader (punkt/stopwords)
# TRAINING_SET_BASE_PATH_NAME = "../processed_acl"
TRAINING_SET_BASE_PATH_NAME = "../corpus.csv"
WORD_FEATURE_PATH_NAME = "features.json"
NBC_PATH_NAME = "nbc.sav"


class ClassifierClient(object):
    def __init__(self):
        self.stopWords = set(
            stopwords.words("english") + list(punctuation) + ["AT_USER", "URL"]
        )
        self.NaiveBayesClassifier = None
        self.wordFeatures = None
        # if we have the training model prior - then just load that
        if path.exists(NBC_PATH_NAME):
            print("Found the model! Loading...")
            self.NaiveBayesClassifier = pickle.load(open(NBC_PATH_NAME, "rb"))

            # load the features
            print("Setting up the word features")
            tweetLabelText = readData()
            cleanedTextLabels = self.cleanTweets(tweetLabelText)

            print("Setting up word vocabulary")
            self.wordFeatures = self.buildVocabulary(cleanedTextLabels)
        # we need to train the model to use and plug in
        else:
            print(
                "No model and/or word features found! Attempting to train a model and obtain features from training set"
            )
            if not path.exists(TRAINING_SET_BASE_PATH_NAME):
                print(
                    "No training data is found! Please search for a training set to be used"
                )

            tweetLabelText = readData()
            cleanedTextLabels = self.cleanTweets(tweetLabelText)

            print("Setting up word vocabulary")
            self.wordFeatures = self.buildVocabulary(cleanedTextLabels)

            print("Training the classifier")
            trainingFeatures = nltk.classify.apply_features(
                self.extractFeatures, cleanedTextLabels
            )

            # train the bayes classifier - a classification algorithm better for small contents like tweets - SVM is another classification algorithm to help with longer text values creates a linear separation between the two
            self.NaiveBayesClassifier = nltk.NaiveBayesClassifier.train(
                trainingFeatures
            )

            # save this model for later use as well
            print("Saving the model into a file to be reused on server startup")
            pickle.dump(
                self.NaiveBayesClassifier, open(NBC_PATH_NAME, "wb"),
            )

        if not self.wordFeatures or not self.NaiveBayesClassifier:
            print(
                "There was an error constructing the model or word features. Please try again."
            )
            raise Exception(
                "There was an error constructing the model or word features. Please try again."
            )

    def cleanTweets(self, tweets):
        results = []
        for tweet in tweets:
            results.append((self.processTweet(tweet[0]), tweet[1]))
        return results

    def processTweet(self, tweet):
        tweet = tweet.lower()
        tweet = re.sub("((www\.[^\s]+)|(https?://[^\s]+))", "URL", tweet)
        tweet = re.sub("@[^\s]+", "AT_USER", tweet)
        tweet = re.sub(r"#([^\s]+)", r"\1", tweet)
        tweet = word_tokenize(tweet)
        return [word for word in tweet if word not in self.stopWords]

    # pull features to train the nbc classifier
    # count how many words from the wordlist fits in the text labels
    # the number of times found will indicate the weight - iterated over via nltk.classify.apply_features(extractFeatures, tweets)
    def extractFeatures(self, tweet):
        if not self.wordFeatures:
            print(
                "There was an error in extracting features, no word dictionary found!"
            )
            return None

        words = set(tweet)
        features = {}

        # labels (via contain(word)) - true = 1 false = 0
        # 1: word in vocab is in tweet
        # 0: word in vocab NOT in twwet

        for word in self.wordFeatures:
            features["contain(%s)" % word] = word in words  # O(1) check for set
        return features

    def buildVocabulary(self, tweetTextLabels):
        words = []

        for (text, sentiment) in tweetTextLabels:
            words.extend(text)

        # count the most frequent words used and all other words used
        wordlist = nltk.FreqDist(words)
        features = wordlist.keys()
        return features

    def classify(self, tweetTexts):
        if not self.NaiveBayesClassifier:
            print(
                "No NBC was found! Please train a model first before trying to classify any tweets"
            )
            return None
        # for every tweet - pass it into the classifier to train
        print("Classifying the tweets ...")
        labels = [
            self.NaiveBayesClassifier.classify(self.extractFeatures(text))
            for text in tweetTexts
        ]

        return examineLabels(labels)
        # simple classify based on predictions


def readData():
    print("Cleaning Tweets")
    frame = pd.read_csv(TRAINING_SET_BASE_PATH_NAME)
    # drop all irrelevant tweets - they are either postiive or negative or neutral
    # frame = frame[frame["Sentiment"] != "irrelevant"]
    tweetLabelText = frame[["TweetText", "Sentiment"]].values

    return tweetLabelText


def examineLabels(labels):
    percentages = {}
    print(labels)
    length = len(labels)
    percentages["positive"] = 100 * labels.count("positive") / length
    percentages["negative"] = 100 * labels.count("negative") / length
    percentages["neutral"] = 100 * labels.count("neutral") / length
    percentages["irrelevant"] = 100 * labels.count("irrelevant") / length

    print(percentages)
    bestLabel = pd.Series(percentages).idxmax()

    return {
        "sentiment": bestLabel,
        "percentage": percentages[bestLabel],
    }


# test run
# ClassifierClient()

# categories = ["books", "dvd", "electronics", "kitchen"]

# for category in categories:
#     path = "%s/%s/negative"
#     frame = pd.read_csv(TRAINING_SET_BASE_PATH_NAME, encoding="ISO-8859-1")
#     print(frame.head(5))
