# Use this for any flask implementation
from re import T
from flask import Flask, redirect, url_for, render_template, jsonify, request, session, flash
from flask_cors import CORS, cross_origin
from datetime import timedelta
import time
import requests
import json
import pickle
from sklearn.feature_extraction.text import CountVectorizer
#from FirebaseHelper import pushStudent, getStudents, removeStudent, AddChat, getChats


app = Flask(__name__)
with open('count_vect.sav', 'rb') as f:
    count_vect = pickle.load(f)
with open('finalized_model.sav', 'rb') as f:
    model = pickle.load(f)
CORS(app, support_credentials=True)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(minutes=15) 
print(model.predict(count_vect.transform(["If a=<1,3> and b=<2,2>, find |3a-2b|"])))

@app.route("/")
def home():
    return jsonify({'message': "it works!"})


@app.route("/test")
def testing():
    return {'result': "Flask says testing"}



@app.route("/getTagsFromQuestions", methods=["GET"])
@cross_origin(supports_credentials=True)
def getTagsFromQuestions():
    tagFound = model.predict(count_vect.transform(["If a=<1,3> and b=<2,2>, find |3a-2b|"]))
    print(tagFound)
    return  jsonify({'tag': tagFound[0]})

if __name__ == "__main__":
    app.run(debug=True)