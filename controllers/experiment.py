
import sys
import requests
from bs4 import BeautifulSoup
import re
import numpy as np
from textblob import TextBlob

r = requests.get(sys.argv[1])
r.status_code
soup = BeautifulSoup(r.text, 'html.parser')
reviewsRanked = []

counter = 0

for EachPart in soup.select('p[class*="comment"]'):
    potential_review = EachPart.get_text()
    ownerReview = re.findall(r"\d{1,2}/\d{1,2}/\d{4}", potential_review)
    if len(ownerReview) == 0:
        counter += 1
        # if len(potential_review) < 300:
        TextBlob(potential_review).sentiment
