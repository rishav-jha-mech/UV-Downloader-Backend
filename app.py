from flask import Flask, render_template, request, redirect, jsonify
import youtube_dl
import json
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "127.0.0.1:5500"}})


@app.route('/', methods=["POST", "GET"])
@cross_origin()
def API():

	url = request.get_json().get('uri')
	with youtube_dl.YoutubeDL() as ydl:

		url = ydl.extract_info(url, download=False)

		return url

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8888,debug=True)