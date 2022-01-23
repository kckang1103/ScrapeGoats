import pandas as pd
import json
import plotly.express as px

tweets = json.load(open("output.json", 'r', encoding="utf8"))

tweets.sort(key=lambda x: x["created_at"])

aggregate = []

for i in tweets:
    aggregate.append(i)

dates = [i['created_at'] for i in aggregate]
magnitude = [i['sentiment']['magnitude'] for i in aggregate]
score = [i['sentiment']['score'] for i in aggregate]


df = pd.DataFrame({'dates':dates, 'score':score, 'magnitude':magnitude})
print(df)


fig = px.scatter(df, y=score, x=dates, color='magnitude', size='magnitude')
#fig.show(renderer='png')
'''if os.path.exists("./images"):
    os.mkdir("./images")'''

fig.write_image("fig1.png")
fig.write_html("fig1.html")
