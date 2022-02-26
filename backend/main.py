import config
import json
from flask import Flask
from flask import request, jsonify
from flask_restful import Resource, Api
import pymongo
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app, origin=['http://localhost:3000/'])

client = MongoClient(config.dbconnection)
db = client['songs']
collection = db['songs']

class GetSongs(Resource):
    def get(self):
        documents = collection.find({}, {'_id': 0})
        response = []
        for document in documents:
            response.append(document)
        return response

# implenting pagination
class GetSongsByPage(Resource):
    def get(self):
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        songs = collection.find({}).sort([('_id', pymongo.ASCENDING)]).skip((page-1)*per_page).limit(per_page)
        response = []
        for song in songs:
            del song['_id']
            response.append(song)
        return response

class GetSong(Resource):
    def get(self, name):
        song = collection.find_one({'title': name}, {'_id': 0})
        if (type(song) is not dict):
            return song, 400
        return song

class Rate(Resource):
    def put(self,song_id):
        rating = int(request.args.get('rating'))
        collection.update_one({'id': song_id }, {'rating': rating});
        return jsonify(success=True);

api.add_resource(GetSongs, '/api/GetSongs')
api.add_resource(GetSong, '/api/GetSong/<string:name>')
api.add_resource(GetSongsByPage, '/api/GetSongsByPage')
api.add_resource(Rate, '/api/Rate/<string:song_id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)