# Use this for any flask implementation
from re import T
from flask import Flask, redirect, url_for, render_template, jsonify, request, session, flash
from flask_cors import CORS, cross_origin
from datetime import timedelta
import pickle
import json
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
    my_json_string = json.dumps({'Question1': "If a=<1,3> and b=<2,2>, find |3a-2b|", 'Question2': "If a=<1,3> and b=<2,2>, find |3a-2b|"})
    my_dict = json.loads(my_json_string)
    print(my_dict)
    tags = []
    for key, value in my_dict.items():
        print(value)
        tagFound = model.predict(count_vect.transform([value]))
        for i in range(tagFound.size):
            print(tagFound[i])
            tags.append(tagFound[i])
    return  jsonify({'tags': tags})

if __name__ == "__main__":
    app.run(debug=True)