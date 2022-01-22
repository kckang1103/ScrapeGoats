from flask import Flask
from flask import request
from flask_cors import CORS

from NaturalLanguage import *

app = Flask(__name__)
CORS(app)

# API Route

@app.route("/api/history")
def members():
  return {"history": ["history1", "history"]}

@app.route("/api/query", methods=["POST"])
def search():
  data = request.get_json()
  data = data['data']

  sentiment = analyze_sentiment(data)

  return sentiment

if __name__ == "__main__":
  app.run(debug=True)