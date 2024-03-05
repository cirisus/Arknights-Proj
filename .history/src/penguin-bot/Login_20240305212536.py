import os
import requests
from bs4 import BeautifulSoup

def get_wikidot_token_and_session_id():
    url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen'
    response = requests.post(url)

    token = response.cookies.get('wikidot_token7')
    session_id = response.cookies.get('WIKIDOT_SESSION_ID')

    return token, session_id

def login():
    token, session_id = get_wikidot_token_and_session_id()
    return token, session_id

print('WIKIDOT_PENGUIN_BOT:', os.getenv('WIKIDOT_PENGUIN_BOT'))
print('WIKIDOT_PENGUIN_TOKEN:', os.getenv('WIKIDOT_PENGUIN_TOKEN'))

token, session_id = login()
print('Token:', token)
print('Session ID:', session_id)