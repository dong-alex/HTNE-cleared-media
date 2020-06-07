import os

import tweepy

CONSUMER_KEY = os.environ.get("TWITTER_CONSUMER_KEY")
CONSUMER_SECRET_KEY = os.environ.get("TWITTER_CONSUMER_SECRET_KEY")
ACCESS_KEY = os.environ.get("TWITTER_ACCESS_TOKEN")
ACCESS_SECRET_KEY = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")


class TwitterClient(object):
    def __init__(self):
        try:
            self.auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET_KEY)
            self.auth.set_access_token(ACCESS_KEY, ACCESS_SECRET_KEY)
            self.api = tweepy.API(self.auth)
        except Exception as ex:
            print(ex)
            print("Error: Authentication failed")

    # get only the tweets made by the screen name - used as user id
    def getTweetsFromUser(self, screenName, count=50):
        try:
            statuses = self.api.user_timeline(
                str(screenName), count=count, exclude_replies=True
            )
            user = self.api.get_user(str(screenName))
            # no tweets found - user is new or DNE | user DNE
            if not statuses or not user:
                return None, None

            results = []
            for tweet in statuses:
                results.append(constructJsonTweet(tweet))
            return results, user
        except Exception as e:
            print(e)
            print("Error: Issue with obtaining tweets from the user: @" + screenName)
            return None, None

    def getTweetsFromTag(self, tag, numTweets=50):
        query = str(tag) + " -filter:retweets"

        try:
            tweets = tweepy.Cursor(self.api.search, q=query, lang="en").items(numTweets)

            # no tweets found - tag is new or DNE
            if not tweets:
                return None

            results = []
            for tweet in tweets:
                results.append(constructJsonTweet(tweet))
            return results

        except Exception as ex:
            print(ex)
            print("Error: Issue with obtaining tweets from the tag: #" + tag)
            return None


def constructJsonTweet(tweet):
    description = tweet.user.description if tweet.user.description else ""
    location = tweet.user.location if tweet.user.location else ""

    # tweetUser = User(
    #     tweet.user.id_str,
    #     tweet.user.name,
    #     tweet.user.screen_name,
    #     location,
    #     description,
    # )

    # constructedTweet = Tweet(tweet.id_str, tweet.created_at, tweet.text, tweetUser)
    # return constructedTweet

    return {
        "id": tweet.id_str,
        "content": tweet.text,
        "created_at": tweet.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "user_id": tweet.user.id_str,
        "user_name": tweet.user.name,
        "screen_name": tweet.user.screen_name,
        "description": description,
        "location": location,
    }


# class User(object):
#     def __init__(
#         self, id, name, screen_name, location="", description="",
#     ):
#         self.id = id
#         self.name = name
#         self.screen_name = screen_name
#         self.location = location
#         self.description = description


# class Tweet(object):
#     def __init__(self, id, created_at, content, user):
#         self.id = id
#         self.created_at = created_at.strftime("%Y-%m-%d %H:%M:%S")
#         self.content = content
#         self.user = user
