import requests
import json


def apify_run(bearer_token, settings_json):
    """
    Run an apify task instance using the custom settings json input.

    :param bearer_token: apify access token for authentication
    :param settings_json: custom input settings for apify task
    """
    url = 'https://api.apify.com/v2/actor-tasks/jockeyawesomekid~testscrape/run-sync-get-dataset-items?token={}'.format(
        bearer_token)
    response = requests.post(url, data=json.dumps(settings_json), headers={
                             'Content-Type': 'application/json'})
    return response.json()


def create_settings_json(settings_filename, query, until_date, since_date):
    """
    Build a custom url based on input query terms and date range.

    :param settings_filename: location of settings json
    :param query: list of input terms to narrow query scope
    :param until_date: end date for search range
    :param since_date: start date for search range
    """
    # Get the current url in the settings
    f = open(settings_filename)
    settings_json = json.load(f)
    url = settings_json['startUrls'][0]['url']

    # Build the components of the new url
    url_start = url[:29]
    url_query = "%22"
    for item in query:
        url_query += (item + "%20")
    url_query = url_query[:-3] + "%22"
    url_until = '%20until%3A{}'.format(until_date)
    url_since = '%20since%3A{}'.format(since_date)
    url_end = '%20-filter' + \
        settings_json['startUrls'][0]['url'].split('-filter', 1)[1]
    url_new = url_start + url_query + url_until + url_since + url_end

    # Update the json with the new url
    settings_json['startUrls'][0]['url'] = url_new
    return settings_json


def dump_to_file(to_dump, filename):
    """
    Dump contents of json to output file for debugging purposes.
    """
    f = open(filename, "w")
    json.dump(to_dump, f, indent=2)
    f.close()


def get_tweets(queries):
    """
    Retrieves a list of tweets from apify which match the request criteria of the user.

    :param queries: list of input terms to narrow query scope
    :return: json with tweet information
    """
    bearer_token = "apify_api_AciYyFiLPv42fBJQOLbgv8fioOFnXp1AMpKh"

    # Create json for actor
    settings_json = create_settings_json(settings_filename="requestSettings.json",
                                         query=queries,
                                         until_date='2020-03-31',
                                         since_date='2018-01-01')

    # Run the current actor w/new json
    res_json = apify_run(bearer_token, settings_json)

    # Dump to output for debugging purposes
    dump_to_file(res_json, filename='output.json')

    return res_json
