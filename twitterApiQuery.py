import requests
import json


def create_twitter_url():
    max_results = 10
    q = "query=jameswebb (happy OR exciting OR excited OR amazing OR lovely OR incredible) (lang:en)"
    mr = "max_results={}".format(max_results)
    tf = "tweet.fields=created_at,author_id"
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
    bearer_token = f.readline()
    f.close()
    return bearer_token


def main():
    url = create_twitter_url()
    bearer_token = get_bearer_token()
    res_json = twitter_auth_and_connect(bearer_token, url)
    f = open("output.json", "w")
    json.dump(res_json, f, indent=2)
    f.close()


if __name__ == "__main__":
    main()
