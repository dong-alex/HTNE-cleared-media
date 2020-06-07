from flask import Flask, jsonify
from twitterClient import TwitterClient
from googleClassifier import GoogleNLClient

# from classifierClient import ClassifierClient

import json

app = Flask(__name__)

client = TwitterClient()
NLPClient = GoogleNLClient()

# classifier = ClassifierClient()

# with open("test.json", "r") as fp:
#     data = json.load(fp)
#     print(classifier.classify(data))


@app.route("/")
def root():
    return "Hello World"


@app.route("/tweets/plain/<name>")
def getTweets(name=None):
    if not name:
        return jsonify({"message": "No twitter username found. Please try again."})

    print("Searching for user", name)
    # check with user - returns array of info objects
    tweets, user = client.getTweetsFromUser(name)

    if not tweets:
        return jsonify({"message": "No tweets found for the user"})
    return jsonify(tweets=tweets, user=user)


@app.route("/tweets/user/<twitterUserName>")
def tweetsByName(twitterUserName=None):
    if not twitterUserName:
        return jsonify({"message": "No twitter username found. Please try again."})

    print("Searching for user", twitterUserName)
    # check with user - returns array of info objects
    tweets, user = client.getTweetsFromUser(twitterUserName)

    if not tweets:
        return jsonify({"message": "No tweets found for the user"})

    # pass just the content into the tweets and return the rest
    textContent = []
    for tweet in tweets:
        print(tweet["content"])
        print("------------------------------------------------")
        textContent.append(tweet["content"])

    nlpResponse = NLPClient.analyzeTweets(textContent)
    # result = classifier.classify(textContent)
    # print(result)
    # return jsonify(result)
    return jsonify(analysis=nlpResponse, details=tweets)


@app.route("/tweets/tag/<twitterTag>")
def tweetsByTag(twitterTag=None):
    if not twitterTag:
        return jsonify({"message": "No twitter tag found. Please try again."})
    print("Searching for tag", twitterTag)

    tweets = client.getTweetsFromTag(twitterTag)

    if not tweets:
        return jsonify({"message": "No tweets found for the user"})

    # pass just the content into the tweets and return the rest
    textContent = []
    for tweet in tweets:
        print(tweet["content"])
        print("------------------------------------------------")
        textContent.append(tweet["content"])

    nlpResponse = NLPClient.analyzeTweets(textContent)

    return jsonify(analysis=nlpResponse, details=tweets)
    # result = classifier.classify(textContent)
    # print(result)
    # return jsonify(result)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
