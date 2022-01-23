from flask import Flask
from flask import request
from flask_cors import CORS

from NaturalLanguage import *
from apifyApiQuery import *

app = Flask(__name__)
CORS(app)

# API Route


@app.route("/api/history")
def members():
    """
    Retieve user's history information and send to front-end.
    """
    return {"history": ["history1", "history"]}


@app.route("/api/query", methods=["POST"])
def search():
    """
    Retrieve tweets based on received user query and send to front-end.
    """
    # Retrieve user query from front-end
    data = request.get_json()
    data = data['data']

    queries = data.split(' ')

    # Call apify to get tweets
    tweets = get_tweets(queries, intervals=40, tweets_per_interval=10)

    # Clean and return tweet data
    tweets_slimmed = []
    for tweet_list in tweets:
        for tweet in tweet_list:
            sentiment = analyze_sentiment(tweet['full_text'])
            tweet['sentiment'] = sentiment
            temp = {'sentiment': tweet['sentiment'],
                    'created_at': tweet['created_at'],
                    'full_text': tweet['full_text']}
            tweets_slimmed.append(temp)

    print('~~~~~~~~~~~~~~~~~')
    print()
    print(tweets_slimmed)
    print()
    print('~~~~~~~~~~~~~~~~~')
    json_string = json.dumps(tweets_slimmed)

    return json_string


if __name__ == "__main__":
    app.run(debug=True)
