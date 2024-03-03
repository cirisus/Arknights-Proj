import re
import requests
from bs4 import BeautifulSoup

def edit_page(page_name, content):
    url = "https://arknights.wikidot.com/system:credits/edit/true"
    data = {
        'wikidot_token7': 'your_token',
        'page_id': 'your_page_id',
        'page': page_name,
        'title': 'your_title',
        'source': content,
        'module_body': 'edit/true',
        'moduleName': 'edit/PageEditModule'
    }
    response = requests.post(url, data=data)
    return response

response = edit_page('system:credits', 'new_content')
print(response.status_code)

def get_members():
    url = "https://arknights.wikidot.com/system:members"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    members = {}
    for member_element in soup.select('.member'):
        member_name = member_element.get_text().strip()
        members[member_name] = 0

    return members

members = get_members()
print(members)