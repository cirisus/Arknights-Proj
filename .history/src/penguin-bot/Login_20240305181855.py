import os
import requests
from bs4 import BeautifulSoup

def get_wikidot_token_and_session_id():
    url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen?originSiteId=4592952&openerUri=https://arknights.wikidot.com'
    response = requests.get(url)

    token = response.cookies.get('wikidot_token7')
    session_id = response.cookies.get('WIKIDOT_SESSION_ID')

    return token, session_id

token, session_id = get_wikidot_token_and_session_id()
print('Token:', token)
print('Session ID:', session_id)

def login_to_wikidot(token, session_id):
    url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen?originSiteId=4592952&openerUri=https://arknights.wikidot.com'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'action': 'login',
        'login': os.getenv('WIKIDOT_PENGUIN_BOT'),
        'password': os.getenv('WIKIDOT_PENGUIN_TOKEN'),
        'token': token,
        'sessionId': session_id
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        print('Login successful!')
    else:
        print('Login failed.')

def login():
    token, session_id = get_wikidot_token_and_session_id()
    login_to_wikidot(token, session_id)
    return token, session_id

print('WIKIDOT_PENGUIN_BOT:', os.getenv(''))
print('WIKIDOT_PENGUIN_TOKEN:', os.getenv('WIKIDOT_PENGUIN_TOKEN'))