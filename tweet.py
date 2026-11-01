import os
import tweepy

client = tweepy.Client(
    consumer_key=os.environ["X_API_KEY"],
    consumer_secret=os.environ["X_API_SECRET"],
    access_token=os.environ["X_ACCESS_TOKEN"],
    access_token_secret=os.environ["X_ACCESS_SECRET"],
)

text = os.environ.get("TWEET_TEXT", "تغريدة تلقائية من GitHub Actions 🚀")
client.create_tweet(text=text)
