import os
import requests
from bs4 import BeautifulSoup

def get_wikidot_token_and_session_id():
    url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen'
    response = requests.get(url)

    token = response.headers.get('token')
    session_id = response.headers.get('sessionId')

    return token, session_id

token, session_id = get_wikidot_token_and_session_id()
print('Token:', token)
print('Session ID:', session_id)

def login_to_wikidot(token, session_id):
    url = 'https://www.wikidot.com/default--flow/login__LoginPopupScreen'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'action': 'login',
        'login': os.getenv('WIKIDOT_USERNAME'),
        'password': os.getenv('WIKIDOT_PASSWORD'),
        'token': token,
        'sessionId': session_id
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        print('Login successful!')
    else:
        print('Login failed.')

# Replace 'your_token' and 'your_session_id' with your actual token and session ID
login_to_wikidot('your_token', 'your_session_id')