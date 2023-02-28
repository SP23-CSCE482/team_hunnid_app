import pickle
import json
import sys

from sklearn.feature_extraction.text import CountVectorizer

with open('count_vect.sav', 'rb') as f:
    count_vect = pickle.load(f)

with open('finalized_model.sav', 'rb') as f:
    model = pickle.load(f)

if __name__ == "__main__":
    print(model.predict(count_vect.transform([sys.argv[1]])))
