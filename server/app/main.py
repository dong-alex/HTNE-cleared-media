from os import environ
from dotenv import loadenv

import tweepy
from flask import Flask, render_template

loadenv()

CONSUMER_KEY = environ("TWITTER_CONSUMER_KEY")
CONSUMER_SECRET_KEY = environ("TWITTER_CONSUMER_SECRET_KEY")
ACCESS_KEY = environ("TWITTER_ACCESS_TOKEN")
ACCESS_SECRET_KEY = environ("TWITTER_ACCESS_TOKEN_SECRET")

app = Flask(__name__)

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET_KEY)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET_KEY)

@app.route('/')
def root():
    return "Hello World"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)