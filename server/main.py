from flask import Flask, request, jsonify
from twitterClient import TwitterClient
from googleClassifier import GoogleNLClient
from scraperClient import ScraperClient
from flask_cors import CORS

# from classifierClient import ClassifierClient

app = Flask(__name__)
CORS(app)
client = TwitterClient()
NLPClient = GoogleNLClient()
WebReader = ScraperClient()
# classifier = ClassifierClient()

# with open("test.json", "r") as fp:
#     data = json.load(fp)
#     print(classifier.classify(data))


@app.route("/")
def root():
    return "Hello World"


# should not be using this.
@app.route("/tweets/plain/<name>", methods=["GET"])
def getTweets(name=None):
    if not name:
        return jsonify({"message": "No twitter username found. Please try again."})

    print("Searching for user", name)
    # check with user - returns array of info objects
    tweets, user = client.getTweetsFromUser(name)

    print("Found tweets for the corresponding user", user)
    if not tweets or user:
        return jsonify({"message": "No tweets found or no user found."})

    return jsonify(tweets=tweets, user=user)


@app.route("/tweets/user/<twitterUserName>", methods=["GET"])
def tweetsByName(twitterUserName=None):
    if not twitterUserName:
        return jsonify({"message": "No twitter username found. Please try again."})

    print("Searching for user", twitterUserName)
    # check with user - returns array of info objects
    tweets, user = client.getTweetsFromUser(twitterUserName)

    print("Found tweets for the corresponding user", user)
    if not tweets or not user:
        return jsonify({"message": "No tweets found for the user"})

    # pass just the content into the tweets and return the rest
    textContent = []
    for tweet in tweets:
        textContent.append(tweet["content"])

    nlpResponse = NLPClient.analyzeTweets(textContent)
    # result = classifier.classify(textContent)
    # print(result)
    # return jsonify(result)
    return jsonify(analysis=nlpResponse, user=user)


@app.route("/tweets/tag/<twitterTag>", methods=["GET"])
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
        textContent.append(tweet["content"])
    nlpResponse = NLPClient.analyzeTweets(textContent)

    return jsonify(analysis=nlpResponse)
    # result = classifier.classify(textContent)
    # print(result)
    # return jsonify(result)


@app.route("/news", methods=["POST"])
def getNewsSummary():
    params = request.get_json()
    url = params["url"]

    if not url:
        return jsonify({"message": "No url found. Please try again."})

    summary = WebReader.runArticleSummary(url)

    if summary == "":
        return jsonify(
            {"message": "Article was not from CNN/Fox or there was an error."}
        )

    return jsonify(summary)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
