import requests
import pandas as pd
import json
import ast
import yaml


def create_twitter_url():
    handle = "jessicagarson"
    max_results = 10
    q = "query=from:{}".format(handle)
    mr = "max_results={}".format(max_results)
    tf = "tweet.fields=created_at&author_id"
    url = "https://api.twitter.com/2/tweets/search/recent?{}&{}&{}".format(
        q, mr, tf
    )
    return url


def twitter_auth_and_connect(bearer_token, url):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    response = requests.request("GET", url, headers=headers)
    return response.json()


def get_bearer_token():
    f = open("tokens.txt", "r")
    return f.readline()


def main():
    url = create_twitter_url()
    bearer_token = get_bearer_token()
    print(bearer_token)
    res_json = twitter_auth_and_connect(bearer_token, url)
    print(res_json)


if __name__ == "__main__":
    main()
