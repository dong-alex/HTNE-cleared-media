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

            print("Verifying authentication!")

            if self.api.verify_credentials():
                print("Successful authentication!")
            else:
                print("Error with authentication. Please check.")
        except Exception as ex:
            print(ex)
            print("Error: Authentication failed")

    # get only the tweets made by the screen name - used as user id
    def getTweetsFromUser(self, screenName, count=40):
        try:
            statuses = tweepy.Cursor(
                self.api.user_timeline,
                screen_name=screenName,
                count=count,
                since_id=None,
                max_id=None,
                exclude_replies=True,
                contributor_details=False,
                include_entities=False,
            ).items(200)
            # no tweets found - user is new or DNE | user DNE
            if not statuses:
                print("Was not able to get statuses and/or user.")
                return None, None

            results = []
            for tweet in statuses:
                tweetContent, userContent = constructJsonTweet(tweet)

                # skip retweets - query will not bs used in user_timeline - save words
                if not tweetContent["content"].startswith("RT"):
                    results.append(tweetContent)

            print("Collected tweet content, returning data")
            return results, userContent
        except Exception as e:
            print(e)
            print("Error: Issue with obtaining tweets from the user: @" + screenName)
            return None, None

    def getTweetsFromTag(self, tag, numTweets=50):
        query = str(tag) + " -filter:retweets"

        try:
            tweets = tweepy.Cursor(self.api.search, q=query, lang="en").items(numTweets)
            print("Found the tweets")

            # no tweets found - tag is new or DNE
            if not tweets:
                return None

            results = []
            for tweet in tweets:
                print(tweet)
                tweetContent, userIgnoreContent = constructJsonTweet(tweet)
                results.append(constructJsonTweet(tweetContent))
            return results

        except Exception as ex:
            print(ex)
            print("Error: Issue with obtaining tweets from the tag: #" + tag)
            return None


def constructJsonTweet(tweet):

    user = None

    if "user" in tweet:
        description = tweet.user.description if tweet.user.description else ""
        location = tweet.user.location if tweet.user.location else ""
        user = {
            "user_id": tweet.user.id_str,
            "user_name": tweet.user.name,
            "screen_name": tweet.user.screen_name,
            "description": description,
            "location": location,
            "user_image_url": tweet.user.profile_image_url_https,
        }
    # tweetUser = User(
    #     tweet.user.id_str,
    #     tweet.user.name,
    #     tweet.user.screen_name,
    #     location,
    #     description,
    # )

    # constructedTweet = Tweet(tweet.id_str, tweet.created_at, tweet.text, tweetUser)
    # return constructedTweet
    return (
        {
            "id": tweet.id_str,
            "content": tweet.text,
            "created_at": tweet.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        },
        user,
    )


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
