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
    tempStr = sys.argv[1]
    problemArr = [elem.split("(a)")[0] for elem in tempStr.split("Problem")]
    problemArr = problemArr[1:]
    count = 1
    for elem in problemArr:
        modelAns = model.predict(count_vect.transform([elem]))[0]
        cleanedQuery = re.sub('[^A-Za-z0-9]+', ' ', elem)
        if (tempDict.get(modelAns)):
            tempDict[modelAns].append(cleanedQuery)
        else:
            tempDict[modelAns] = [cleanedQuery]
    print(json.dumps(tempDict))
