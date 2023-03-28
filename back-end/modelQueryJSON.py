import pickle
import json
import sys
import re
from sklearn.feature_extraction.text import CountVectorizer

with open('count_vect.sav', 'rb') as f:
    count_vect = pickle.load(f)
with open('finalized_model.sav', 'rb') as f:
    model = pickle.load(f)
if __name__ == "__main__":
    tempDict = {}
    tempJson = json.loads(sys.argv[1])
    for elem in tempJson:
        modelAns = model.predict(count_vect.transform([elem["question"]]))[0]
        cleanedQuery = re.sub('[^A-Za-z0-9]+', ' ', elem["question"])
        if (tempDict.get(modelAns)):
            tempDict[modelAns].append(cleanedQuery)
        else:
            tempDict[modelAns] = [cleanedQuery]
    print(json.dumps(tempDict))


