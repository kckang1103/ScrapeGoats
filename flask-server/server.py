from flask import Flask, render_template
from flask import request
from flask_cors import CORS

from NaturalLanguage import *
from apifyApiQuery import *

app = Flask(__name__)
CORS(app)

# API Route

@app.route('/api/plot')
def home():
   return render_template('fig1.html')

@app.route("/api/history")
def members():
  return {"history": ["history1", "history"]}

@app.route("/api/query", methods=["POST"])
def search():
  data = request.get_json()
  data = data['data']

  queries = data.split(' ')

  tweets = get_tweets(queries)

  for tweet in tweets: 
    sentiment = analyze_sentiment(tweet['full_text'])
    tweet['sentiment'] = sentiment
  
  tweets_slimmed = []
  for tweet in tweets:
    temp = {'sentiment': tweet['sentiment'],
            'created_at': tweet['created_at'],
            'full_text': tweet['full_text']}
    tweets_slimmed.append(temp)

  # textfile = open("output.txt", "w")
  # for element in tweets_slimmed:
  #   textfile.write(element + "\n")
  
  # textfile.close()

  print(tweets_slimmed)

  json_string = json.dumps(tweets_slimmed)

  return json_string

if __name__ == "__main__":
  app.run(debug=True)