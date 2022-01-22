import requests
import json


def appify_auth_and_connect(bearer_token):
    url = 'https://api.apify.com/v2/actor-tasks/jockeyawesomekid~testscrape/run-sync-get-dataset-items?token={}'.format(bearer_token)
    response = requests.request("POST", url)
    return response.json()


def dump_json(to_dump, output_filename):
    f = open(output_filename, "w")
    json.dump(to_dump, f, indent=2)
    f.close()


def main():
    res_json = appify_auth_and_connect(bearer_token="apify_api_AciYyFiLPv42fBJQOLbgv8fioOFnXp1AMpKh")
    dump_json(res_json, output_filename='output.json')


if __name__ == "__main__":
    main()
