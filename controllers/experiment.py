
import sys
import requests
from bs4 import BeautifulSoup
import re
import numpy as np
from textblob import TextBlob

r = requests.get(sys.argv[1])
r.status_code
soup = BeautifulSoup(r.text, 'html.parser')

counter = 0

for EachPart in soup.select('p[class*="comment"]'):
    potential_review = EachPart.get_text()
    r1 = re.findall(r"\d{1,2}/\d{1,2}/\d{4}", potential_review)
    if len(r1) == 0:
        counter += 1
        print(TextBlob(potential_review).sentiment)
