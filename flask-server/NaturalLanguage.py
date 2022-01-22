# Imports the Google Cloud client library
import os
from google.cloud import language_v1

credential_path = "../scrapegoats-eca3758196a3.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

def analyze_sentiment(text):
    # Instantiates a client
    client = language_v1.LanguageServiceClient()

    # The text to analyze
    #text = "Hello"
    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Detects the sentiment of the text
    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    print("Text: {}".format(text))
    print("Sentiment: {}, {}".format(sentiment.score, sentiment.magnitude))

    return {"score": sentiment.score, "magnitude": sentiment.magnitude}