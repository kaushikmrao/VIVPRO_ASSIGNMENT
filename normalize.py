import config
from pymongo import MongoClient
import pandas as pd
import json

def load_to_db(df):
    client = MongoClient(config.dbconnection)
    db = client['songs']
    collection = db['songs']
    collection.insert_many(df.to_dict('records'))


def main():
    # load file
    data = open('./playlist.json');
    result = json.load(data)

    # normalize datra
    df = pd.DataFrame(result)
    df = df.reindex(columns=[
        'id', 
        'title', 
        'danceability', 
        'energy', 
        'key',
        'loudness',
        'mode',
        'acousticness',
        'instrumentalness',
        'liveness',
        'valence',
        'tempo',
        'duration_ms',
        'time_signature',
        'num_bars',
        'num_sections',
        'num_segments',
        'class'
    ])

    # load onto server
    load_to_db(df)


if __name__ == "__main__":
    main()