import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import youtube_dl


app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET','POST'])
def API():
    if request.method == 'POST':
        return "POST"
    return "GET"





if __name__ == "__main__":
    app.run(port=8888)